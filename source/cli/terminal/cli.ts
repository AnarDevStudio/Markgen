#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import { MarkgenParser } from '../../markgen-compiler/perser.js';

const main = defineCommand({
  meta: {
    name: 'mg',
    version: '0.1.0',
    description: 'Markgen CLI'
  },
  args: {
    command: { type: 'positional', required: false }
  },
  run() {
    console.log(`
mg <command> [file] [options]

Commands:
  run     Dosyayı parse edip çalıştırır
  build   Çıktıyı dosyaya yazar
  check   Syntax kontrolü yapar (çalıştırmadan)
  init    Yeni bir .mg dosyası oluşturur

Options:
  --debug     Her direktifi loglar
  --out       Çıktı dosyası (build için)
  --watch     Dosya değişince otomatik çalıştır
    `.trim());
  },
  subCommands: {
    run: defineCommand({
      meta: { description: 'Dosyayı parse edip çalıştırır' },
      args: {
        file: { type: 'positional', required: true },
        debug: { type: 'boolean', default: false }
      },
      async run({ args }) {
        const fs = await import('fs/promises');
        const content = await fs.readFile(args.file, 'utf-8');
        const parser = new MarkgenParser(content);
        parser.parse();
      }
    }),

    build: defineCommand({
      meta: { description: 'Çıktıyı dosyaya yazar' },
      args: {
        file: { type: 'positional', required: true },
        out: { type: 'string', default: 'output.txt' }
      },
      async run({ args }) {
        console.log(`Building ${args.file} → ${args.out}`);
      }
    }),

    check: defineCommand({
      meta: { description: 'Syntax kontrolü yapar' },
      args: {
        file: { type: 'positional', required: true }
      },
      async run({ args }) {
        console.log(`Checking ${args.file}...`);
      }
    }),

    init: defineCommand({
      meta: { description: 'Yeni bir .mg dosyası oluşturur' },
      args: {
        name: { type: 'positional', required: false, default: 'main' }
      },
      async run({ args }) {
        const fs = await import('fs/promises');
        const filename = `${args.name}.mg`;
        const template = `@task ""\n@role ""\n@use ()\n\n@step ""\n`;
        await fs.writeFile(filename, template, 'utf-8');
        console.log(`Created ${filename}`);
      }
    })
  }
});

runMain(main);