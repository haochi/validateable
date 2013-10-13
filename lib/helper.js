var util = require('util');

exports.inherits = function(klass, constructor){
  var newClass = function(){
    klass.apply(this, arguments);
    if(constructor !== undefined){
      constructor.apply(this, arguments);
    }
  }
  util.inherits(newClass, klass);
  return newClass;
}
