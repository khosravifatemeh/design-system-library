import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, primitive, types as t } from "scss-builder";
import { aspectRatios } from "../aspect-ratio";
import { blurLevels } from "../blur";
import { borderWidths } from "../border";
import { cursors } from "../cursor";
import { radii } from "../radius";

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
  });
  return t.StyleSheet([...listVariables, t.NewLine(), listMap]);
}
function generateTokens(tokens) {
  const { code } = generate(tokens);
  return code;
}
function generateAspectRatios() {
  return generateTokens(buildTokens("aspect-ratio", aspectRatios));
}
function generateBlurLevels() {
  return generateTokens(buildTokens("blur-level", blurLevels));
}
function generateBorderWidths() {
  return generateTokens(buildTokens("border-width", borderWidths));
}
function generateCursors() {
  return generateTokens(buildTokens("cursor", cursors));
}
function generateRadii() {
  return generateTokens(buildTokens("radii", radii));
}

async function build() {
  const generatedDir = path.resolve(__dirname, "../../scss/generated");
  mkdirSync(generatedDir, { recursive: true });

  const filePath1 = path.join(generatedDir, "_aspect-ratio.scss");
  const filePath2 = path.join(generatedDir, "_blur-level.scss");
  const filePath3 = path.join(generatedDir, "_border-width.scss");
  const filePath4 = path.join(generatedDir, "_cursor.scss");
  const filePath5 = path.join(generatedDir, "_radii.scss");

  try {
    await writeFile(filePath1, generateAspectRatios());
    await writeFile(filePath2, generateBlurLevels());
    await writeFile(filePath3, generateBorderWidths());
    await writeFile(filePath4, generateCursors());
    await writeFile(filePath5, generateRadii());
    console.log("Effects SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Effects SCSS files:", error);
    process.exit(1);
  }
}

build();
