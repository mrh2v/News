angular.module("appTinTuc").controller('mainCtrl', function( $scope, $rootScope, $state){
  $scope.goHome = function(){
    $state.go('home');
  }
})
