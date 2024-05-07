import { promises as fs, mkdirSync } from "fs";
import * as path from "path";
import { types as t, util as u, generate } from "@scss-builder";
import { colors } from "@colors";

function getMap(prefix, values) {
  if (typeof values !== "object") {
    return u.primitive(`$${prefix}`);
  }
  return t.SassMap({
    properties: Object.entries(values).map(([key, value]) => {
      const name = u.joinKeys(prefix, key);
      return t.SassMapProperty({
        key: t.Identifier(key, true),
        value: getMap(name, value),
      });
    }),
  });
}

function getVariables(prefix, values) {
  return Object.entries(values).flatMap(([key, value]) => {
    if (typeof value === "object") {
      const name = u.joinKeys(prefix, key);
      return getVariables(name, value);
    }
    return t.Assignment({
      id: t.Identifier(u.joinKeys(prefix, key), true),
      init: u.primitive(value),
      default: true,
    });
  });
}

function buildColorTokens() {
  const colorVariables = getVariables(null, colors);
  const colorsMap = t.Assignment({
    id: t.Identifier("colors"),
    init: getMap(null, colors),
  });

  return t.StyleSheet([t.NewLine(), ...colorVariables, t.NewLine(), colorsMap]);
}

export function getGeneratedPath(module: string) {
  const SRC_DIR = process.env.SRC_DIR || path.resolve(__dirname, "../");
  return path.join(SRC_DIR, module, "scss", "generated");
}

async function build() {
  try {
    const generatedDir = getGeneratedPath("colors");
    mkdirSync(generatedDir, { recursive: true });
    const filePath1 = path.resolve(generatedDir, "_colors.scss");
    const { code } = generate(buildColorTokens() as any);
    await fs.writeFile(filePath1, code);
    console.log("Colors SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Colors SCSS files:", error);
    process.exit(1);
  }
}

build();
