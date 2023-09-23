// The entry file of your WebAssembly module.
@external('env','fd_stdin')
declare function fd_stdin(iov: usize): usize;

@external('env','fd_stdout')
declare function fd_stdout(iov: usize): void;

export function sweetCorn(): void {
        let byte = memory.data(1);
        let iov = memory.data(32);
        let N: u32 = 0;
        store<u32>(iov, byte, 0);
        store<u32>(iov, 1, sizeof<usize>());

        const length = fd_stdin(iov);
        let line: u8[] = [];
        for (let i: usize = 0; i < length; i += sizeof<u8>()) {
                line.push(load<u8>(byte + i));
        }


        for (let i: i32 = 0; i < line.length; i++) {
                if(line[i]>=48 && line[i]<=57)
                N = N * 10 + (line[i] - 48);
        }

        N = (N*10)/11;
        // const answer = ((N * 10) / 11).toString() +'\n';
        // const answer_utf8_buf = String.UTF8.encode(answer);
        // const answer_utf8_len: usize = answer_utf8_buf.byteLength;
        const answer_iov = memory.data(32);
        store<u32>(answer_iov, N);
        // store<u32>(answer_iov, sizeof<usize>(), sizeof<usize>());
        fd_stdout(answer_iov);
}
