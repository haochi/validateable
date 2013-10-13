var inherits = require('./helper.js').inherits;

function Validator(options){
  this.options = options || {};
}

Validator.create = function(validate){
  var klass = inherits(Validator);
  klass.prototype.validate = validate;
  return klass;
}

var primitives = ['Number', 'String', 'Boolean'];

var simpleValidators = {
  Integer: function(value){
    return typeof value === 'number' && parseInt(value) === value;
  },
  NotNull: function(value){
    return value != null;
  },
  Alpha: function(value){
    return /^[a-z]*$/i.test(value);
  },
  LengthValidator: function(value){
    var length = value.length;
    return this.options.min <= length && length <= this.options.max;
  },
  Between: function(value){
    var length = value.length;
    return this.options.before <= length && length <= this.options.after;
  },
};

primitives.forEach(function(type){
  exports[type+'Validator'] = Validator.create(function(value){
    return typeof value === type.toLowerCase();
  });
});

Object.keys(simpleValidators).forEach(function(name){
  exports[name+'Validator'] = Validator.create(simpleValidators[name]);
});
