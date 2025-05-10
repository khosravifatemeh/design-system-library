import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, util as u, types as t } from "scss-builder";
import { breakpoints, sizes, spacing, zIndices } from "../index";

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
  const layoutVariables = getVariables(null, list);
  const layoutMap = t.Assignment({
    id: t.Identifier(prefix),
    init: getMap(null, list),
  });

  return t.StyleSheet([
    t.NewLine(),
    ...layoutVariables,
    t.NewLine(),
    layoutMap,
  ]);
}

export function getGeneratedPath(module: string) {
  const SRC_DIR = process.env.SRC_DIR || path.resolve(__dirname, "../");
  return path.join(SRC_DIR, module, "scss", "generated");
}
async function build() {
  const generatedDir = getGeneratedPath("layout");

  const files: BuildFile[] = [
    {
      filepath: path.join(generatedDir, "_spacing.scss"),
      builder: buildTokens("spacing", spacing),
    },
    {
      filepath: path.join(generatedDir, "_zindex.scss"),
      builder: buildTokens("z-index", zIndices),
    },
    {
      filepath: path.join(generatedDir, "_breakpoint.scss"),
      builder: buildTokens("breakpoint", breakpoints),
    },
    {
      filepath: path.join(generatedDir, "_size.scss"),
      builder: buildTokens("size", sizes),
    },
  ];
  mkdirSync(generatedDir, { recursive: true });
  try {
    for (const { filepath, builder } of files) {
      const { code } = generate(builder as any);
      await writeFile(filepath, code);
    }

    console.log("Layout SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Layout SCSS files:", error);
    process.exit(1);
  }
}

build();
