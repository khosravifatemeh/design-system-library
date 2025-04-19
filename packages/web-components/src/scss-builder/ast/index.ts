import definitions from "./node-definition";
type Builder = (...args: unknown[]) => string;
interface Types {
  [key: string]: Builder;
}
const types = Object.keys(definitions).reduce<Types>((acc, key) => {
  const { type, builder } = definitions[key];

  return {
    ...acc,
    [type]: builder,
  };
}, {});

const getDefinition = (type) => {
  console.log("def", definitions);
  return definitions[type];
};
export { definitions, types, getDefinition };
