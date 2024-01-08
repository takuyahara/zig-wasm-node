import { readFile } from "fs/promises";

const content = await readFile("./main.wasm");
await WebAssembly.compile(content)
    .then((module) => {
        const { add } = new WebAssembly.Instance(module, {}).exports;
        console.log(add(5, 6)); // Outputs: 11
    })
    .catch((e) => {
        console.error(e);
    });