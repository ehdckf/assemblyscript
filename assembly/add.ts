// The entry file of your WebAssembly module.

export function add(): void {
        let byte = memory.data(1);
        let iov = memory.data(32);
        let N = 0;
        store<u32>(iov, byte, 0);
        store<u32>(iov, 1, sizeof<usize>());

        const length = fd_stdin(iov);
        let line: u8[] = [];
        for (let i: usize = 0; i < length; i++) {
                line.push(load<u8>(byte + i));
        }

        for (let i: i32 = 0; i < line.length - 2; i++) {
                N = N * 10 + parseInt(String.fromCharCode(line[i]));
        }

        const answer = ((N * 10) / 11).toString();

        const answer_utf8_buf = String.UTF8.encode(answer);
        const answer_utf8_len: usize = answer_utf8_buf.byteLength;
        const answer_iov = memory.data(32);
        store<u32>(answer_iov, changetype<usize>(answer_utf8_buf));
        store<u32>(answer_iov, answer_utf8_len, sizeof<usize>());

        fd_stdout(answer_iov);
}
