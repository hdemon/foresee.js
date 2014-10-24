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

  Foresee.preload = function(imageUrl) {
    return new Promise(function(resolve, reject) {
      var img = new Image;
      img.src = imageUrl;
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function() {
        reject(img);
      };
    });
  };

  Foresee.sequentially = function(imageUrlArray) {
    var i = 0,
        imgs = [],
        imageUrlArrayLength = imageUrlArray.length;

    return new Promise(function(resolve, reject) {
      var _preload = function() {

        this.preload(imageUrlArray[i]).then(function(img) {
          i += 1;
          imgs.push(img);

          if (imageUrlArrayLength <= i) {
            return resolve(imgs);
          }
          return _preload();
        });
      };

      _preload();
    });
  };

  Foresee.parallel = function() {
    var promises = [];

    for (var i = 0, l = imageUrlArray.length; i < l; i++) {
      promises.push(this.preload(imageUrlArray[i]));
    }

    return Promise.all(promises);
  };

  return Foresee;
}));
