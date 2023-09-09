import fs from "fs";
const code = fs.readFileSync("./build/stdio.wasm");
// 빌드 디렉터리에 있는 wasm 파일을 불러옴
// asconfig.json 에 설정에 stdio 를 추가

let wasm_memory;

WebAssembly.instantiate(code, {
        stdio: {
                fd_stdout: (iov) => {
                        console.log(iov);

                        console.log(new Uint32Array(wasm_memory.buffer, iov, 2));

                        const [offset, limit] = new Uint32Array(wasm_memory.buffer, iov, 2);

                        console.log(new Uint8Array(wasm_memory.buffer, offset, limit));

                        //Uint8Array(13)
                        //[ 72, 101, 108, 108, 111, 32,  87, 111, 114, 108, 100,  33, 10];
                        //  H    e    l    l     o       W     o    r   l    d     !  \n

                        // const STDOUT = 1;
                        // fs.writeSync(1, new Uint8Array(wasm_memory.buffer, offset, limit));
                        fs.writeSync(1, new Uint8Array(wasm_memory.buffer), offset, limit);
                },

                fd_stdin: (iov) => {
                        console.log(iov);

                        console.log(new Uint32Array(wasm_memory.buffer, iov, 1));
                        const [addr] = new Uint32Array(wasm_memory.buffer, iov, 1);
                        // const STDIN = 0;
                        return fs.readSync(0, new Uint8Array(wasm_memory.buffer, addr));
                },
        },
        env: { abort: () => {} },
        // 이거를 필수로 작성해줘야함.
        // 빼고 실행해보면 알 수 있음.
        // 웹어셈블리 코드를 실행하는데에 반드시 필요한 오브젝트이고, 함수임.
}).then(async (wasm) => {
        const { stdio, memory } = wasm.instance.exports;

        // 웹어셈블리 인스턴스에는
        // assembly/stdio.ts에 정의한 stdio 라는 함수와 웹어셈블리 memory 가 있음.

        memory.grow(1);
        // 메모리 사이즈를 키워주는 거 같음? 지금은 필요없음

        wasm_memory = memory;
        // wasm_memory 가 momory 를 참조하도록 함.

        const x = stdio();

        console.log(x);
        console.log(memory.buffer);
});
