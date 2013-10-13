var helper = require('./helper.js');
var inherits = helper.inherits;
var extend = helper.extend;

function Validator(options){
  this.user_options = options;
}

Object.defineProperty(Validator.prototype, "options", {
  get: function(){
    return extend(this.user_options, this.default_options);
  },
});

Validator.create = function(validate, options){
  var klass = inherits(Validator, function(){
    this.default_options = options || {};
  });
  klass.prototype.validate = validate;
  return klass;
}

var primitives = ['Number', 'String', 'Boolean'];

var simpleValidators = {
  Integer: {
    validate: function(value){
      return typeof value === 'number' && parseInt(value) === value;
    },
  },
  NotNull: {
    validate: function(value){
      return value != null;
    },
  },
  Alpha: {
    validate: function(value){
      return /^[a-z]*$/i.test(value);
    },
  },
  Length: {
    validate: function(value){
      var length = value.length;
      var result = true;
      if(this.options && this.options.min){
        result = this.options.min <= length;
      }
      if(result && this.options && this.options.max){
        result = length <= this.options.max;
      }
      return result;
    },
  },
  NotEmpty: {
    validate: function(value){
      return value && value.length && value.length > 0;
    }
  },
  Between: {
    validate: function(value){
      var result = true;
      if(this.options && this.options.before){
        result = this.options.before <= value;
      }
      if(result && this.options.options.after){
        result = value <= this.options.after;
      }
      return result;
    },
  },
  Membership: {
    options: { list: [] },
    validate: function(value){
      return !!~this.options.list.indexOf(value);
    },
  },
  Regex: {
    validate: function(value){
      return this.options.pattern.test(value);
    }
  }
};

primitives.forEach(function(type){
  exports[type+'Validator'] = Validator.create(function(value){
    return typeof value === type.toLowerCase();
  });
});

Object.keys(simpleValidators).forEach(function(name){
  var validator = simpleValidators[name];
  exports[name+'Validator'] = Validator.create(validator.validate, validator.options);
});
