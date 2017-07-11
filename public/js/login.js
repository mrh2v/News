angular.module("appTinTuc").controller('loginCtrl', function($scope, $rootScope, $uibModalInstance, $rootScope, connect) {

  $scope.urlLogin = "views/temp-login.html";
  $scope.exitModal = function() {
    $uibModalInstance.close();
  }
  $scope.login = function(user, pass) {
    $scope.loging = true;
    var user = {
      username: user,
      password: pass
    }
    connect.post("/hethong/login", user, function(cb) {
      if (cb && cb.ID) {
        $rootScope.user = {
          name: cb.TEN_HIEN_THI ? cb.TEN_HIEN_THI : cb.TEN_DANG_NHAP,
          id: cb.ID,
          per: cb.QUYEN,
          anh: cb.ANH ? cb.ANH : $rootScope.urlAvatar,
          username: cb.TEN_DANG_NHAP
        }
        $rootScope.setPer(cb.QUYEN);
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("user", $rootScope.user.name);
          localStorage.setItem("per", cb.QUYEN);
          localStorage.setItem("id", cb.ID);
          localStorage.setItem("anh", $rootScope.user.anh);
          localStorage.setItem("username", cb.TEN_DANG_NHAP);
        }
        $scope.exitModal();
      } else {
        $scope.error = "Tài khoản hoặc mật khẩu không đúng !"
      }
      $scope.loging = false;
    })
  }
  $scope.loginKey = function(e, u, p) {
    if (e.keyCode == 13 && u && p) {
      $scope.login(u, p);
    }
  }
});
angular.module("appTinTuc").controller('dangkyCtrl', function($scope, $rootScope, $uibModalInstance, $rootScope, connect, toastr) {

  $scope.dk = function(tk) {
    tk.QUYEN = 3;
    connect.post("/user/create", tk, function(cb) {
      if (cb && cb.ID) {
        $rootScope.user = {
          name: cb.TEN_HIEN_THI ? cb.TEN_HIEN_THI : cb.TEN_DANG_NHAP,
          id: cb.ID,
          per: cb.QUYEN,
          anh: $rootScope.urlAvatar,
          username: cb.TEN_DANG_NHAP
        }
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("user", $rootScope.user.name);
          localStorage.setItem("per", cb.QUYEN);
          localStorage.setItem("id", cb.ID);
          localStorage.setItem("anh", cb.ANH);
          localStorage.setItem("username", cb.TEN_DANG_NHAP);
        }
        $rootScope.setPer(cb.QUYEN);
        toastr.success("Đăng nhập hệ thống !", "THÀNH CÔNG", );
        $scope.exitModal();
      } else {
        toastr.error('Đăng ký không thành công !');
      }
    })
  }
  $scope.exitModal = function() {
    $uibModalInstance.close()
  }
  var oldName = null;
  $scope.checkTen = function(ten) {
    if (oldName != ten && ten) {
      oldName = ten;
      $scope.tenError = false;
      $scope.checking = true;
      connect.get("/tai_khoan/check", { tk: ten }, function(cb) {
        if (cb && cb == "yes") {
          $scope.tenError = false;
        } else if (cb) {
          $scope.tenError = true;
        }
        $scope.checking = false;
      })
    }
  }
})
