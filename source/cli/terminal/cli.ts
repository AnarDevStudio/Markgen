#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { Commands } from "./commands.js";
import { FileLoader } from "../../markgen-compiler/file-loader.js";
import { writeFile } from "fs/promises";
import { MarkgenParser } from "../../markgen-compiler/perser.js";
import { MarkgenCompiler } from "../../markgen-compiler/main.js";

export const mainCommand = defineCommand({
  meta: Commands.meta,

  subCommands: {
    run: defineCommand({
      meta: Commands.commands.run,
      args: {
        file: { type: "positional", required: true },
        debug: { type: "boolean", default: false }
      },
      async run({ args }) {
        const fileLoader = new FileLoader();
        const content = await fileLoader.load(args.file);
        const compiler = new MarkgenCompiler();
        compiler.run(content);
      }
    }),

    build: defineCommand({
      meta: Commands.commands.build,
      args: {
        file: { type: "positional", required: true },
        out: { type: "string", default: "output.md" }
      },
      async run({ args }) {
        const fileLoader = new FileLoader();
        const content = await fileLoader.load(args.file);
        const compiler = new MarkgenCompiler();
        await compiler.build(content, args.out);
        console.log(`Built ${args.file} -> ${args.out}`);
      }
    }),

    check: defineCommand({
      meta: Commands.commands.check,
      args: {
        file: { type: "positional", required: true }
      },
      async run({ args }) {
        const fileLoader = new FileLoader();
        const content = await fileLoader.load(args.file);
        const parser = new MarkgenParser(content);
        parser.parse();
        console.log(`${args.file} is valid`);
      }
    }),

    init: defineCommand({
      meta: Commands.commands.init,
      args: {
        name: { type: "positional", required: false, default: "main" }
      },
      async run({ args }) {
        const filename = `${args.name}.mg`;
        const template = `@task ""\n@role ""\n@use ()\n\n@step ""\n`;

        await writeFile(filename, template, "utf-8");
        

        console.log(`Created ${filename}`);
      }
    })
  }
});

export async function runCli() {
  await runMain(mainCommand);
}