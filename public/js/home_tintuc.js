angular.module("appTinTuc").controller('tintucCtrl', function($scope, $rootScope, $state, $sce, connect, $filter, toastr) {
  $scope.binhluans = [];
  $scope.urlAvatar = "/avatar.gif";
  $rootScope.toState = $state.current.name;
  var tt = this;
  var slCall = 0;
  $scope.callBinhLuan = function() {
    var ob = {
      offset: 5 * slCall,
      limit: 5
    }
    slCall ++;
    connect.get("/binhluan/get_by_tin/" + $state.params.id, ob, function(data) {
      if (data && data.data && angular.isArray(data.data)) {
        $scope.binhluans = $scope.binhluans.concat(data.data);
        $scope.slBinhLuan = data.length;
      }
    })
  }
  if ($state.params && $state.params.id) {
    connect.get("/tintuc/get_by_id/" + $state.params.id, { xem: true }, function(tin) {
      if (tin && tin.ID) {
        $scope.tin = tin;
        $scope.tin.time = $filter('date')($scope.tin.THOI_GIAN, 'dd-MM-yyyy HH:mm:ss');
        $rootScope.danhMucActive = tin.ID_LOAI_TIN;
      }
    })
    $scope.callBinhLuan();
  }
  $scope.sendBinhLuan = function(item) {
    var ob = {
      ID_TIN: $scope.tin.ID,
      NOI_DUNG: item.noidung,
      NGUOI_BINH_LUAN: item.name
    }
    if ($rootScope.user) {
      ob.ID_USER = $rootScope.user.id;
      ob.NGUOI_BINH_LUAN = $rootScope.user.name == "ROOT" ? $rootScope.user.username : $rootScope.user.name;
    }
    connect.post("/binhluan/create", ob, function(data) {
      if (data && data.ID) {
        toastr.success("Gửi bình luận thành công !");
        if ($rootScope.user) {
          data.USER.ANH = $rootScope.user.anh;
        }
        $scope.binhluans.unshift(data);
        $scope.slBinhLuan ++;
        tt.binhluan.noidung = null;
      } else {
        toastr.error("Gửi bình luận thất bại !");
      }
    })
  }
})
