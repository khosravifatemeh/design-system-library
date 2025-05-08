import { formateCode, print } from "scss-builder/generate/printer";
import { GenerateResult } from "scss-builder/types";

export function generate(node: Node): GenerateResult {
  const rawCode = print(node);

  return {
    code: formateCode(rawCode),
  };
}
