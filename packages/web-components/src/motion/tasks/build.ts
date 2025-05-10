import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { generate, util as u, types as t } from "scss-builder";
import { animation } from "../animations";
import { duration } from "../durations";
import { easing } from "../easings";
import { keyframes } from "../keyframes";
import { animationStyles } from "../motion-styles";

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

function buildMotionStyle() {
  const variables = Object.entries(animationStyles).map(([key, value]) => {
    return t.Assignment({
      id: t.Identifier(key, true),
      init: getMap(value, false),
      default: true,
    });
  });

  return t.StyleSheet([t.NewLine(), ...variables]);
}

function buildTokens(prefix, list) {
  const motionVariables = getVariables(null, list);
  const motionMap = t.Assignment({
    id: t.Identifier(prefix),
    init: getMap(list, true),
  });

  return t.StyleSheet([
    t.NewLine(),
    ...motionVariables,
    t.NewLine(),
    motionMap,
  ]);
}

function getGeneratedPath(module: string) {
  const SRC_DIR = process.env.SRC_DIR || path.resolve(__dirname, "../");
  return path.join(SRC_DIR, module, "scss", "generated");
}
function buildKeyframe() {
  const keyframeMap = t.Assignment({
    id: t.Identifier("keyframe"),
    init: getMap(keyframes, false),
    default: true,
  });

  return t.StyleSheet([t.NewLine(), keyframeMap]);
}
async function build() {
  const generatedDir = getGeneratedPath("motion");

  const files: BuildFile[] = [
    {
      filepath: path.join(generatedDir, "_motion-style.scss"),
      builder: buildMotionStyle(),
    },
    {
      filepath: path.join(generatedDir, "_animation.scss"),
      builder: buildTokens("animation", animation),
    },
    {
      filepath: path.join(generatedDir, "_duration.scss"),
      builder: buildTokens("duration", duration),
    },
    {
      filepath: path.join(generatedDir, "_easing.scss"),
      builder: buildTokens("easing", easing),
    },
    {
      filepath: path.join(generatedDir, "_keyframe.scss"),
      builder: buildKeyframe(),
    },
  ];
  mkdirSync(generatedDir, { recursive: true });
  try {
    for (const { filepath, builder } of files) {
      const { code } = generate(builder as any);
      await writeFile(filepath, code);
    }

    console.log("Motion SCSS has been generated successfully");
  } catch (error) {
    console.error("error writing Motion SCSS files:", error);
    process.exit(1);
  }
}

build();
