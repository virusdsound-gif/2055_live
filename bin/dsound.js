#!/usr/bin/env node
/**
 * Thin wrapper. No commander. No fake ESS wallet.
 * Real work: python cli/main.py
 */
const { spawnSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const result = spawnSync("python3", [path.join(root, "cli", "main.py"), ...args], {
  cwd: root,
  stdio: "inherit",
});
process.exit(result.status === null ? 1 : result.status);
