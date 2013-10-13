var validateable = require('../lib/validateable');
var assert = require("assert");

describe('validateable#StringProperty', function(){
  var string = new validateable.StringProperty;
  describe('constructor', function(){
    it('should be empty', function(){
      assert.equal(string.get().length, 0);
      assert.equal(string.validate(), true);
    })
    it("should pass: alpha", function(){
      string.set("abc");
      string.isAlpha();
      assert.equal(string.validate(), true);
    })
    it("should fail: not alpha", function(){
      string.set("1");
      string.isAlpha();
      assert.equal(string.validate(), false);
    })
  })
})

