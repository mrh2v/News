angular.module("appTinTuc").controller("timkiemCtrl", function($state, $rootScope, $scope, connect) {
  $rootScope.toState = $state.current.name;

  function timKiem(timkiem) {
    connect.get("/trang_chu/search", { timkiem: timkiem }, function(data) {
      if (data && angular.isArray(data)) {
        $scope.tins = data;
      }
    })
  }
  if ($state.params && $state.params.data) {
    timKiem($state.params.data);
    $rootScope.timkiem = $state.params.data;
  }
  $scope.detailTin = function(data) {
    $rootScope.timkiem = null;
    $rootScope.danhMucActive = data.ID_LOAI_TIN;
    $state.go("home.xemTintuc", { id: data.ID });
  }
})
