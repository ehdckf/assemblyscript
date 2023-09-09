// The entry file of your WebAssembly module.

declare function fd_stdin(iov: usize): usize;
declare function fd_stdout(iov: usize): void;

export function stdio(): void {
        let byte = memory.data(1);
        let iov = memory.data(32);

        store<u32>(iov, byte, 0);
        store<u32>(iov, 1, sizeof<usize>());

        const length = fd_stdin(iov);

        if (length <= 2) return;

        let line: u8[] = [];

        for (let i: usize = 0; i < length; i++) {
                line.push(load<u8>(byte + i));
        }

        const iov2 = memory.data(32);
        store<u32>(iov2, changetype<usize>(line), 0);
        store<u32>(iov2, line.length + 100, sizeof<usize>());
        fd_stdout(iov2);
}
