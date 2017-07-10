angular.module("appTinTuc").controller('tinDanhMucCtrl', function($scope, $rootScope, $state, $sce, connect, $filter, toastr) {
  $rootScope.toState = $state.current.name;

  if ($state.params && $state.params.id) {
    $rootScope.danhMucActive = $state.params.id;
    connect.get("/tintuc/get_new", { loaitin: $state.params.id }, function(res) {
      if (res && angular.isArray(res)) {
        $scope.nhom = res[0] && res[0].NHOM && res[0].NHOM.TEN_NHOM ? res[0].NHOM.TEN_NHOM : "Khác";
        $scope.tintucs = res;
      }
    })
    $scope.detailTin = function(data) {
      $rootScope.danhMucActive = data.ID_LOAI_TIN;
      $scope.loadHome = true;
      $state.go("home.xemTintuc", { id: data.ID });
    }
  } else {
    // looix
  }
})
