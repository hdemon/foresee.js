(function(global, factory) {
  var built = factory();

  if (typeof module === 'object' && module) {
      module.exports = built;
  }

  if (typeof define === 'function' && define.amd) {
      define(factory);
  }

  global.Foresee || (global.Foresee = built);
}(typeof global !== 'undefined' ? global : this, function() {
  var Foresee = {};

  var preload = function(imageUrl) {
    return new Promise(function(resolve, reject) {
      var img = new Image;
      img.src = imageUrl;
      img.onload = function() {
        resolve();
      };
      img.onerror = function() {
        reject();
      };
    });
  };

  Foresee.preloadSequentially = function(imageUrlArray) {
    var i = 0;

    var _preload = function(imageUrl) {
      preload(imageUrlArray[i]).then(function() {
        i += 1;
        return _preload(imageUrl);
      });
    };

    _preload();
  };

  Foresee.preloadParallel = function() {
    var promises = [];

    for (var i = 0, l = imageUrlArray.length; i < l; i++) {
      promises.push(preload(imageUrlArray[i]));
    }

    return Promise.all(promises);
  };

  return Foresee;
}));
