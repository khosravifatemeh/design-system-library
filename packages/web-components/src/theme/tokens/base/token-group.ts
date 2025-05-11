import { Token, TokenItem } from "./token";

export interface TokenGroupItem {
  name: string;
  tokens?: (string | TokenGroupItem)[];
}
interface TokenContext {
  [key: string]: any;
}
type TokenChildren = TokenItem | TokenGroupItem;

export class TokenGroup {
  kind: string = "TokenGroup";
  name: TokenGroupItem["name"];
  children: TokenChildren[];

  static create({ name, tokens }: TokenGroupItem): TokenGroup {
    return new TokenGroup(name, tokens);
  }

  constructor(name: string, tokens: TokenGroupItem["tokens"]) {
    this.name = name;
    this.children = tokens.map((child: any) => {
      if (child instanceof TokenGroup) {
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
    };
    return this.children.flatMap((child: TokenChildren) => {
      if (child instanceof TokenGroup) {
        return child.getTokens(context);
      }
      const token = {
        ...context,
        name: child.name,
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
