import { types as t, util as u } from "scss-builder";

import { themes } from "../..";

export function buildThemes() {
  const imports = [
    t.SassModule("sass:map"),
    t.SassModule("../layout"),
    t.SassModule("../type"),
    t.SassModule("../motion"),
    t.SassModule("../effects"),
    t.SassModule("../utilities"),
  ];

  const variables = Object.entries(themes).flatMap(([key, theme]) => {
    return [
      t.NewLine(),
      t.Assignment({
        id: t.Identifier(key, true),
        init: t.SassMap({
          properties: Object.entries(theme).map(([token, value]) =>
            t.SassMapProperty({
              key: t.Identifier(token, true),
              value: u.primitive(value),
            })
          ),
        }),
        default: true,
      }),
      t.Assignment({
        id: t.Identifier(key, true),
        init: t.SassFunctionCall({
          id: t.Identifier("merge"),
          params: [
            t.SassValue(`$${key}`),
            t.SassValue("$aspect-ratios"),
            t.SassValue("$blur-levels"),
            t.SassValue("$border-widths"),
            t.SassValue("$cursors"),
            t.SassValue("$radii"),
            t.SassValue("$breakpoint"),
            t.SassValue("$sizes"),
            t.SassValue("$spacing"),
            t.SassValue("$zIndices"),
            t.SassValue("$animation"),
            t.SassValue("$duration"),
            t.SassValue("$easing"),
            t.SassValue("$font-families"),
            t.SassValue("$font-sizes"),
            t.SassValue("$font-weights"),
            t.SassValue("$letter-spacings"),
            t.SassValue("$line-heights"),
          ],
        }),
      }),
    ];
  });

  return t.StyleSheet([t.NewLine(), ...imports, ...variables]);
}
