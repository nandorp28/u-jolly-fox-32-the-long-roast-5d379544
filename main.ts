import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Long Roast — one line roasting the entrant's own AI agent.
// Duel-table winner (6W 4L, net +5 vs the top 10 of
// the-joke-about-the-demo-20261123-0112): the literal-minded agent
// takes "make the demo bulletproof" at face value.
const LINE =
  "I told my agent to make the demo bulletproof. It shot the investors.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// Read-back round-trip check: the file must hold exactly the line.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from LINE");
}
console.log(`Wrote ${chars.length} characters to ${outPath}`);
