import fs from "fs";
const code = fs.readFileSync("./build/sweetcorn.wasm");

let wasm_memory;

WebAssembly.instantiate(code, {
        sweetcorn: {
                fd_stdin: (iov) => {
                        const [addr] = new Uint32Array(wasm_memory.buffer, iov, 1);
                        // const STDIN = 0;
                        return fs.readSync(0, new Uint8Array(wasm_memory.buffer, addr));
                },
                fd_stdout: (iov) => {
                        const [addr, limit] = new Uint32Array(wasm_memory.buffer, iov, 2);
                        // const STD_OUT = 1;
                        fs.writeSync(1, new Uint8Array(wasm_memory.buffer, addr, limit));
                },
        },
        env: {
                abort: () => {},
                "console.log": (msg) => {
                        console.log(msg);
                },
        },
}).then(async (wasm) => {
        const { sweetCorn, memory } = wasm.instance.exports;
        // 웹어셈블리 인스턴스에는
        // sweetCorn 라는 함수와 웹어셈블리 memory 가 있음.
        // 인풋을 그냥 파라미터로 받아서 memory는 딱히 필요 없음??
        memory.grow(10);
        // 메모리 사이즈를 키워주는 거 같음? 지금은 필요없음
        wasm_memory = memory;
        // wasm_memory 가 momory 를 참조하도록함.
        sweetCorn();
        console.log();
});
