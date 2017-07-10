angular.module("appTinTuc").controller("userDsCtrl", function($scope, $rootScope, $state, toastr, connect) {
  $rootScope.toState = $state.current.name;
  function layDuLieu(offset, limit) {
    var ob = {
      offset: offset,
      limit: limit
    }
    connect.get("/user/get_offset", ob, function(data) {
      if (data && data.data) {
        renderData(data.data, offset);
        $scope.soTrang = Math.ceil(data.length / 5);
      }
    })
  }

  function renderData(data, dem) {
    for (var i in data) {
      data[i].stt = Number(dem) + Number(i) + Number(1);
      if (data[i].QUYEN === 1) {
        data[i].chuc_vu = "Admin";
      } else if (data[i].QUYEN === 2) {
        data[i].chuc_vu = "Cộng tác viên";
      } else if (data[i].QUYEN === 3) {
        data[i].chuc_vu = "Bạn đọc";
      } else if (data[i].QUYEN === 99) {
        data[i].chuc_vu = "Root";
      }
    }
    $scope.dataDs = data;
  }

  $scope.renderTrang = function() {
    var trangs = [];
    for (var i = 0; i < $scope.soTrang; i++) {
      trangs.push(i + 1);
    }
    return trangs;
  }
  $scope.trangSelect = 1;
  $scope.selectTrang = function(so) {
    if ($scope.trangSelect !== so) {
      layDuLieu((so - 1) * 5, 5);
      $scope.trangSelect = so;
    }
  }
  $scope.editUser = function(data) {
    $state.go("admin.updateuser", { id: data.ID });
  }

  $scope.xoaUser = function(data) {
    connect.modal("XÓA THÔNG TIN NGƯỜI DÙNG", "Bạn có muốn xóa người dùng " + data.HO_TEN + "?", null, function(res) {
      if (res) {
        connect.delete("/user/delete", { id: data.ID }, function(cb) {
          if (cb && cb.ID) {
            toastr.success('Thao tác xóa thành công !');
            $state.reload();
          } else {
            toastr.error('Thao tác xóa thất bại !');
          }
        })
      }
    })
  }
  layDuLieu(0, 5);
})

angular.module("appTinTuc").controller("userCreateCtrl", function($scope, $rootScope, $state, toastr, connect, $timeout) {
  $scope.tk = {
    GIOI_TINH: "1",
    QUYEN: "3"
  }
  $rootScope.toState = $state.current.name;
  $scope.upload = function(file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function(data) {
        $timeout(function() {
          $scope.$apply(function() {
            console.log(data);
            $scope.avatar = data.target.result;
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }

  if ($state.params && $state.params.id) {
    $scope.update = true;
    connect.get("/user/get_by_id/" + $state.params.id, null, function(data) {
      if (data && data.ID) {
        $scope.tk = data;
        $scope.tk.mat_khau = angular.copy($scope.tk.MAT_KHAU);
        $scope.tk.QUYEN = String($scope.tk.QUYEN);
        $scope.tk.GIOI_TINH = String($scope.tk.GIOI_TINH);
        $scope.avatar = $scope.tk.ANH;
      }
    })
  }

  $scope.themtk = function(tk) {
    tk.ANH = $scope.avatar;
    connect.post("user/create", tk, function(cb) {
      if (cb && cb.ID) {
        toastr.success('Thêm người dùng thành công !');
        $scope.tk = {
          GIOI_TINH: "1",
        }
        $scope.avatar = null;
      } else {
        toastr.error('Thêm người dùng thất bại !');
      }
    })
  }
  $scope.suatk = function(tk) {
    tk.ANH = $scope.avatar;
    connect.post("user/update", tk, function(cb) {
      if (cb && cb.ID) {
        toastr.success('Cập nhật thông tin thành công !');
        $state.reload();
      } else {
        toastr.error('Cập nhật thông tin thất bại !');
      }
    })
  }
})
angular.module("appTinTuc").controller('ttcnCtrl', function($timeout, $state, $rootScope, $scope, connect, toastr, $filter, $interval) {
  $rootScope.toState = $state.current.name;
  if ($rootScope.user && $rootScope.user.id) {
    connect.get("/user/get_by_id/" + $rootScope.user.id, null, function(res) {
      if (res && res.ID) {
        renderData(res);
      } else {
        toastr.error('Không tìm thấy dữ liệu cá nhân ngươi dùng!');
      }
    })
  }
  $interval(function() {
    $scope.time = $filter('date')(new Date(), "dd-MM-yyyy HH:mm:ss")
  }, 1000);

  function renderData(data) {
    if (data.QUYEN === 1) {
      data.chuc_vu = "Admin";
    } else if (data.QUYEN === 2) {
      data.chuc_vu = "Cộng tác viên";
    } else if (data.QUYEN === 3) {
      data.chuc_vu = "Bạn đọc";
    } else if (data.QUYEN === 99) {
      data.chuc_vu = "Root";
    }
    data.tg = $filter('date')(data.THOI_GIAN_CAP_NHAT, 'dd-MM-yyyy HH:mm:ss')
    data.GIOI_TINH = String(data.GIOI_TINH)
    $scope.tk = data;
  }
  $scope.edit = function(tk) {
    $scope.backup = angular.copy(tk);
    $scope.editing = true;
  }
  $scope.cancelEdit = function() {
    $scope.editing = false;
    $scope.tk = angular.copy($scope.backup);
  }
  $scope.upload = function(file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function(data) {
        $timeout(function() {
          $scope.$apply(function() {
            $scope.tk.ANH = data.target.result;
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }
  $scope.luutk = function(tk) {
    connect.post("user/update", tk, function(cb) {
      if (cb && cb.ID) {
        toastr.success('Cập nhật thông tin thành công !');
        $state.reload();
      } else {
        toastr.error('Cập nhật thông tin thất bại !');
      }
    })
  }
})

angular.module("appTinTuc").controller('userTkCtrl', function($timeout, $state, $rootScope, $scope, connect, toastr, $filter, $interval) {
  var user = this;
  $rootScope.toState = $state.current.name;
  if ($rootScope.user) {
    $scope.tk = { TEN_DANG_NHAP: $rootScope.user.username };
  }

  $scope.luu = function(tk) {
    if (!user.formTK.$invalid && tk.matkhaumoi == tk.matkhaumoi1) {
      var ob = {
        username: tk.TEN_DANG_NHAP,
        password: tk.matkhau,
        newpass: tk.matkhaumoi
      }
      connect.post("/hethong/change_password", ob, function(res) {
        if (res && res.ID) {
          toastr.success('Thay đổi mật khẩu thành công !');
          $scope.tk = { TEN_DANG_NHAP: ob.username };
        } else if (res) {
          toastr.error(res);
        } else {
          toastr.error("Không có kết nối máy chủ !");
        }
      })
    }
  }
})
