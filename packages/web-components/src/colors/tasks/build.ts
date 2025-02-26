import { colors, black, white, transparent } from "../colors";
import { kebabCase } from "change-case-all";
import { promises as fs } from "fs";
import * as path from "path";

type ColorGrade = {
  [key: string]: string;
};
type Colors = {
  [key: string]: ColorGrade;
};

function generateScss(colors: Colors) {
  const defaultFlag = " !default";

  const sassContent = `
// Generated colors - DO NOT EDIT

$black: ${black}${defaultFlag};
$white: ${white}${defaultFlag};
$transparent: ${transparent}${defaultFlag};

// Color variables
${Object.entries(colors)
  .filter(([key]) => typeof colors[key] === "object")
  .map(([key, values]) =>
    Object.entries(values as ColorGrade)
      .map(
        ([grade, value]) =>
          `$${kebabCase(key)}-${grade}: ${value}${defaultFlag};`
      )
      .join("\n")
  )
  .join("\n\n")}

// Colors map
$colors: (
${Object.entries(colors)
  .filter(([key]) => typeof colors[key] === "object")
  .map(
    ([key, values]) => `
  "${kebabCase(key)}": (
    ${Object.entries(values as ColorGrade)
      .map(([grade, value]) => `"${grade}": ${value}`)
      .join(",\n    ")}
  )`
  )
  .join(",\n")}
)${defaultFlag};
`;

  return sassContent.trim();
}

async function build() {
  try {
    const scssContent = generateScss(colors);
    const MODULES_ENTRYPOINT = path.resolve(__dirname, "../..", "index.scss");
    await fs.writeFile(MODULES_ENTRYPOINT, scssContent);
    console.log(`✅ Successfully generated ${MODULES_ENTRYPOINT}`);
  } catch (error) {
    console.error("❌ Error generating SCSS:", error);
    process.exit(1);
  }
}

build();
