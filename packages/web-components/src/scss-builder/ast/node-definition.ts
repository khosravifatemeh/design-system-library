import p from "../generate/printer";
import t from "../generate/token";
import {
  Assignment,
  AtReturn,
  BlockStatement,
  Identifier,
  IfStatement,
  LogicalExpression,
  NewLine,
  Node,
  NodeDefinition,
  SassBoolean,
  SassFunction,
  SassFunctionCall,
  SassMap,
  SassMapProperty,
  SassModule,
  SassNumber,
  SassString,
  SassValue,
  StyleSheet,
} from "../types";
import { convertName } from "../utils/name-format";
import { defineNode } from "./node-builder";
import v from "./validators";

const SassNumber = defineNode<SassNumber>("SassNumber", {
  fields: {
    value: {
      validate: v.validateValueType("number"),
    },
  },
  generate: (node: SassNumber) => {
    try {
      return node.value;
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const SassModule = defineNode<SassModule>("SassModule", {
  fields: { path: { validate: v.validateValueType("string") } },
  generate: (node: SassModule) => {
    try {
      return p.compose(t.module, t.space, `'${node.path}'`, t.semicolon);
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const SassValue = defineNode<SassValue>("SassValue", {
  fields: {
    value: {
      validate: v.validateAny,
    },
  },
  generate: (node: SassValue) => {
    try {
      return node.value;
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const SassString = defineNode<SassString>("SassString", {
  fields: {
    value: {
      validate: v.validateValueType("string"),
    },
  },
  generate: (node: SassString) => {
    try {
      return `'${node.value}'`;
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const AtReturn = defineNode<AtReturn>("AtReturn", {
  fields: { argument: { validate: v.validateAny } },
  generate: (node: AtReturn, parent: Node) => {
    try {
      const needNewLine =
        "body" in parent &&
        Array.isArray(parent.body) &&
        parent?.body?.indexOf(node) !== -1
          ? p.newLine(0)
          : t.empty;
      return p.compose(
        needNewLine,
        p.newLine(0),
        t.return,
        t.space,
        p.print(node.argument)
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const BlockStatement = defineNode<BlockStatement>("BlockStatement", {
  fields: {
    body: {
      validate: v.validateArrayOf(v.validateAny),
    },
  },
  generate: (node: BlockStatement) => {
    try {
      if (!node.body?.length) return t.openBrace + t.closeBrace;
      const body = node.body.map((child, index) =>
        p.compose(
          p.newLine(2),
          p.print(child, node),
          index < node.body.length - 1 ? p.newLine(2) : t.empty
        )
      );
      return p.compose(
        t.space,
        t.openBrace,
        ...body,
        p.newLine(1),
        t.closeBrace
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const LogicalExpression = defineNode<LogicalExpression>("LogicalExpression", {
  fields: {
    left: { validate: v.validateAny },
    operator: { validate: v.validateValueType("string") },
    right: { validate: v.validateAny },
  },
  generate: (node: LogicalExpression) => {
    try {
      return p.compose(
        p.print(node.left, node),
        p.space(),
        node.operator,
        p.space(),
        p.print(node.right, node)
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

const IfStatement = defineNode<IfStatement>("IfStatement", {
  fields: {
    test: { validate: v.validateAny },
    consequent: {
      required: false,
      validate: v.validateType("BlockStatement"),
    },
    alternate: {
      required: false,
      validate: v.validateOneOf([
        v.validateType("IfStatement"),
        v.validateType("BlockStatement"),
      ]),
    },
  },
  generate: (node: IfStatement, parent: Node) => {
    try {
      const ifKeyword =
        parent && parent.type === IfStatement.type
          ? p.compose(p.space(), t.if)
          : t.atIf;
      const alternate = node.alternate
        ? p.compose(t.atElse, p.print(node.alternate, node))
        : t.empty;
      return p.compose(
        ifKeyword,
        t.space,
        p.print(node.test, node),
        p.print(node.consequent, node),
        alternate
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

const StyleSheet = defineNode<StyleSheet>("StyleSheet", {
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
  generate: (node: StyleSheet, _) => {
    try {
      return node.children
        .map((n: Node, index: number) =>
          p.compose(
            p.print(n),
            index < node.children.length - 1 ? p.newLine(0) : t.empty
          )
        )
        .join("");
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const Identifier = defineNode<Identifier>("Identifier", {
  fields: {
    name: { validate: v.validateValueType("string") },
    kebabCase: { validate: v.validateValueType("boolean") },
  },
  generate: (node: Identifier, parent: Node) => {
    try {
      const name = node.kebabCase ? convertName(node.name) : node.name;
      return p.compose(parent ? t.variablePrefix : t.empty, name);
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const SassFunctionCall = defineNode<SassFunctionCall>("SassFunctionCall", {
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
  generate: (node: SassFunction, _) => {
    try {
      const properties = node.params.map((prop, index) => {
        const needVariablePrefix =
          prop.type === Identifier.type ? t.variablePrefix : t.empty;
        const comma = index < node.params.length ? t.semicolon : t.empty;

        return p.compose(
          needVariablePrefix,
          p.print(prop, node),
          comma,
          p.space()
        );
      });
      return p.compose(
        t.space,
        p.print(node.id),
        t.openParen,
        ...properties,
        t.closeParen
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const SassMapProperty = defineNode<SassMapProperty>("SassMapProperty", {
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
  generate: (node: SassMapProperty, _) => {
    try {
      const key = node.quoted
        ? p.compose(t.singleQuote, p.print(node.key), t.singleQuote)
        : p.print(node.key);
      return p.compose(key, t.colon, p.space(), p.print(node.value, node));
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

const SassMap = defineNode<SassMap>("SassMap", {
  fields: {
    properties: {
      validate: v.validateArrayOf(v.validateType(SassMapProperty)),
    },
  },
  generate: (node: SassMap, _) => {
    try {
      if (!node.properties.length) {
        return t.openParen + t.closeParen;
      }
      const properties = node.properties.map((prop, index) => {
        const isLast =
          index < node.properties.length - 1 ? t.separator : t.empty;
        return p.compose(p.newLine(2), p.print(prop), isLast);
      });
      return p.compose(t.openParen, ...properties, p.newLine(0), t.closeParen);
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});
const Assignment = defineNode<Assignment>("Assignment", {
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
  generate: (node: Assignment, _) => {
    try {
      const defaultSection = p.compose(p.space(), t.default);
      return p.compose(
        p.print(node.id, node),
        t.colon,
        t.space,
        p.print(node.init, node),
        defaultSection,
        t.semicolon
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

const NewLine = defineNode<NewLine>("NewLine", {
  generate: () => {
    return p.newLine(0);
  },
});
const SassBoolean = defineNode<SassBoolean>("SassBoolean", {
  fields: {
    value: {
      validate: v.validateValueType("boolean"),
    },
  },
  generate: (node: SassBoolean) => {
    try {
      return node.value ? "true" : "false";
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

const SassFunction = defineNode<SassFunction>("SassFunction", {
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
  generate: (node: SassFunction, parent: Node) => {
    try {
      const firstSection = p.compose(
        t.function,
        t.space,
        p.print(node.id, parent),
        t.openBrace
      );

      const middleSection = node.params
        .map((child, index) => {
          const needSeparator =
            index < node.params.length
              ? p.compose(t.separator, p.space())
              : t.empty;
          return p.compose(p.print(child, node), needSeparator);
        })
        .join();

      return p.compose(
        firstSection,
        middleSection,
        t.closeBrace,
        t.space,
        p.print(node.body, parent)
      );
    } catch (error) {
      throw new Error(`Unexpected error in ${node.type} - ${error.message}`);
    }
  },
});

export const definitions = {
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
