app.service('CordovaServ', function ($rootScope) {
  let deviceReady = false;

  document.addEventListener('deviceready', function () {
    deviceReady = true;

    $rootScope.$broadcast('deviceready', true);
  }, false);

  this.isDeviceReady = function () {
    return deviceReady;
  };
});