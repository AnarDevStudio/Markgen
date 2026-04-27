import { readFile } from "fs/promises";
import { extname } from "path";
import chalk from "chalk";

export class FileLoader {

    async load(filePath: string): Promise<string> {
        this.assertMgFile(filePath);

        const content = await readFile(filePath, "utf-8");
        return content;
    }

    private assertMgFile(filePath: string) {
        const ext = extname(filePath);

        if (ext !== ".mg") {
            throw new Error(
                `This file is not accepted. ${chalk.red.bold(ext)}. Only .mg files are allowed.`
            );
        }
    }
}