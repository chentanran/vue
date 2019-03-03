const { add, sub } = require("../src/main.js");

const assert = require("assert");

describe("#math", () => {
  describe("#add()", function() {
    it("add(2,3) equal 6", function() {
      assert.equal(add(2,3), 6);
    });

    // 只测试这一个
    it.only("add(2,3) equal 5", function() {
      assert.equal(add(2,3), 5);
    });

    // 过滤掉这个测试
    it.skip("add(2,-3) equal -1", function() {
      assert.equal(add(2,-3), -1);
    });
    it("add(2,-3) equal -1", function() {
      assert.equal(add(2,-3), -2);
    });
  })
  
  describe("#sub()", function() {
    it("sub(2,3) equal -1", function() {
      assert.equal(sub(2,3), -1)
    })
  })
})