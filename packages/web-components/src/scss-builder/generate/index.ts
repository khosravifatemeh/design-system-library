import { formateCode, print } from "./printer.util";
interface GenerateResult {
  code: string;
}

export function generate(node: Node): GenerateResult {
  const rawCode = print(node).join("");
  console.log(rawCode);

  return {
    code: formateCode(rawCode),
  };
}
