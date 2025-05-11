export interface TokenItem {
  name: string;
}
export class Token {
  kind: string = "Token";
  name: keyof TokenItem;

  static create(token: TokenItem | string) {
    if (typeof token === "string") {
      return new Token(token);
    }

    return new Token(token.name);
  }

  constructor(name) {
    this.name = name;
  }
}
