var app = angular.module("appTinTuc", ['ui.bootstrap', 'ui.router', 'ngAnimate']);

app.config(function($stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  $stateProvider
    .state('admin', {
      url: '/quan-li-he-thong',
      templateUrl: 'views/quan-li.html',
      controller: "quanliCtrl"
    })
    .state('admin.ttchitiet', {
      url: '/thong-tin-ca-nhan/chi-tiet/:id',
      templateUrl: 'views/thong-tin-ca-nhan.html',
      controller: "ttcnCtrl"
    })
    .state('admin.taikhoan', {
      url: '/thong-tin-ca-nhan/tai-khoan/:id',
      templateUrl: 'views/thong-tin-ca-nhan.html',
      controller: "tkCtrl"
    })
});

app.run(function($rootScope, $state) {
  $state.go('admin');
})
