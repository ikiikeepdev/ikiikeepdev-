const test = require("node:test");
const assert = require("node:assert/strict");
const { reconnectDelay } = require("../lib/reconnect.js");

test("reconnect delay grows exponentially", () => {
  assert.equal(reconnectDelay(0), 1000);
  assert.equal(reconnectDelay(1), 2000);
  assert.equal(reconnectDelay(2), 4000);
});

test("reconnect delay is capped", () => {
  assert.equal(reconnectDelay(8), 30000);
});

test("invalid attempts throw", () => {
  assert.throws(() => reconnectDelay(-1), RangeError);
  assert.throws(() => reconnectDelay(Number.NaN), RangeError);
});
