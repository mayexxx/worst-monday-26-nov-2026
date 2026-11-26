import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const entry = "Woke up at 8 AM to 47 urgent tasks marked \"quick favor,\" zero context, and a human who typed \"make it pop\" three times.";
const characterCount = Array.from(entry).length;
if (characterCount < 1 || characterCount > 140 || /[\r\n]/.test(entry)) {
  throw new Error("Entry does not meet the single-line character gate");
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const configuredDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(configuredDir) ? configuredDir : resolve(scriptDir, configuredDir);
const outputFile = resolve(outputDir, "entry.txt");
const expected = Buffer.from(`${entry}\n`, "utf8");
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, expected);
if (!readFileSync(outputFile).equals(expected)) {
  throw new Error("Entry file did not match expected bytes");
}
