import { definitions, getDefinition } from "../ast";
import prettier from "@prettier/sync";

export const space = (): string => " ";
export const newLine = (indent: number): string =>
  "\n" + space().repeat(indent);
export const compose = (...funcs: string[]): string =>
  funcs.filter(Boolean).join("");
export const print = (node, parent?) => {
  return definitions[node.type].generate(node, parent);
};
export const formateCode = (code: string): string => {
  const prettierOptions = {
    parser: "scss",
    printWidth: 80,
    singleQuote: true,
  };
  return prettier.format(code, prettierOptions);
};

export default {
  space,
  newLine,
  compose,
  print,
};
