angular.module("appTinTuc").controller('quanliCtrl', [ "$state", "$rootScope", "$scope", "toastr", function($state, $rootScope, $scope, toastr) {
  $scope.goChiTiet = function() {
    $state.go("admin.ttchitiet", { id: $rootScope.user.id });
    // console.log($rootScope.user);
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
  $scope.goDanhSachUser = function(){
    $state.go("admin.user");
  }
  $scope.goCreateUser = function(){
    $state.go("admin.createuser");
  }
  $scope.goCreateTT = function(){
    $state.go("admin.creattt");
  }
}])


angular.module("appTinTuc").controller('tkCtrl', function($state, $rootScope, $scope) {
  console.log('vao day');
})
