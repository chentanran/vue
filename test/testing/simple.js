const { add, sub } = require("../src/main.js");
const assert = require("assert");

assert.strictEqual(add(1,1), 23, "结果不符合");

assert.equal(add(1,1), 23, "信息失败");