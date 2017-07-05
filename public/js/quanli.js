angular.module("appTinTuc").controller('quanliCtrl', function($state, $rootScope, $scope) {
  console.log('vao');
  $scope.goChiTiet = function() {
    $state.go("admin.ttchitiet", {id: 123});
  }
})
angular.module("appTinTuc").controller('ttcnCtrl', function($state, $rootScope, $scope) {
  console.log('vao day');

})
angular.module("appTinTuc").controller('tkCtrl', function($state, $rootScope, $scope) {
  console.log('vao day');
  
})
