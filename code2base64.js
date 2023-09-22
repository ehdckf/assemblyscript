import fs from "fs";
const code = fs.readFileSync("./build/sweetcorn.wasm", { encoding: "base64url" });

console.log(code);
