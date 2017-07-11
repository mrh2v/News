angular.module("appTinTuc").controller("danhMucCtrl", function($scope, $rootScope, $state, connect, toastr) {
  if (!$rootScope.user) return $state.go("home");
  var dm = this;
  $rootScope.toState = $state.current.name;

  function layDuLieu(offset, limit) {
    var ob = {
      offset: offset,
      limit: limit
    }
    connect.get("/nhom/get_offset", ob, function(data) {
      if (data && data.data) {
        renderData(data.data, offset);
        $scope.soTrang = Math.ceil(data.length / 5);
      }
    })
  }

  function renderData(data, dem) {
    for (var i in data) {
      data[i].stt = Number(dem) + Number(i) + Number(1);
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
  $scope.editNhom = function(data) {
    $state.go("admin.updatenhom", { id: data.ID });
  }

  $scope.xoaNhom = function(data) {
    connect.modal("XÓA DANH MỤC TIN TỨC", "Bạn có muốn xóa danh mục " + data.TEN_NHOM + "?", null, function(res) {
      if (res) {
        connect.delete("/nhom/delete", { id: data.ID }, function(cb) {
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

});
angular.module("appTinTuc").controller("danhMucChiTietCtrl", function($scope, $rootScope, $state, connect, $timeout, toastr) {
  var dm = this;
  $rootScope.toState = $state.current.name;
  if ($state.params.id) {
    //update
    dm.update = true;
    connect.get("/nhom/get_by_id/" + $state.params.id, null, function(data) {
      $scope.nhom = data;
      $scope.nhom.hien_thi = $scope.nhom.HIEN_THI == 1 ? true : false;
    })
  } else {
    //them mói
    dm.update = false;
  }

  $scope.themNhom = function(ob) {
    dm.loading = true;
    if (ob.hien_thi) ob.HIEN_THI = 1;
    connect.post("/nhom/create", ob, function(data) {
      if (data && data.ID) {
        $scope.nhom = {}
        toastr.success('Thao tác thêm mới thành công !');
      } else {
        toastr.error('Thao tác thêm mới thất bại !');
      }
      dm.loading = false;
    })
  }
  $scope.suaNhom = function(ob) {
    dm.loading = true;
    if (ob.hien_thi) {
      ob.HIEN_THI = 1;
    } else {
      ob.HIEN_THI = 0;
    }
    connect.post("/nhom/update", ob, function(data) {
      if (data && data.ID) {
        toastr.success('Thao tác cập nhật thành công !');
      } else {
        toastr.error('Thao tác cập nhật thất bại !');
      }
      dm.loading = false;
    })
  }

})
