import { definitions } from "./node-definition";
import {
  DefinitionMap,
  Node,
  NodeBuilder,
  NodeDefinition,
  NodeFactory,
  NodeField,
  Types,
} from "../types";

function isArgsObject(args) {
  return (
    args.length === 1 &&
    typeof args[0] === "object" &&
    args[0].type === undefined &&
    !Array.isArray(args[0])
  );
}

function builder<T>(type: string, fields: NodeField<T>): NodeFactory {
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

function defineNode<T extends Node>(
  type: string,
  options: NodeDefinition<T>
): NodeBuilder<T> {
  const { fields = {} as NodeField<T>, generate } = options;
  if (typeof generate !== "function") {
    throw new Error(`Expected a \`generate\` method for type \`${type}\``);
  }
  return { type, builder: builder<T>(type, fields), generate };
}

const types: Types = (
  Object.keys(definitions) as (keyof DefinitionMap)[]
).reduce((acc, key) => {
  acc[key] = definitions[key].builder;
  return acc;
}, {} as Types);

export { defineNode, types };
