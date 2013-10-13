var inherits = require('./helper.js').inherits;

function Validator(options){
  this.options = options || {};
}

Validateable.create = function(validate){
  var klass = inherits(Validate);
  klass.prototype.validate = validate;
  return klass;
}

var primitives = ['Number', 'String', 'Boolean'];

var simpleValidators = {
  Integer: function(value){
    return typeof value === 'number' && parseInt(value) === value;
  };
};

primitives.forEach(function(type){
  exports[type+'Validator'] = Validateable.create(function(value){
    return typeof value === type.toLowerCase();
  });
});

Object.keys(simpleValidators).forEach(function(name){
  exports[name] = Validateable.create(simpleValidators[name]);
});
