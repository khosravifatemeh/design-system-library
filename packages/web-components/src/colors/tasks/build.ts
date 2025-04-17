import { promises as fs, mkdirSync } from "fs";
import * as path from "path";
import { types as t, primitive, generate } from "scss-builder";
import { colors } from "../colors";

function buildColorsFile() {
  const colorVariables = Object.entries(colors).flatMap(
    ([colorName, shades]) => {
      return Object.entries(shades).map(([shade, value]) => {
        return t.Assignment({
          id: t.Identifier(`${colorName}-${shade}`, true),
          init: primitive(value),
          default: true,
        });
      });
    }
  );

  const colorsMap = t.Assignment({
    id: t.Identifier("colors"),
    init: t.SassMap({
      properties: Object.entries(colors).map(([colorName, shades]) =>
        t.SassMapProperty({
          key: t.Identifier(colorName, true),
          value: t.SassMap({
            properties: Object.entries(shades).map(([shade, _value]) =>
              t.SassMapProperty({
                key: t.Identifier(shade),
                value: primitive(`$${colorName}-${shade}`),
                quoted: true,
              })
            ),
          }),
          quoted: true,
        })
      ),
    }),
    default: true,
  });

  return t.StyleSheet([t.NewLine(), ...colorVariables, t.NewLine(), colorsMap]);
}

async function build() {
  try {
    const generatedDir = path.resolve(__dirname, "../../scss/generated");
    mkdirSync(generatedDir, { recursive: true });
    const filePath1 = path.resolve(generatedDir, "_colors.scss");
    const { code } = generate(buildColorsFile() as any);
    await fs.writeFile(filePath1, code);
    console.log("Colors SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Colors SCSS files:", error);
    process.exit(1);
  }
}

build();
