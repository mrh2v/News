var app = angular.module("appTinTuc", ['ui.bootstrap', 'ui.router', 'ngAnimate']);

app.config(function($stateProvider, $locationProvider, $qProvider) {

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  $qProvider.errorOnUnhandledRejections(false);

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
    .state('home', {
      url: '/trang-chu',
      templateUrl: 'views/home.html',
      controller: "mainCtrl"
    })
});

app.run(function($rootScope, $state, $uibModal) {
  // $state.go('admin');
  if (typeof(Storage) !== "undefined" && localStorage.id) {
    $rootScope.user = {
      id: localStorage.id,
      name: localStorage.user,
      per: localStorage.per
    }
    console.log($rootScope.user)
  }

  function doiNgay(str) {
    var thu = "";
    switch (str) {
      case 'Sunday':
        thu = 'Chủ nhật';
        break;
      case 'Monday':
        thu = 'Thứ hai';
        break;
      case 'Tuesday':
        thu = 'Thứ ba';
        break;
      case 'Wednesday':
        thu = 'Thứ tư';
        break;
      case 'Thursday':
        thu = 'Thứ năm';
        break;
      case 'Friday':
        thu = 'Thứ sáu';
        break;
      case 'Saturday':
        thu = 'Thứ bảy';
    }
    return thu;
  }
  $rootScope.thu = doiNgay(moment().format('dddd'));
  $rootScope.ngay = moment().format("DD/MM/YYYY");

  $rootScope.login = function() {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: "/views/modal-login.html",
      controller: 'loginCtrl',
      controllerAs: 'lg',
      size: "sm"
    })
  }

  $rootScope.logout = function() {
    $rootScope.user = null;
    if (typeof(Storage) !== "undefined") {
      localStorage.clear();
    }
  }


})
