const path = require("path");
const Module = require("module");
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
  if (request === "layout") {
    return path.resolve(__dirname, "../dist/src/layout/index.js");
  }
  if (request === "colors") {
    return path.resolve(__dirname, "../dist/src/colors/index.js");
  }
  if (request === "scss-builder") {
    return path.resolve(__dirname, "../dist/src/scss-builder/index.js");
  }
  return originalResolve(request, parent);
};
