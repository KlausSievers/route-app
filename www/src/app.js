var app = angular.module("Map100hApp", ['ngMaterial', 'ngResource']);

app.factory('Marker', function($resource){
  return $resource('https://www.vfl-grafenwald-fussball.de:8090/marker');
});

//TEST KOMMENTAR

app.config(function ($mdIconProvider) {
  $mdIconProvider
    .icon('camera', 'img/icons/ic_camera_alt_black_24px.svg')
    .icon('comment', 'img/icons/ic_comment_black_24px.svg')
    .icon('gpsOn', 'img/icons/ic_gps_fixed_black_24px.svg')
    .icon('gpsOff', 'img/icons/ic_gps_off_black_24px.svg')
    .icon('locationOn', 'img/icons/ic_location_on_black_24px.svg')
    .icon('locationOff', 'img/icons/ic_location_off_black_24px.svg')
    .icon('photoAlbum', 'img/icons/photo_album-24px.svg');
});