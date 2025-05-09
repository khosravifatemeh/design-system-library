import * as u from "scss-builder/utils";
import { types as t } from "scss-builder/ast";
export function primitive(value: any) {
  if (typeof value === "string") {
    if (value.startsWith("#")) {
      return t.SassValue(value);
    }
    if (value.startsWith("$")) {
      return t.SassValue(u.convertName(value));
    }

    if (
      value.endsWith("px") ||
      value.endsWith("em") ||
      value.endsWith("%") ||
      value.endsWith("rem") ||
      value.endsWith("ch") ||
      value.endsWith("dvh") ||
      value.endsWith("lvh") ||
      value.endsWith("svh") ||
      value.endsWith("dvw") ||
      value.endsWith("svw") ||
      value.endsWith("lvw") ||
      value.endsWith("vw") ||
      value.endsWith("vh") ||
      value.startsWith("rgb") ||
      value === "0"
    ) {
      return t.SassValue(value);
    }

    return t.SassValue(`unquote("${value}")`);
  }

  if (typeof value === "number") {
    return t.SassNumber(value);
  }

  throw new Error(`Unknown type: ${typeof value}`);
}

export function joinKeys(k1, k2) {
  return [k1, k2].join("-");
}
