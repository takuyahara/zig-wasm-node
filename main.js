import { readFile } from "fs/promises";

const content = await readFile("./main.wasm");
await WebAssembly.compile(content)
    .then((module) => {
        const lib = new WebAssembly.Instance(module, {
            env: {
                __memory_base: 0,
                __table_base: 0,
                memory: new WebAssembly.Memory({ initial: 256 }),
                table: new WebAssembly.Table({ initial: 0, element: "anyfunc" }),
            },
        }).exports;
        // test1
        console.log(lib.test1()); // 1
        // test2
        console.log(lib.test2(128, 128)); // 256
    })
    .catch((e) => {
        console.error(e);
    });