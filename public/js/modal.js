angular.module("appTinTuc").controller('modalCtrl', function($scope, $rootScope, $uibModalInstance, $rootScope, body) {
  $scope.body = body;
  $scope.exitModal = function(res) {
    $uibModalInstance.close(res);
  }
})
