angular.module("appTinTuc").controller('loginCtrl', function($scope, $rootScope, $uibModalInstance, $rootScope) {
  console.log('vao');
  $scope.urlLogin = "views/temp-login.html";

  $scope.exitModal = function() {
    $uibModalInstance.close();
  }
  $scope.login = function(user, pass) {
    $rootScope.user = {
      name: "MrH2V",
      id: 69,
      per: 1
    }
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("user", "MrH2v");
      localStorage.setItem("per", 1);
      localStorage.setItem("id", 69);
    }
    $scope.exitModal();
  }

  $scope.loginKey = function(e, u, p) {
    if (e.keyCode == 13 && u && p) {
      $scope.login(u, p);
    }
  }
})
