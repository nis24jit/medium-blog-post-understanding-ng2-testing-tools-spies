import * as path from "path";

let rootDir = path.resolve(__dirname, "..");

export function rootPathTo(args: Array<string>) {
  // args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [rootDir].concat(args));
}
