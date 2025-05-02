import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, primitive, types as t } from "scss-builder";
import { fontSizes } from "../font-sizes";
import { fontWeights } from "../font-weights";
import { fontFamilies } from "../fonts";
import { letterSpacings } from "../letter-spacing";
import { lineHeights } from "../line-height";
import { textStyles } from "../text-styles";

function buildTokens(group, list) {
  const listVariables = [];
  const Variablesinfo = [];

  Object.entries(list).forEach(([key, value]) => {
    const name = `${group}-${key}`;
    const id = t.Identifier(name, true);
    const assignment = t.Assignment({
      id,
      init: primitive(value),
      default: true,
    });
    listVariables.push(t.NewLine(), assignment);
    Variablesinfo.push([id, name]);
  });

  const listMap = t.Assignment({
    id: t.Identifier(group),
    init: t.SassMap({
      properties: Variablesinfo.map(([id, name]) => {
        return t.SassMapProperty({
          key: id,
          value: primitive(`${name}`),
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

function generateFontSize() {
  return generateTokens(buildTokens("font-size", fontSizes));
}
function generateFontWeight() {
  return generateTokens(buildTokens("font-weight", fontWeights));
}
function generateFontFamily() {
  return generateTokens(buildTokens("font-family", fontFamilies));
}
function generateLetterSpacing() {
  return generateTokens(buildTokens("letter-spacing", letterSpacings));
}
function generateLineHeight() {
  return generateTokens(buildTokens("line-height", lineHeights));
}
function generateTextStyle() {
  const group = "group-style";
  const variableStyle = Object.entries(textStyles).flatMap(([key, values]) => {
    return [
      t.NewLine(),
      t.Assignment({
        id: t.Identifier(`${group}-${key}`, true),
        init: t.SassMap({
          properties: Object.entries(values).map(([id, val]) => {
            return t.SassMapProperty({
              key: t.Identifier(id, true),
              value: primitive(val),
            });
          }),
        }),
      }),
    ];
  });
  return generateTokens(t.StyleSheet([...variableStyle]));
}
async function build() {
  const generatedDir = path.resolve(__dirname, "../../scss/generated");
  mkdirSync(generatedDir, { recursive: true });

  const filePath1 = path.join(generatedDir, "_font-size.scss");
  const filePath2 = path.join(generatedDir, "_font-weight.scss");
  const filePath3 = path.join(generatedDir, "_font-family.scss");
  const filePath4 = path.join(generatedDir, "_letter-spacing.scss");
  const filePath5 = path.join(generatedDir, "_line-height.scss");
  const filePath6 = path.join(generatedDir, "_text-style.scss");
  try {
    await writeFile(filePath1, generateFontSize());
    await writeFile(filePath2, generateFontWeight());
    await writeFile(filePath3, generateFontFamily());
    await writeFile(filePath4, generateLetterSpacing());
    await writeFile(filePath5, generateLineHeight());
    await writeFile(filePath6, generateTextStyle());
    console.log("Keyframes SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing keyframes SCSS file:", error);
    process.exit(1);
  }
}

build();
