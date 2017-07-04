var app = angular.module("appTinTuc", ['ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $locationProvider) {
  var adminState = {
    name: 'admin',
    url: '/quan-li',
    templateUrl: 'views/quan-li.html',
    controller: "quanliCtrl"
  }

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  $stateProvider.state(adminState);
});


app.run(function($rootScope, $state) {

  $state.go('admin');

})
