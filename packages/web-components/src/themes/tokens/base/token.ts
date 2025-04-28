export interface TokenItem {
  name: string;
  properties: string[];
  state?: string;
}
export class Token {
  kind: string = "Token";
  name: keyof TokenItem;
  properties: keyof TokenItem;
  state: keyof TokenItem;

  static create(token: TokenItem | string) {
    if (typeof token === "string") {
      return new Token(token);
    }

    return new Token(token.name, token.properties, token.state);
  }

  constructor(name, properties?, state?) {
    this.name = name;

    if (properties) {
      this.properties = properties;
    }

    if (state) {
      this.state = state;
    }
  }
}
