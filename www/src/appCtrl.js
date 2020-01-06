app.controller('AppCtrl', function ($scope, $filter, $mdDialog, $rootScope, $mdToast, GeoService, CameraServ, Marker) {
  $scope.track = false;

  $scope.$on('/message', function (event, message) {
    $scope.errorMessage = $filter("date")(Date.now(), 'medium') + ': ' + message;
  });

  function getFromPos(attr) {
    let pos = GeoService.getPosition();
    if (pos) {
      return pos[attr];
    } else {
      return '---';
    }
  }

  $scope.updateTrack = function () {
    GeoService.setTracking($scope.track);
  };

  $scope.getLatitude = function () {
    return getFromPos('latitude');
  };

  $scope.getLongitude = function () {
    return getFromPos('longitude');
  };

  $scope.getTimestamp = function () {
    let pos = GeoService.getPosition();
    if (pos) {
      return pos.time;
    } else {
      return '---';
    }
  };

  $scope.postFoto = function () {
    CameraServ.getPhoto().then(function (img) {
      $scope.postComment(img);
    });
  };

  $scope.postFile = function () {
    CameraServ.getAlbum().then(function (img) {
      $scope.postComment(img);
    });
  };

  $scope.postComment = function (img) {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      templateUrl: 'templates/dlgComment.html',
      controller: function ($scope, $mdDialog) {
        $scope.closeDialog = function () {
          $scope.comment = "";
          $mdDialog.cancel();
        };

        $scope.send = function () {
          $mdDialog.hide($scope.comment);
        };
      }
    }).then(function (comment) {
      var position = GeoService.getPosition();

      if (position) {
        var m = new Marker();
        m.timestamp = position.timestamp;
        m.latitude = position.latitude;
        m.longitude = position.longitude;
        m.text = comment;
        m.img = img;

        m.$save(function () {
          $mdToast.show($mdToast.simple().textContent('Speichern erfolgreich'));
        }, error);
        $scope.comment = "";
        $scope.img = null;

      } else {
        $rootScope.$broadcast('/message', 'Keine Position vorhanden');
      }

      function error(response) {
        $rootScope.$broadcast('/message', "PostFehler: " + response.status + " " + response.data);
      }

    });

  };




});