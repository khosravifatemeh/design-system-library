import { Token, TokenItem } from "./token";

export interface TokenGroupItem {
  name: string;
  properties?: string[];
  tokens?: (string | TokenGroupItem)[];
}
interface TokenContext {
  groups?: TokenGroup[];
  properties?: string[];
  [key: string]: any;
}
type TokenChildren = TokenItem | TokenGroupItem;

export class TokenGroup {
  kind: string = "TokenGroup";
  name: TokenGroupItem["name"];
  properties: TokenGroupItem["properties"];
  children: TokenChildren[];

  static create({ name, properties, tokens }: TokenGroupItem): TokenGroup {
    return new TokenGroup(name, tokens, properties);
  }

  constructor(
    name: string,
    tokens: TokenGroupItem["tokens"],
    properties?: string[]
  ) {
    this.name = name;
    if (properties) {
      this.properties = properties;
    }
    this.children = tokens.map((child: any) => {
      if (child.kind === "TokenGroup") {
        return child;
      }
      return Token.create(child);
    });
  }

  *[Symbol.iterator](): Generator<TokenChildren> {
    yield this;
    for (const child of this.children) {
      yield child;
      if (child instanceof TokenGroup) {
        yield* child;
      }
    }
  }

  getTokens(parentContext: TokenContext = {}): Array<TokenContext> {
    const context: TokenContext = {
      ...parentContext,
      groups: parentContext.groups ? parentContext.groups.concat(this) : [this],
      properties: this.properties || parentContext.properties,
    };
    return this.children.flatMap((child: TokenChildren) => {
      if (child instanceof TokenGroup) {
        return child.getTokens(context);
      }
      const token = {
        ...context,
        name: child.name,
        properties: child?.properties || context.properties,
        state: (child as TokenItem).state,
      };
      return token;
    });
  }
  /**
   * Get a specific token from the TokenGroup, or form one of its nested
   * TokenGroups
   * @returns {Token}
   */
  getToken(tokenOrName) {
    const name =
      typeof tokenOrName === "string" ? tokenOrName : tokenOrName.name;
    for (const child of this) {
      if (child instanceof TokenGroup) {
        continue;
      }

      if (child.name === name) {
        return child;
      }
    }
    return null;
  }
}
