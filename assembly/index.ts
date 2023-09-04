import "wasi";
import { Console, FileSystem, Descriptor } from "as-wasi/assembly";

function add(a: i32, b: i32): void {
        const result = a + b;
        Console.log(result.toString());
}

// class Node<T> {
//         item: T;
//         prev: Node<T> | null;
//         constructor(item: T) {
//                 this.item = item;
//                 this.prev = null;
//         }
// }

// class Stack<T> {
//         top: Node<T> | null;
//         size: i32;
//         constructor() {
//                 this.top = null;
//                 this.size = 0;
//         }

//         push(item: T) {
//                 const node = new Node(item);
//                 node.prev = this.top;
//                 this.top = node;
//                 this.size += 1;
//         }

//         pop() {
//                 const popItem = this.top;
//                 this.top = this.top?.prev ?? null;
//                 this.size -= 1;
//                 return popItem?.item;
//         }
// }
