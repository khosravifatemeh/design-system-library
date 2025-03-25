import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, primitive, types as t } from "scss-builder";
import { breakpoints, sizes, spacing, zIndices } from "../index";

function buildTokens(group, list) {
  const listVariables = [];
  const Variablesinfo = [];

  Object.entries(list).forEach(([key, value]) => {
    const id = t.Identifier(key, true);
    const assignment = t.Assignment({
      id,
      init: primitive(value),
      default: true,
    });
    listVariables.push(t.NewLine(), assignment);
    Variablesinfo.push([id, key]);
  });

  const listMap = t.Assignment({
    id: t.Identifier(group),
    init: t.SassMap({
      properties: Variablesinfo.map(([id, key]) => {
        return t.SassMapProperty({
          key: id,
          value: primitive(`$${key}`),
        });
      }),
    }),
    default: true,
  });
  return t.StyleSheet([...listVariables, t.NewLine(), listMap]);
}
function generateTokens(tokens) {
  const { code } = generate(tokens);
  return code;
}
function generateZindex() {
  return generateTokens(buildTokens("z-index", zIndices));
}
function generateSpacing() {
  return generateTokens(buildTokens("spacing", spacing));
}
function generateBreakpoints() {
  return generateTokens(buildTokens("breakpoint", breakpoints));
}
function generateSizes() {
  return generateTokens(buildTokens("size", sizes));
}

async function build() {
  const generatedDir = path.resolve(__dirname, "../../scss/generated");
  mkdirSync(generatedDir, { recursive: true });
  const filePath1 = path.join(generatedDir, "_spacing.scss");
  const filePath2 = path.join(generatedDir, "_zindex.scss");
  const filePath3 = path.join(generatedDir, "_breakpoint.scss");
  const filePath4 = path.join(generatedDir, "_size.scss");
  try {
    await writeFile(filePath1, generateSpacing());
    await writeFile(filePath2, generateZindex());
    await writeFile(filePath3, generateBreakpoints());
    await writeFile(filePath4, generateSizes());
    console.log("Layout SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Layout SCSS files:", error);
    process.exit(1);
  }
}

build();
