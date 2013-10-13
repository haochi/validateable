var validator = require('./validator.js');
var inherits = require('./helper.js').inherits;

function Validateable(){
  this.errors = [];
  this.validators = [];
  this.value = null;
}

// validate
Validateable.prototype.validate = function(){
  var self = this;
  var valid = true;
  this.validators.forEach(function(validator){
    var result = validator.validate(self.value);
    if(!result){
      valid = false;
      self.errors.push(validator);
    }
  });
  return valid;
}

// getter/setting
Validateable.prototype.set = function(value){
  this.value = value;
};

Validateable.prototype.get = function(){
  return this.value;
}

// validators
Validateable.prototype.isAlpha = function(){
  this.validators.push(new validator.AlphaValidator);
  return this;
}
Validateable.prototype.notEmpty = function(){
  this.validators.push(new validator.NotEmptyValidator());
  return this;
}
Validateable.prototype.hasLength = function(options){
  this.validators.push(new validator.LengthValidator(options));
  return this;
}
Validateable.prototype.between = function(options){
  this.validators.push(new validator.BetweenValidator(options));
  return this;
}

// property classes
exports.IntegerProperty = inherits(Validateable, function(){
  this.value = 0;
  this.validators.push(new validator.IntegerValidator);
});
exports.FloatProperty = inherits(Validateable, function(){
  this.value = 0;
  this.validators.push(new validator.NumberValidator);
});
exports.StringProperty = inherits(Validateable, function(){
  this.value = "";
  this.validators.push(new validator.StringValidator);
});
exports.BooleanValidator = inherits(Validateable, function(){
  this.value = false;
  this.validators.push(new validator.BooleanValidator);
});
