const { add, sub } = require("../src/main.js");

// char.js测试
const { should, expect, assert } = require('chai');

// should 要先执行以下
// should();

// add(2,3).should.be.equal(5);

// 或者直接用 expect
expect(add(2,3)).to.equal(5);
