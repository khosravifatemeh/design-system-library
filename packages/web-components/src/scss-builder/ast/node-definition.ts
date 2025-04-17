import p, { compose, newLine, print } from "../generate/printer.util";
import { Node, StyleSheet } from "../types";
import { convert, formats } from "../utils/token-format";
import { defineNode } from "./node-builder";
import v from "./validators";
const nodeTypes = {
  IfStatement: "IfStatement",
  SassMapProperty: "SassMapProperty",
  SassMap: "SassMap",
};
const SassNumber = defineNode("SassNumber", {
  fields: {
    value: {
      validate: v.validateValueType("number"),
    },
  },
  generate: (node) => {
    return node.value;
  },
});
const SassModule = defineNode("SassModule", {
  fields: { path: { validate: v.validateValueType("string") } },
  generate: (node) => p.compose("@use", p.space(), `'${node.path}'`, ";"),
});
const SassValue = defineNode("SassValue", {
  fields: {
    value: {
      validate: v.validateAny,
    },
  },
  generate: (node) => {
    return node.value;
  },
});
const SassString = defineNode("SassString", {
  fields: {
    value: {
      validate: v.validateValueType("string"),
    },
  },
  generate: (node) => {
    return `'${node.value}'`;
  },
});
const AtReturn = defineNode("AtReturn", {
  fields: { argument: { validate: v.validateAny } },
  generate: (node, parent) => {
    const needNewLine = parent?.body?.indexOf(node) !== 0 ? p.newLine(0) : "";
    return compose(
      needNewLine,
      newLine(0),
      "@return",
      p.space(),
      p.print(node.argument)
    );
  },
});
const BlockStatement = defineNode("BlockStatement", {
  fields: {
    body: {
      validate: v.validateArrayOf(v.validateAny),
    },
  },
  generate: (node) => {
    if (!node.body?.length) return "{}";
    const body = node.body.map((child, index) =>
      compose(
        p.newLine(2),
        p.print(child, node),
        index < node.body.length - 1 ? p.newLine(2) : ""
      )
    );
    return compose(p.space(), "{", ...body, newLine(1), "}");
  },
});
const LogicalExpression = defineNode("LogicalExpression", {
  fields: {
    left: { validate: v.validateAny },
    operator: { validate: v.validateValueType("string") },
    right: { validate: v.validateAny },
  },
  generate: (node) => {
    try {
      console.log("Hi Logical");

      return compose(
        p.print(node.left, node),
        p.space(),
        node.operator,
        p.space(),
        p.print(node.right, node)
      );
    } catch (error) {
      throw new Error("Logical ***************");
    }
  },
});

const IfStatement = defineNode("IfStatement", {
  fields: {
    test: { validate: v.validateAny },
    consequent: {
      required: false,
      validate: v.validateType(BlockStatement),
    },
    alternate: {
      required: false,
      validate: v.validateOneOf([
        // @ts-ignore - ignoring type checking for alternate
        v.validateType("IfStatement"),
        v.validateType(BlockStatement),
      ]),
    },
  },
  generate: (node, parent) => {
    try {
      console.log(
        "/Hiiiiiiiiiiiiii********",
        node.test,
        node.consequent,
        parent
      );

      const innerSpace =
        parent && parent.type === IfStatement.type
          ? p.compose(p.space(), "if")
          : "@if";
      const alternate = node.alternate
        ? p.compose("@else", p.print(node.alternate, node))
        : "";
      console.log("IfStatement", node.test, node.consequent);
      return compose(
        innerSpace,
        p.space(),
        p.print(node.test, node),
        p.print(node.consequent, node),
        alternate
      );
    } catch (error) {
      throw new Error("IF Error ******************");
    }
  },
});

const StyleSheet = defineNode("StyleSheet", {
  fields: {
    children: {
      validate: () =>
        v.validateArrayOf(
          v.validateOneOf([
            v.validateType(SassModule),
            v.validateType(NewLine),
            v.validateType(Assignment),
            v.validateType(SassFunction),
          ])
        ),
    },
  },
  generate: (node: StyleSheet, parent: Node) => {
    return node.children.map((n: Node, index: number) =>
      compose(print(n), index < node.children.length - 1 ? newLine(0) : "")
    );
  },
});
const Identifier = defineNode("Identifier", {
  fields: {
    name: { validate: v.validateValueType("string") },
    kebabCase: { validate: v.validateValueType("boolean") },
  },
  generate: (node, parent) => {
    const name = node.kebabCase ? convert(node.name, formats.scss) : node.name;
    return p.compose(parent ? "$" : "", name);
  },
});
const SassFunctionCall = defineNode("SassFunctionCall", {
  fields: {
    id: {
      validate: v.validateType(Identifier),
    },
    params: {
      required: false,
      validate: v.validateArrayOf(
        v.validateOneOf([
          v.validateType(Identifier),
          v.validateType(SassValue),
          v.validateType(SassString),
        ])
      ),
    },
  },
  generate: (node, parent) => {
    const properties = node.params.map((prop, index) => {
      const dollarSign = prop.type === Identifier.type ? "$" : "";
      const semi = index < node.params.length ? "," : "";
      return p.compose(dollarSign, p.print(prop, node), semi, p.space());
    });
    return p.compose(p.space(), p.print(node.id), "(", ...properties, ")");
  },
});
const SassMapProperty = defineNode("SassMapProperty", {
  fields: {
    key: {
      validate: v.validateType(Identifier),
    },
    value: {
      validate: v.validateOneOf([
        v.validateType("SassMap"),
        v.validateType(SassValue),
        v.validateType(SassNumber),
      ]),
    },
    quoted: {
      required: false,
      validate: v.validateValueType("boolean"),
    },
  },
  generate: (node, parent) => {
    const key = node.quoted
      ? compose("'", p.print(node.key), "'")
      : p.print(node.key);
    return p.compose(key, ":", p.space(), p.print(node.value, node));
  },
});

const SassMap = defineNode("SassMap", {
  fields: {
    properties: {
      validate: v.validateArrayOf(v.validateType(SassMapProperty)),
    },
  },
  generate: (node, parent) => {
    if (!node.properties.length) {
      return "()";
    }
    const properties = node.properties.map((prop, index) => {
      const isLast = index < node.properties.length - 1 ? "," : "";
      return compose(p.newLine(2), p.print(prop), isLast);
    });
    return compose("(", ...properties, p.newLine(0), ")");
  },
});
const Assignment = defineNode("Assignment", {
  fields: {
    id: {
      validate: v.validateType(Identifier),
    },
    init: {
      validate: v.validateOneOf([
        v.validateType(SassFunctionCall),
        v.validateType(SassMap),
        v.validateType(SassValue),
        v.validateType(SassNumber),
      ]),
    },
    default: {
      required: false,
      validate: v.validateValueType("boolean"),
    },
  },
  generate: (node, parent) => {
    const defaultSection = p.compose(p.space(), "!default");
    return p.compose(
      p.print(node.id, node),
      ":",
      p.space(),
      p.print(node.init, node),
      defaultSection,
      ";"
    );
  },
});

const NewLine = defineNode("NewLine", {
  generate: () => {
    return p.newLine(0);
  },
});
const SassBoolean = defineNode("SassBoolean", {
  fields: {
    value: {
      validate: v.validateValueType("boolean"),
    },
  },
  generate: (node) => {
    console.log("8888888888888888888888", node);

    return node.value ? "true" : "false";
  },
});

const SassFunction = defineNode("SassFunction", {
  fields: {
    id: {
      validate: v.validateType(Identifier),
    },
    params: {
      required: false,
      validate: v.validateArrayOf(
        v.validateOneOf([v.validateType(Identifier)])
      ),
    },
    body: {
      validate: v.validateType(BlockStatement),
    },
  },
  generate: (node, parent) => {
    const first = compose(
      "@function",
      p.space(),
      p.print(node.id, parent),
      "("
    );

    const middle = node.params.map((child, index) => {
      const a = index < node.params.length ? compose(",", p.space()) : "";
      return p.compose(p.print(child, node), a);
    });

    return compose(first, middle, ")", p.space(), p.print(node.body, parent));
  },
});
export default {
  SassModule,
  StyleSheet,
  SassValue,
  SassFunctionCall,
  NewLine,
  SassMap,
  SassMapProperty,
  Assignment,
  SassNumber,
  SassBoolean,
  Identifier,
  IfStatement,
  SassFunction,
  SassString,
  BlockStatement,
  LogicalExpression,
  AtReturn,
};
