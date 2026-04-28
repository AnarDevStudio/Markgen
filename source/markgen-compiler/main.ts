import { writeFile } from "fs/promises";
import { MarkgenParser } from "./perser.js";

export class MarkgenCompiler {
    run(content: string) {
        const parser = new MarkgenParser(content);
        parser.parse();
    }

    async build(content: string, outPath: string) {
        this.run(content);
        await writeFile(outPath, content, "utf-8");
    }
}