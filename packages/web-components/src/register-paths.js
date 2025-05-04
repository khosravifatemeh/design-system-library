const path = require("path");
const Module = require("module");
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
  if (request === "layout") {
    return path.resolve(__dirname, "layout/dist/index.js");
  }
  if (request === "colors") {
    return path.resolve(__dirname, "colors/dist/index.js");
  }
  if (request === "scss-builder") {
    return path.resolve(__dirname, "scss-builder/dist/index.js");
  }
  return originalResolve(request, parent);
};
