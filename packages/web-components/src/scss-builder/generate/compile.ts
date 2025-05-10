import { formateCode, print } from "./printer";
import { GenerateResult } from "../types";

export function generate(node: Node): GenerateResult {
  const rawCode = print(node);

  return {
    code: formateCode(rawCode),
  };
}
