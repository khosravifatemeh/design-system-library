import { definitions } from "./ast";

export interface GenerateResult {
  code: string;
}
export interface NodeFieldSpec {
  validate: (value: unknown, node: Node) => void;
  required?: boolean;
}

export type NodeField<T> = {
  [K in keyof Omit<T, "type">]: NodeFieldSpec;
};
export type NodeFactory = (...args: unknown[]) => Node;

export type DefinitionMap = typeof definitions;
export type Types = {
  [K in keyof DefinitionMap]: DefinitionMap[K]["builder"];
};

type Generate<T> = (node: T, parent?: Node) => string | number;
export type Field<T> = { [K in keyof Omit<T, "type">]: NodeFieldSpec };
export interface NodeDefinition<T> {
  fields?: Field<T>;
  generate: Generate<T>;
}
export type NodeBuilder<T extends Node> = {
  type: string;
  builder: NodeFactory;
  generate: Generate<T>;
};

export interface Node {
  type: string;
}

export interface SassNumber extends Node {
  value: number;
}

export interface SassModule extends Node {
  path: string;
}

export interface SassValue extends Node {
  value: any;
}

export interface SassString extends Node {
  value: string;
}

export interface AtReturn extends Node {
  argument: Node;
}

export interface BlockStatement extends Node {
  body: Node[];
}

export interface LogicalExpression extends Node {
  left: Node;
  operator: string;
  right: Node;
}

export interface IfStatement extends Node {
  test: Node;
  consequent?: BlockStatement;
  alternate?: IfStatement | BlockStatement;
}

export interface StyleSheet extends Node {
  children: Node[];
}

export interface Identifier extends Node {
  name: string;
  kebabCase: boolean;
}

export interface SassFunction extends Node {
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

export interface SassFunctionCall extends Node {
  id: Identifier;
  params: (Identifier | SassValue | SassString)[];
}

export interface SassMapProperty extends Node {
  key: Identifier;
  value: SassMap | SassValue | SassNumber;
  quoted?: boolean;
}

export interface SassMap extends Node {
  properties: SassMapProperty[];
}

export interface Assignment extends Node {
  id: Identifier;
  init: SassFunctionCall | SassMap | SassValue | SassNumber;
  default?: boolean;
}

export interface NewLine extends Node {
  // No additional properties needed
}

export interface SassBoolean extends Node {
  value: boolean;
}
