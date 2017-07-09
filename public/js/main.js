angular.module("appTinTuc").controller('mainCtrl', function( $scope, $rootScope, $state, $sce, connect){
  $scope.goHome = function(){
    $state.go('home');
  }

  connect.get('/nhom/get_all', null, function(data){
  	if(data && angular.isArray(data)){
  		$scope.showDanhMuc = [];
  		$scope.hideDanhMuc = [];
  		for(var i in data){
  			if(data[i].HIEN_THI == 1){
  				$scope.showDanhMuc.push(data[i]);
  			}else{
  				$scope.hideDanhMuc.push(data[i]);
  			}
  		}
  	}
  })
  connect.get("/tintuc/get_new", null, function(data){
  	if(data && angular.isArray(data)){
  		$scope.data = data;
  	}
  })

})
