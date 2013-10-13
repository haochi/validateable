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

exports.extend = function(){
  var copy = {};
  var i = 0, l = arguments.length;
  while(i<l){
    var obj = arguments[i];
    if(obj){
      Object.keys(obj).forEach(function(key){
        if(!copy.hasOwnProperty(key)){
          copy[key] = obj[key];
        }
      });
    }
    i++;
  }
  return copy;
}
