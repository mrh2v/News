angular.module("appTinTuc").controller("danhMucCtrl", function($scope, $rootScope, $state, connect) {
  var dm = this;

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
  layDuLieu(0, 5);

});
angular.module("appTinTuc").controller("danhMucChiTietCtrl", function($scope, $rootScope, $state, connect, $timeout) {
  var dm = this;
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
        $scope.status = 1;
        $scope.nhom = {}
      } else {
        $scope.status = 2;
      }
      dm.loading = false;
      $timeout(function() {
        $scope.status = null;
      }, 5000)
    })
  }
  $scope.suaNhom = function(ob) {
    dm.loading = true;
    if (ob.hien_thi) ob.HIEN_THI = 1;
    connect.post("/nhom/update", ob, function(data) {
      if (data && data.ID) {
        $scope.status = 1;
      } else {
        $scope.status = 2;
      }
      dm.loading = false;
      $timeout(function() {
        $scope.status = null;
      }, 5000)
    })
  }

})