import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, types as t, util as u } from "scss-builder";
import { aspectRatios } from "../aspect-ratio";
import { blurLevels } from "../blur";
import { borderWidths } from "../border";
import { cursors } from "../cursor";
import { radii } from "../radius";
interface BuildFile {
  filepath: string;
  builder: any;
}

function getMap(prefix, list) {
  if (typeof list !== "object") {
    return u.primitive(`$${prefix}`);
  }
  return t.SassMap({
    properties: Object.entries(list).map(([key, value]) => {
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

function buildTokens(prefix, list) {
  const colorVariables = getVariables(null, list);
  const colorsMap = t.Assignment({
    id: t.Identifier(prefix),
    init: getMap(null, list),
  });

  return t.StyleSheet([t.NewLine(), ...colorVariables, t.NewLine(), colorsMap]);
}

export function getGeneratedPath(module: string) {
  const SRC_DIR = process.env.SRC_DIR || path.resolve(__dirname, "../");
  return path.join(SRC_DIR, module, "scss", "generated");
}
async function build() {
  const generatedDir = getGeneratedPath("effect");

  const files: BuildFile[] = [
    {
      filepath: path.join(generatedDir, "_aspect-ratio.scss"),
      builder: buildTokens("aspect-ratio", aspectRatios),
    },
    {
      filepath: path.join(generatedDir, "_blur-level.scss"),
      builder: buildTokens("blur-level", blurLevels),
    },
    {
      filepath: path.join(generatedDir, "_border-width.scss"),
      builder: buildTokens("border-width", borderWidths),
    },
    {
      filepath: path.join(generatedDir, "_border-width.scss"),
      builder: buildTokens("border-width", borderWidths),
    },
    {
      filepath: path.join(generatedDir, "_cursor.scss"),
      builder: buildTokens("cursor", cursors),
    },
    {
      filepath: path.join(generatedDir, "_radii.scss"),
      builder: buildTokens("radii", radii),
    },
  ];
  mkdirSync(generatedDir, { recursive: true });
  try {
    for (const { filepath, builder } of files) {
      const { code } = generate(builder as any);
      await writeFile(filepath, code);
    }

    console.log("Effects SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Effects SCSS files:", error);
    process.exit(1);
  }
}

build();
