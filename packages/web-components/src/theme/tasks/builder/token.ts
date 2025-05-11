import { allColorGroup } from "../../tokens";
import { types as t } from "scss-builder";

export function buildThemeTokens() {
  const imports = [
    t.SassModule('@use "../config"'),
    t.SassModule('@use "../theme"'),
  ];

  const h = t.SassFunction({
    id: t.Identifier("_get"),
    params: [t.Identifier("token")],
    body: t.BlockStatement([
      t.IfStatement({
        test: t.LogicalExpression({
          left: t.SassValue("config.$use-fallback-value"),
          operator: "==",
          right: t.SassBoolean(false),
        }),
        consequent: t.BlockStatement([
          t.AtReturn(t.SassValue("var(--#{config.$prefix}-#{$token})")),
        ]),
        alternate: t.BlockStatement([
          t.AtReturn(
            t.SassValue(
              "var(--#{config.$prefix}-#{$token}, #{theme.get($token)})"
            )
          ),
        ]),
      }),
    ]),
  });

  const variables = allColorGroup.getTokens().map((token: { name: string }) => {
    const id = token.name;
    return t.Assignment({
      id: t.Identifier(id),
      init: t.SassFunctionCall({
        id: t.Identifier("_get"),
        params: [t.SassString(id)],
      }),
    });
  });

  return t.StyleSheet([...imports, t.NewLine(), h, t.NewLine(), ...variables]);
}
