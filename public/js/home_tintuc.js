angular.module("appTinTuc").controller('tintucCtrl', function($scope, $rootScope, $state, $sce, connect, $filter, toastr) {
  $scope.binhluans = [];
  $scope.urlAvatar = "/avatar.gif";
  var tt = this;
  if ($state.params && $state.params.id) {
    connect.get("/tintuc/get_by_id/" + $state.params.id, { xem: true }, function(tin) {
      if (tin && tin.ID) {
        $scope.tin = tin;
        $scope.tin.time = $filter('date')($scope.tin.THOI_GIAN, 'dd-MM-yyyy HH:mm:ss');
        $rootScope.danhMucActive = tin.ID_LOAI_TIN;
      }
    })
    connect.get("/binhluan/get_by_tin/" + $state.params.id, null, function(data) {
      if (data && angular.isArray(data)) {
        $scope.binhluans = data;
      }
    })
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
      console.log(data)
      if (data && data.ID) {
        toastr.success("Gửi bình luận thành công !");
        $scope.binhluans.unshift(data);
        tt.binhluan.noidung = null;
      } else {
        toastr.error("Gửi bình luận thất bại !");
      }
    })
  }
})
