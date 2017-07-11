var app = angular.module("appTinTuc", ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr', 'ngFileUpload', 'textAngular', 'ngSanitize']);

app.config(function($stateProvider, $locationProvider, $qProvider, toastrConfig, $provide, $sceProvider) {
  angular.extend(toastrConfig, {
    timeOut: 3000
  })
  $sceProvider.enabled(true);
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  $qProvider.errorOnUnhandledRejections(false);

  $stateProvider
    .state('admin', {
      url: '/quan-li-he-thong',
      templateUrl: 'views/quan-li.html',
      controller: "quanliCtrl"
    })
    .state('admin.ttchitiet', {
      url: '/thong-tin-ca-nhan/chi-tiet',
      templateUrl: 'views/thong-tin-ca-nhan.html',
      controller: "ttcnCtrl"
    })
    .state('admin.taikhoan', {
      url: '/thong-tin-ca-nhan/tai-khoan/:id',
      templateUrl: 'views/thong-tin-ca-nhan.html',
      controller: "tkCtrl"
    })
    .state('admin.dmdanhsach', {
      url: '/danh-sach-nhom-tin',
      templateUrl: 'views/danhmuc-danhsach.html',
      controller: "danhMucCtrl",
      controllerAs: "dm"
    })
    .state('admin.createnhom', {
      url: '/danh-sach-nhom-tin/create',
      templateUrl: 'views/dm_chitiet.html',
      controller: "danhMucChiTietCtrl",
      controllerAs: "dm"
    })
    .state('admin.updatenhom', {
      url: '/danh-sach-nhom-tin/update/:id',
      templateUrl: 'views/dm_chitiet.html',
      controller: "danhMucChiTietCtrl",
      controllerAs: "dm"
    })
    .state('admin.user', {
      url: '/danh-sach-tai-khoan',
      templateUrl: 'views/user_danhsach.html',
      controller: "userDsCtrl",
      controllerAs: "user"
    })
    .state('admin.createuser', {
      url: '/danh-sach-tai-khoan/them-moi',
      templateUrl: 'views/user_create.html',
      controller: "userCreateCtrl",
      controllerAs: "user"
    })
    .state('admin.updateuser', {
      url: '/danh-sach-tai-khoan/chi-tiet/:id',
      templateUrl: 'views/user_create.html',
      controller: "userCreateCtrl",
      controllerAs: "user"
    })
    .state('admin.tk', {
      url: '/danh-sach-tai-khoan/tai-khoan',
      templateUrl: 'views/user_tk.html',
      controller: "userTkCtrl",
      controllerAs: "user"
    })
    .state('admin.creattt', {
      url: '/tin-tuc/them-moi',
      templateUrl: 'views/tintuc_create.html',
      controller: "tintucCreate",
      controllerAs: "tt"
    })
    .state('admin.dstintuc', {
      url: '/tin-tuc/danh-sach',
      templateUrl: 'views/tintuc_danhsach.html',
      controller: "tintucDs",
      controllerAs: "tt"
    })
    .state('admin.updateTintuc', {
      url: '/tin-tuc/cap-nhat/:id',
      templateUrl: 'views/tintuc_create.html',
      controller: "tintucCreate",
      controllerAs: "tt"
    })

  /*trang chu*/
  .state('home', {
      url: '/trang-chu',
      templateUrl: 'views/home.html',
      controller: "mainCtrl"
    })
    .state('home.xemTintuc', {
      url: '/tin-tuc/noi-dung/:id',
      templateUrl: 'views/tintuc_xem.html',
      controller: "tintucCtrl",
      controllerAs: "tt"
    })
    .state('home.tinDanhMuc', {
      url: '/tin-tuc/danh-muc/:id',
      templateUrl: 'views/danhmuc_xemtin.html',
      controller: "tinDanhMucCtrl",
      controllerAs: "tt"
    })
    .state('home.timkiem', {
      url: '/tin-tuc/tim-kiem/:data',
      templateUrl: 'views/tim_kiem.html',
      controller: "timkiemCtrl",
      controllerAs: "tk"
    })
});

app.run(function($rootScope, $state, $uibModal, $timeout) {
  $rootScope.danhMucActive = null;
  $rootScope.urlAvatar = "/avatar.gif";
  $rootScope.setPer = function(q) {
    if (q == 99 || q == 1) {
      $rootScope.activeFull = true;
      if (q == 99) {
        $rootScope.activeRoot = true;
      }
      $rootScope.activeUser = true;
      $rootScope.activeWrite = false;
    } else if (q = 2) {
      $rootScope.activeWrite = true;
      $rootScope.activeFull = false;
      $rootScope.activeRoot = false;
      $rootScope.activeUser = true;
    } else if (q == 3) {
      $rootScope.activeWrite = false;
      $rootScope.activeFull = false;
      $rootScope.activeUser = true;
      $rootScope.activeRoot = false;
    }
  }
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      $timeout(function() {
        if (toState.name.indexOf("admin") > -1) {
          if ($rootScope.user && $rootScope.toState !== toState.name) {
            $state.go(toState.name, toParams, {
              reload: true
            });
          }
        } else {
          if ($rootScope.toState != toState.name) {
            $state.go(toState.name, toParams, {
              reload: true
            });
          }
        }
      }, 100)
    });
  if (typeof(Storage) !== "undefined" && localStorage.id) {
    $rootScope.user = {
      id: localStorage.id,
      name: localStorage.user,
      per: localStorage.per,
      anh: localStorage.anh,
      username: localStorage.username
    }
    $rootScope.setPer(localStorage.per);
  }

  function doiNgay(str) {
    var thu = "";
    switch (str) {
      case 'Sunday':
        thu = 'Chủ nhật';
        break;
      case 'Monday':
        thu = 'Thứ hai';
        break;
      case 'Tuesday':
        thu = 'Thứ ba';
        break;
      case 'Wednesday':
        thu = 'Thứ tư';
        break;
      case 'Thursday':
        thu = 'Thứ năm';
        break;
      case 'Friday':
        thu = 'Thứ sáu';
        break;
      case 'Saturday':
        thu = 'Thứ bảy';
    }
    return thu;
  }
  $rootScope.thu = doiNgay(moment().format('dddd'));
  $rootScope.ngay = moment().format("DD/MM/YYYY");

  $rootScope.goTimKiem = function(tk){
    if(tk){
      $state.go("home.timkiem", {data: tk})
    }
  }
  $rootScope.goBaiViet = function() {
    $state.go("admin.dstintuc");
  }

  $rootScope.goMatKhau = function() {
    $state.go("admin.tk")
  }
  $rootScope.goHeThong = function() {
    $state.go("admin");
  }
  $rootScope.goThongTinCaNhan = function() {
    $state.go("admin.ttchitiet", { id: $rootScope.user.id });
  }
  $rootScope.register = function() {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: "/views/dangky.html",
      controller: 'dangkyCtrl',
      controllerAs: 'dk'
    })
  }

  $rootScope.login = function() {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: "/views/modal-login.html",
      controller: 'loginCtrl',
      controllerAs: 'lg',
      size: "sm"
    })
  }

  $rootScope.logout = function() {
    $rootScope.user = null;
    if (typeof(Storage) !== "undefined") {
      localStorage.clear();
    }
    $state.go("home");
  }

  if (!$rootScope.user && $state.current.name.indexOf("admin") > -1) {
    $state.go('home');
  }

});

app.factory("connect", function($http, $uibModal) {
  return {
    get: function(url, params, callback) {
      $http({
        url: url,
        method: "GET",
        params: params
      }).then(function(res) {
        callback(res.data);
      }, function(err) {
        callback(err);
      })
    },
    post: function(url, data, callback) {
      $http.post(url, data).then(function(res) {
        return callback(res.data);
      }, function(err) {
        return callback(err)
      })
    },
    delete: function(url, params, callback) {
      if (params) {
        for (var i in params) {
          url += '/' + params[i];
        }
      }
      $http.get(url).then(function(res) {
        return callback(res.data);
      }, function(err) {
        return callback(err)
      })
    },
    modal: function(title, status, size, callback) {
      var modal = $uibModal.open({
        animation: true,
        templateUrl: "/views/modal-public.html",
        controller: 'modalCtrl',
        controllerAs: 'modal',
        size: size,
        resolve: {
          body: { title: title, status, status }
        }
      })
      modal.result.then(function(res) {
        if (angular.isFunction(callback)) callback(res);
      }, function() {
        if (angular.isFunction(callback)) callback(false);
      })
    }
  }
})



var convertTAYouTubeMarkupToIframe = function(str) {
  if (!str) {
    return str;
  }
  var regExp = /<img class="ta-insert-video" src="(.*?)" ta-insert-video="(.*?)" contenteditable="false" allowfullscreen="true" frameborder="0"(.*?)\/>/g;
  str = str.replace(regExp, replaceWithFn);
  return str;
};


function replaceWithFn(str, p1, p2) {
  return '<div class="auto-resizable-iframe"><div><iframe style="width: 100%; height: 400px;"  src="' + p2 + '" frameborder="0" allowfullscreen></iframe></div></div>';
}
