angular.module("appTinTuc").controller("tintucCreate", function($scope, $rootScope, $state, connect) {
  var tt = this;
  $scope.editorOptions = {
    language: 'vi',
    uiColor: '#21a6bb;'
  };

  $scope.$watch('noidung', function(n) {
    console.log(n);
  })
})
