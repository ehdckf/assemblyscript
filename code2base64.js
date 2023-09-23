import fs from "fs";
const code = fs.readFileSync("./build/sweetcorn.wasm", { encoding: "base64" });

console.log(code);
