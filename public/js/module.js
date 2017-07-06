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
    .state('home',{
      url: '/trang-chu',
      templateUrl: 'views/home.html',
    })
});

app.run(function($rootScope, $state) {
   $state.go('home');
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

})
