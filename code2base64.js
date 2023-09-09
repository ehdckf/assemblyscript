import fs from "fs";
const code = fs.readFileSync("./build/countingSort.wasm", { encoding: "base64" });

console.log(code);
