import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import {
  convert,
  formats,
  generate,
  primitive,
  types as t,
} from "scss-builder";
import { animation } from "../animations";
import { duration } from "../durations";
import { easing } from "../easings";
import { keyframes } from "../keyframes";
import { animationStyles } from "../motion-styles";

function convertValueToSassMap(value) {
  if (typeof value !== "object") {
    return t.SassValue(value);
  }

  return t.SassMap({
    properties: Object.entries(value).map(([key, value]) => {
      return t.SassMapProperty({
        key: t.Identifier(key, true),
        value:
          typeof value === "object"
            ? convertValueToSassMap(value)
            : primitive(value),
      });
    }),
  });
}

function generateMotionStyle() {
  const variables = Object.entries(animationStyles).map(([key, value]) => {
    return t.Assignment({
      id: t.Identifier(key, true),
      init: convertValueToSassMap(value),
      default: true,
    });
  });

  const ast = t.StyleSheet([t.NewLine(), ...variables]);
  const { code } = generate(ast as any);
  return code;
}

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
function generateAnimation() {
  return generateTokens(buildTokens("animation", animation));
}
function generateDuration() {
  return generateTokens(buildTokens("duration", duration));
}
function generateEasing() {
  return generateTokens(buildTokens("easing", easing));
}
function genKeyframeTokens() {
  const keyframeMap = t.Assignment({
    id: t.Identifier("keyframe"),
    init: t.SassMap({
      properties: Object.entries(keyframes).map(([name, stages]) => {
        return t.SassMapProperty({
          key: t.Identifier(name, true),
          value: t.SassMap({
            properties: Object.entries(stages).map(([stage, properties]) =>
              t.SassMapProperty({
                key: t.Identifier(stage),
                value: t.SassMap({
                  properties: Object.entries(properties).map(([prop, value]) =>
                    t.SassMapProperty({
                      key: t.Identifier(prop, true),
                      value: t.SassValue(value),
                    })
                  ),
                }),
              })
            ),
          }),
        });
      }),
    }),
    default: true,
  });

  return t.StyleSheet([t.NewLine(), keyframeMap]);
}
function generateKeyframe() {
  return generateTokens(genKeyframeTokens());
}

async function build() {
  const generatedDir = path.resolve(__dirname, "../../scss/generated");
  mkdirSync(generatedDir, { recursive: true });

  const filePath1 = path.join(generatedDir, "_motion-style.scss");
  const filePath2 = path.join(generatedDir, "_animation.scss");
  const filePath3 = path.join(generatedDir, "_duration.scss");
  const filePath4 = path.join(generatedDir, "_easing.scss");
  const filePath5 = path.join(generatedDir, "_keyframe.scss");
  try {
    await writeFile(filePath1, generateMotionStyle());
    await writeFile(filePath2, generateAnimation());
    await writeFile(filePath3, generateDuration());
    await writeFile(filePath4, generateEasing());
    await writeFile(filePath5, generateKeyframe());
    console.log("Motion SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Motion SCSS files:", error);
    process.exit(1);
  }
}

build();
