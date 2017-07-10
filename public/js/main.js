angular.module("appTinTuc").controller('mainCtrl', function($scope, $rootScope, $state, $sce, connect) {
  $scope.goHome = function() {
    $state.go('home');
  };
  $rootScope.toState = $state.current.name;
  connect.get('/nhom/get_all', null, function(data) {
    if (data && angular.isArray(data)) {
      $scope.showDanhMuc = [];
      $scope.hideDanhMuc = [];
      for (var i in data) {
        if (data[i].HIEN_THI == 1) {
          $scope.showDanhMuc.push(data[i]);
        } else {
          $scope.hideDanhMuc.push(data[i]);
        }
      }
    }
  })
  if ($state.current.name == "home") {
    connect.get("/tintuc/get_new", null, function(data) {
      if (data && angular.isArray(data)) {
        $scope.data = data;
      }
    })
    connect.get("/trang-chu/get-tin", null, function(data) {
      if (data && angular.isArray(data)) {
        $scope.dataTinNhom = angular.copy(data);
      }
    })
    connect.get("/tintuc/get_tin_desc_xem", null, function(data){
      if(data && angular.isArray(data)){
        $scope.tinViews = data;
      }
    })
    $scope.detailTin = function(data) {
      $rootScope.danhMucActive = data.ID_LOAI_TIN;
      $scope.loadHome = true;
      $state.go("home.xemTintuc", { id: data.ID });
    }
  } else {
    $scope.loadHome = true;
  }
  $scope.changeDanhMuc = function(id, check) {
    if (check) {
      $rootScope.danhMucActive = "ok";
       $state.go("home.tinDanhMuc", {id: id});
    } else {
      $rootScope.danhMucActive = id;
      if (!id) {
        $scope.loadHome = false;
        $state.go('home', null, {
          reload: true
        });
      }else{
        $state.go("home.tinDanhMuc", {id: id});
      }
    }
  }
})
