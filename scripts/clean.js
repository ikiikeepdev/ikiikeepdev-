const fs = require("node:fs");
const path = require("node:path");
const target = path.join(__dirname, "..", "lib");
fs.rmSync(target, { recursive: true, force: true });
console.log("Removed lib/");
