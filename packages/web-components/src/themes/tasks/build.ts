import path from "path";
import { generate } from "scss-builder";
import { buildThemes } from "./builders/themes";
import { buildThemeTokens } from "./builders/tokens";
import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";

interface BuildFile {
  filepath: string;
  builder: () => string;
}

async function build() {
  const generatedDir = path.resolve(__dirname, "../../scss/generated");
  mkdirSync(generatedDir, { recursive: true });

  const files: BuildFile[] = [
    {
      filepath: path.join(generatedDir, "_themes.scss"),
      builder: buildThemes,
    },
    {
      filepath: path.join(generatedDir, "_tokens.scss"),
      builder: buildThemeTokens,
    },
  ];

  try {
    for (const { filepath, builder } of files) {
      const { code } = generate(builder() as any);
      await writeFile(filepath, code);
    }
    console.log("Theme SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Theme SCSS files:", error);
    process.exit(1);
  }
}

build();
