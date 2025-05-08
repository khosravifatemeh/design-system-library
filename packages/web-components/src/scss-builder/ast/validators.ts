import { newLine } from "../generate/printer";
function validateDefined(node) {
  if (!node) {
    throw new Error("Node is not defined");
  }
}
function validateValueType(expected) {
  return (value) => {
    if (typeof value !== expected) {
      throw new Error(
        `Expected value to be of type ${expected}, instead ` +
          `received ${typeof value}`
      );
    }
  };
}
function validateAny() {
  return () => {};
}
function validateType(def) {
  const type = typeof def === "string" ? def : def.type;
  return (node) => {
    validateDefined(node);
    if (node.type !== type) {
      throw new Error(
        `Expected node to be of type ${type}, instead received: ` +
          `${node.type}`
      );
    }
  };
}
function validateArrayOf(checkType) {
  return (children = [], node) => {
    for (const child of children) {
      checkType(child, node);
    }
  };
}
function validateOneOf(types) {
  return (value, node) => {
    const errors = [];
    for (const type of types) {
      try {
        type(value);
        return;
      } catch (error) {
        errors.push(error.message);
      }
    }
    throw new Error(
      `Expected node to match one of the expected types for ${node.type}.${newLine(0)}
        ${errors.map((error) => error.message).join(newLine(0))} 
        `
    );
  };
}
export default {
  validateValueType,
  validateArrayOf,
  validateOneOf,
  validateType,
  validateAny,
};
