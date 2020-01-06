app.service('CameraServ', function ($q) {

  document.addEventListener('deviceready', function () {

  }, false);

  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  function getPicture(src) {
    return $q(function (resolve, reject) {
      var options = setOptions(src);
      navigator.camera.getPicture(function cameraSuccess(imageUri) {
        resolve(imageUri);
      }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
        reject(error);
      }, options);
    });
  }

  this.getPhoto = function () {
    return getPicture(Camera.PictureSourceType.CAMERA);
  };

  this.getAlbum = function () {
    return getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
  };

});