import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, types as t, util as u } from "scss-builder";
import { fontSizes } from "../font-sizes";
import { fontWeights } from "../font-weights";
import { fontFamilies } from "../fonts";
import { letterSpacings } from "../letter-spacing";
import { lineHeights } from "../line-height";
import { textStyles } from "../text-styles";

interface BuildFile {
  filepath: string;
  builder: any;
}

function getMap(list, useSassVar) {
  if (typeof list !== "object") {
    const value = useSassVar ? `$${list}` : list;
    return u.primitive(value);
  }
  return t.SassMap({
    properties: Object.entries(list).map(([key, value]) => {
      return t.SassMapProperty({
        key: t.Identifier(key, true),
        value: useSassVar ? getMap(key, useSassVar) : getMap(value, useSassVar),
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
  const layoutVariables = getVariables(null, list);
  const layoutMap = t.Assignment({
    id: t.Identifier(prefix),
    init: getMap(list, true),
  });

  return t.StyleSheet([
    t.NewLine(),
    ...layoutVariables,
    t.NewLine(),
    layoutMap,
  ]);
}
function buildTextStyle() {
  const variableStyle = Object.entries(textStyles).flatMap(([key, values]) => {
    return [
      t.NewLine(),
      t.Assignment({
        id: t.Identifier(u.joinKeys("text-style", key), true),
        init: getMap(values, false),
      }),
    ];
  });
  return t.StyleSheet([...variableStyle]);
}
export function getGeneratedPath(module: string) {
  const SRC_DIR = process.env.SRC_DIR || path.resolve(__dirname, "../");
  return path.join(SRC_DIR, module, "scss", "generated");
}
async function build() {
  const generatedDir = getGeneratedPath("type");

  const files: BuildFile[] = [
    {
      filepath: path.join(generatedDir, "_font-size.scss"),
      builder: buildTokens("font-size", fontSizes),
    },
    {
      filepath: path.join(generatedDir, "_font-weight.scss"),
      builder: buildTokens("font-weight", fontWeights),
    },
    {
      filepath: path.join(generatedDir, "_font-family.scss"),
      builder: buildTokens("font-family", fontFamilies),
    },
    {
      filepath: path.join(generatedDir, "_letter-spacing.scss"),
      builder: buildTokens("letter-spacing", letterSpacings),
    },
    {
      filepath: path.join(generatedDir, "_line-height.scss"),
      builder: buildTokens("line-height", lineHeights),
    },
    {
      filepath: path.join(generatedDir, "_text-style.scss"),
      builder: buildTextStyle(),
    },
  ];
  mkdirSync(generatedDir, { recursive: true });
  try {
    for (const { filepath, builder } of files) {
      const { code } = generate(builder as any);
      await writeFile(filepath, code);
    }

    console.log("Type SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Type SCSS files:", error);
    process.exit(1);
  }
}

build();
