export interface Node {
  type: string;
  [key: string]: any;
}

export interface NodeField {
  validate: (value: unknown, node: Node) => void;
  required?: boolean;
}

export interface NodeFields {
  [key: string]: NodeField;
}

export interface NodeDefinitionOptions {
  fields?: NodeFields;
  generate: (node: any, parent?: Node) => void;
}
export interface StyleSheet {
  type: "StyleSheet";
  children: Node[];
}
