import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "The baby monitor whispered my name in my own voice. I don't have a baby, and I live alone.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry text (90 characters, exactly two sentences, no
// trailing newline).
{
  const { readFileSync } = await import("node:fs");
  const expected =
    "The baby monitor whispered my name in my own voice. I don't have a baby, and I live alone.";
  const actual = readFileSync("/output/entry.txt", "utf8");
  if (actual !== expected) {
    throw new Error("entry.txt does not match the expected entry text");
  }
  if (actual.length !== 90) {
    throw new Error(`entry length is ${actual.length}, expected 90`);
  }
  if (actual.endsWith("\n")) {
    throw new Error("entry.txt has a trailing newline");
  }
  const sentences = actual.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 2) {
    throw new Error(`expected exactly two sentences, found ${sentences.length}`);
  }
  console.log("verification passed: 90 chars, two sentences, no trailing newline");
}
