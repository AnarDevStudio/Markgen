import { readFileSync } from "fs";
import path from "path";

export function loadConfig() {
  const configPath = path.resolve(process.cwd(), "markgen.config.json");

  const raw = readFileSync(configPath, "utf-8");
  return JSON.parse(raw);
}