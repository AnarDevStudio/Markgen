export const Commands = {
  meta: {
    name: "mg",
    version: "0.1.0",
    description: "Markgen CLI"
  },

  help: `
mg <command> [file] [options]

Commands:
  run     Parse and execute a file
  build   Generate output file
  check   Validate syntax (no execution)
  init    Create a new .mg file

Options:
  --debug     Log every directive
  --out       Output file (for build)
  --watch     Re-run on file changes
  `.trim(),

  commands: {
    run: {
      description: "Parse and execute a file",
      args: {
        file: { type: "string", required: true },
        debug: { type: "boolean", default: false }
      }
    },

    build: {
      description: "Generate output file",
      args: {
        file: { type: "string", required: true },
        out: { type: "string", default: "output.txt" }
      }
    },

    check: {
      description: "Validate syntax without execution",
      args: {
        file: { type: "string", required: true }
      }
    },

    init: {
      description: "Create a new .mg file",
      args: {
        name: { type: "string", default: "main" }
      }
    }
  }
};