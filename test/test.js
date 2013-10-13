var validateable = require('../lib/validateable');
var assert = require("assert");

describe('validateable#StringProperty', function(){

  describe('constructor', function(){
    it('should be empty', function(){
      var string = new validateable.StringProperty;
      assert.equal(string.get().length, 0);
      assert.equal(string.validate(), true);
    })
  })

  describe("isAlpha", function(){
    it("should validate", function(){
      var string = new validateable.StringProperty;
      string.set("abc");
      string.isAlpha();
      assert.equal(string.validate(), true);
    })
    it("should not validate", function(){
      var string = new validateable.StringProperty;
      string.set("1");
      string.isAlpha();
      assert.equal(string.validate(), false);
    })
  })

  describe("isIn", function(){
    it("should validate because value is in list", function(){
      var string = new validateable.StringProperty;
      string.isIn({ list: ["1", "2"] });
      string.set("1");
      assert.equal(string.validate(), true);
    })
    it("should validate because value lowered case version is in list and validator is case insensity", function(){
      var string = new validateable.StringProperty;
      string.isIn({ list: ["a", "2"] });
      string.set("A");
      assert.equal(string.validate(), false);
    })
  });

  describe("matches", function(){
    it("should validate because it matches", function(){
      var string = new validateable.StringProperty;
      string.matches({ pattern: /hello/ });
      string.set("hello");
      assert.equal(string.validate(), true);
    })
    it("should not validate because it does not match", function(){
      var string = new validateable.StringProperty;
      string.matches({ pattern: /ho/ });
      string.set("oh");
      assert.equal(string.validate(), false);
    })
  });

  describe("notEmpty", function(){
    it("should validate", function(){
      var string = new validateable.StringProperty;
      string.notEmpty();
      string.set("hello");
      assert.equal(string.validate(), true);
    })
    it("should not validate", function(){
      var string = new validateable.StringProperty;
      string.notEmpty();
      assert.equal(string.validate(), false);
    })
  });

  describe("hasLength", function(){
    it("should validate => min: 2 for hello", function(){
      var string = new validateable.StringProperty;
      string.hasLength({min: 2});
      string.set("hello");
      assert.equal(string.validate(), true);
    })
    it("should validate => max: 10 for hello", function(){
      var string = new validateable.StringProperty;
      string.hasLength({max: 10});
      string.set("hello");
      assert.equal(string.validate(), true);
    })
    it("should validate => min: 2, max: 10 for hello", function(){
      var string = new validateable.StringProperty;
      string.hasLength({min: 2, max: 10});
      string.set("hello");
      assert.equal(string.validate(), true);
    })
    it("should not validate => min: 100", function(){
      var string = new validateable.StringProperty;
      string.hasLength({min: 100});
      string.set("hello");
      assert.equal(string.validate(), false);
    })
  });
})

