#!/usr/bin/env node
import { runCli } from "./cli/terminal/cli.js";
import { withErrorHandling } from "./markgen-compiler/error-logger/error-handler.js";

await withErrorHandling(async () => {
    await runCli();
});