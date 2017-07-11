angular.module("appTinTuc").controller('quanliCtrl', ["$state", "$rootScope", "$scope", "toastr", function($state, $rootScope, $scope, toastr) {
  
  $rootScope.toState = $state.current.name;

  $scope.goChiTiet = function() {
    $state.go("admin.ttchitiet", { id: $rootScope.user.id });
  }

  $scope.goDanhSachTT = function() {
    $state.go("admin.dstintuc")
  }

  $scope.backHome = function() {
    $state.go('home');
  }

  $scope.goDanhSachNhom = function() {
    $state.go("admin.dmdanhsach");
  }

  $scope.goDanhSachNhomCreate = function() {
    $state.go("admin.createnhom")
  }

  $scope.goTaiKhoan = function() {
    $state.go("admin.tk")
  }

  $scope.goDanhSachUser = function() {
    $state.go("admin.user");
  }

  $scope.goCreateUser = function() {
    $state.go("admin.createuser");
  }

  $scope.goCreateTT = function() {
    $state.go("admin.creattt");
  }
  
}])

