// The entry file of your WebAssembly module.

declare function fd_stdin(iov: usize): usize;
declare function fd_stdout(iov: usize): void;
export function countingSort(): void {
        let N: f64 = 0;

        let byte = memory.data(1);
        let iov = memory.data(32);

        store<u32>(iov, byte, 0);
        store<u32>(iov, 1, sizeof<usize>());

        const length = fd_stdin(iov);
        let line: u8[] = [];
        for (let i: usize = 0; i < length; i++) {
                line.push(load<u8>(byte + i));
        }

        let N_str = "";
        for (let i: i32 = 0; i < line.length - 2; i++) {
                N_str += String.fromCharCode(line[i]);
        }

        N = parseInt(N_str);

        let count = new Uint16Array(10001).fill(0);

        for (let i = 0; i < N; i++) {
                const line: u8[] = [];
                let byte = memory.data(1);
                let iov = memory.data(32);

                store<u32>(iov, byte, 0);
                store<u32>(iov, 1, sizeof<usize>());

                const length = fd_stdin(iov);

                for (let i: usize = 0; i < length - 2; i++) {
                        line.push(load<u8>(byte + i));
                }

                let data: u16 = 0;
                for (let i = changetype<i32>(length - 3); i >= 0; i--) {
                        let c = (line[i] - 48) as u16;
                        for (let p = 0; p < i; p++) {
                                c = (c * 10) as u16;
                        }

                        data += c;
                }

                count[data] += 1;
        }

        let answer = "";

        for (let i = 1; i < 10001; i++) {
                for (let j: u16 = 0; j < count[i]; j++) {
                        answer += `${i}\n`;
                }
        }

        const answer_utf8_buf = String.UTF8.encode(answer);
        const answer_utf8_len: usize = answer_utf8_buf.byteLength;
        const answer_iov = memory.data(32);
        store<u32>(answer_iov, changetype<usize>(answer_utf8_buf));
        store<u32>(answer_iov, answer_utf8_len, sizeof<usize>());

        fd_stdout(answer_iov);
}
