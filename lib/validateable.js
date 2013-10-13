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
var AlphaValidator = validator.create(function(value){
  return /^[a-z]*$/i.test(value);
});
var LengthValidator = validator.create(function(value){
  var length = value.length;
  return this.options.min <= length && length <= this.options.max;
});
var BetweenValidator = validator.create(function(value){
  var length = value.length;
  return this.options.before <= length && length <= this.options.after;
});

Validateable.prototype.isAlpha = function(){
  this.validators.push(new AlphaValidator);
  return this;
}
Validateable.prototype.notEmpty = function(){
  this.validators.push(new validator.NotEmptyValidator());
  return this;
}
Validateable.prototype.hasLength = function(options){
  this.validators.push(new LengthValidator(options));
  return this;
}
Validateable.prototype.between = function(options){
  this.validators.push(new BetweenValidator(options));
  return this;
}

// property classes
var IntegerProperty = inherits(Validateable, function(){
  this.value = 0;
  this.validators.push(new validator.IntegerValidator);
});
var FloatProperty = inherits(Validateable, function(){
  this.value = 0;
  this.validators.push(new validator.NumberValidator);
});
var StringProperty = inherits(Validateable, function(){
  this.value = "";
  this.validators.push(new validator.StringValidator);
});
var BooleanValidator = inherits(Validateable, function(){
  this.value = false;
  this.validators.push(new validator.BooleanValidator);
});
