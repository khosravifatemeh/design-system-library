import { NodeDefinitionOptions, NodeFields } from "../types";

function isArgsObject(args) {
  return (
    args.length === 1 &&
    typeof args[0] === "object" &&
    args[0].type === undefined &&
    !Array.isArray(args[0])
  );
}

function builder(type: string, fields: NodeFields) {
  const keys = Object.keys(fields);
  return (...args: unknown[]) => {
    let input: unknown[] | Record<string, unknown> = args;
    if (isArgsObject(input)) {
      input = args[0] as Record<string, unknown>;
    }
    const node = { type };
    for (const key of keys) {
      const field = fields[key];
      const value: any = Array.isArray(input)
        ? input[keys.indexOf(key)]
        : (input as Record<string, unknown>)[key];
      if (value !== undefined) {
        field.validate(value, node);
        node[key] = value;

        continue;
      }
      if (field.required && value === undefined) {
        throw new Error(`Expected field ${key} to be defined for type ${type}`);
      }
    }
    return node;
  };
}

export function defineNode(type: string, options: NodeDefinitionOptions) {
  const { fields = {}, generate } = options;
  if (typeof generate !== "function") {
    throw new Error(`Expected a \`generate\` method for type \`${type}\``);
  }
  return { type, builder: builder(type, fields), generate };
}
