angular.module("appTinTuc").controller('loginCtrl', function($scope, $rootScope, $uibModalInstance, $rootScope, connect) {

  $scope.urlLogin = "views/temp-login.html";
  $scope.exitModal = function() {
    $uibModalInstance.close();
  }
  $scope.login = function(user, pass) {
    var user = {
      username: user,
      password: pass
    }
    connect.post("/hethong/login", user, function(cb) {
      if (cb && cb.ID) {
        $rootScope.user = {
          name: cb.TEN_HIEN_THI ? cb.TEN_HIEN_THI : cb.TEN_DANG_NHAP ,
          id: cb.ID,
          per: cb.QUYEN,
          anh: cb.ANH,
          username: cb.TEN_DANG_NHAP
        }
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("user",  $rootScope.user.name);
          localStorage.setItem("per", cb.QUYEN);
          localStorage.setItem("id", cb.ID);
          localStorage.setItem("anh", cb.ANH);
          localStorage.setItem("username", cb.TEN_DANG_NHAP);
        }
        $scope.exitModal();
      }
    })
  }
  $scope.loginKey = function(e, u, p) {
    if (e.keyCode == 13 && u && p) {
      $scope.login(u, p);
    }
  }
});
