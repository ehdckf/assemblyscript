declare function fd_stdout(iov: usize): void;

export function hello(): void {
        const text = "Hello World!\n"; // 출력하고자 하는 텍스트
        const s_utf8_buf = String.UTF8.encode(text);
        // text를 u8 로 저장
        // s_utf8_buf는 text가 기록된 메모리에 대한 포인터
        const s_utf8_len: usize = s_utf8_buf.byteLength; // text 길이
        const iov = memory.data(32); // 16 size의 0으로 채워져 있는 메모리 포인터

        store<u32>(iov, changetype<usize>(s_utf8_buf));
        // iov에는 text를 가리키는 포인터 를 가리키는 포인터를 저장

        store<u32>(iov, s_utf8_len, sizeof<usize>());
        // iov 다음 포인터? *(iov + 1) 에는 text 길이를 저장

        let lf = memory.data(8);
        store<u8>(lf, 10);
        store<u32>(iov, lf, sizeof<usize>() * 2);
        store<u32>(iov, 1, sizeof<usize>() * 3);

        // iov 는 포인터의 포인터
        fd_stdout(iov);
}
