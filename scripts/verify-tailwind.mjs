#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function findCssFiles(dir, files = []) {
  if (!statSync(dir, { throwIfNoEntry: false })) return files;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) findCssFiles(full, files);
    else if (entry.endsWith(".css")) files.push(full);
  }

  return files;
}

function readGlobalsCss() {
  const path = join(ROOT, "app", "globals.css");
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

function assertTailwindSetup() {
  const globals = readGlobalsCss();
  const errors = [];

  if (!globals.includes('@import "tailwindcss"')) {
    errors.push('app/globals.css is missing `@import "tailwindcss"`');
  }

  try {
    readFileSync(join(ROOT, "postcss.config.mjs"), "utf8");
  } catch {
    errors.push("postcss.config.mjs is missing");
  }

  if (errors.length > 0) {
    console.error("Tailwind setup check failed:\n");
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
}

function assertUtilitiesInCss(css) {
  const checks = [
    { pattern: /\.flex\s*\{/, name: "flex utility" },
    { pattern: /\.text-gold\s*\{/, name: "text-gold utility" },
    { pattern: /\.bg-black\s*\{/, name: "bg-black utility" },
    { pattern: /@layer utilities/, name: "utilities layer" },
  ];

  const missing = checks.filter((check) => !check.pattern.test(css));
  if (missing.length === 0) return;

  console.error("Tailwind utilities are not present in compiled CSS:");
  for (const item of missing) console.error(`  - missing ${item.name}`);
  console.error(
    "\nFix: ensure app/globals.css uses `@import \"tailwindcss\" source(\"..\")` and `@source` paths for app/components.",
  );
  process.exit(1);
}

assertTailwindSetup();

console.log("Building to verify Tailwind output...");
execSync("npm run build", { stdio: "inherit", cwd: ROOT });

const cssFiles = findCssFiles(join(ROOT, ".next"));
const combinedCss = cssFiles.map((file) => readFileSync(file, "utf8")).join("\n");

assertUtilitiesInCss(combinedCss);
console.log("✓ Tailwind CSS is loading and generating utilities");
