angular.module("appTinTuc").controller("tintucDetailCtrl", function($uibModalInstance, body, $scope, $sce) {
  $scope.body = body;
  $scope.renderHTML = function(data) {
    return $sce.trustAsHtml(data);
  }
  $scope.exitModal = function() {
    $uibModalInstance.close();
  }
})
angular.module("appTinTuc").controller("tintucDs", function($scope, $rootScope, $state, $timeout, connect, toastr, $filter) {
  $rootScope.toState = $state.current.name;

  function layDuLieu(offset, limit, id) {
    var ob = {
      offset: offset,
      limit: limit,
      id: id
    }
    connect.get("/tintuc/get_offset", ob, function(data) {
      if (data && data.data) {
        renderData(data.data, offset);
        $scope.soTrang = Math.ceil(data.length / limit);
      }
    })
  }

  function renderData(data, dem) {
    for (var i in data) {
      if (data[i].NHOM) {
        data[i].danh_muc = data[i].NHOM.TEN_NHOM ? data[i].NHOM.TEN_NHOM : "Khác";
      }
      if (data[i].NGUOI_DANG) {
        data[i].nguoi_dang = data[i].NGUOI_DANG.TEN_HIEN_THI ? data[i].NGUOI_DANG.TEN_HIEN_THI : data[i].NGUOI_DANG.HO_TEN ? data[i].NGUOI_DANG.HO_TEN : "Không rõ";
      }
      data[i].thoi_gian = $filter('date')(data[i].THOI_GIAN, 'dd-MM-yyyy HH:mm:ss')
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
      if ($rootScope.activeFull) {
        layDuLieu((so - 1) * 6, 6);
      } else {
        layDuLieu((so - 1) * 6, 6, $rootScope.user.id);
      }
      $scope.trangSelect = so;
    }
  }
  $scope.editTT = function(data) {
    $state.go("admin.updateTintuc", { id: data.ID });
  }

  $scope.xoaTT = function(data) {
    connect.modal("XÓA BÀI VIẾT", "Bạn có muốn xóa bài viết " + data.TIEU_DE + "?", null, function(res) {
      if (res) {
        connect.delete("/tintuc/delete", { id: data.ID }, function(cb) {
          if (cb && cb.ID) {
            toastr.success('Thao tác xóa thành công !');
            $state.reload();
          } else {
            toastr.error('Thao tác xóa thất bại !');
          }
        })
      }
    })
  }
  if ($rootScope.activeFull) {
    layDuLieu(0, 6);
  } else {
    layDuLieu(0, 6, $rootScope.user.id);
  }

})
angular.module("appTinTuc").controller("tintucCreate", function($scope, $rootScope, $state, connect, $timeout, toastr, $uibModal) {
  var tt = this;
  $rootScope.toState = $state.current.name;
  if ($state.params && $state.params.id) {
    $scope.update = true;
    connect.get('/tintuc/get_by_id/' + $state.params.id, null, function(data) {
      if (data && data.ID) {
        $scope.tintuc = angular.copy(data);
        $scope.noidung = data.NOI_DUNG;
        $scope.tieudeAnh = data.ANH_TD;
        $scope.backup = angular.copy(data.ANH_TD);
        $scope.tintuc.ID_LOAI_TIN = String($scope.tintuc.ID_LOAI_TIN);
      } else {
        toastr.error('Không tìm thấy bài viết!');
      }
    })
  }

  $scope.files = [{}];

  var solanCall = 0;

  function callDanhMuc() {
    solanCall++;
    connect.get("/nhom/get_all", null, function(data) {
      if (data && angular.isArray(data)) {
        $scope.danhmucs = angular.copy(data);
      } else {
        if (solanCall < 10) {
          $timeout(function() {
            callDanhMuc();
          }, 2000)
        }
      }
    })
  }
  callDanhMuc();

  $scope.uploadAnh = function(file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function(data) {
        $timeout(function() {
          $scope.$apply(function() {
            $scope.tieudeAnh = data.target.result;
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }

  $scope.upload = function(file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function(data) {
        $timeout(function() {
          $scope.$apply(function() {
            var ob = {
              name: file.name,
              data: data.target.result
            }
            var len = $scope.files.length - 1;
            if ($scope.files[len] && !$scope.files[len].url) {
              $scope.files[len] = ob;
            } else {
              $scope.files.push(ob);
            }
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }
  $scope.saveFile = function(index) {
    var ob = $scope.files[index];
    ob.id = $rootScope.user.id;
    connect.post("/hethong/save_img", ob, function(cb) {
      if (cb && cb.status != 500) {
        $scope.files[index].url = cb;
        $scope.files.push({});
      } else {
        toastr.error('Không lấy đường dẫn file!');
      }
    })
  }
  $scope.saveTintuc = function(tintuc) {
    if ($scope.tieudeAnh) {
      $scope.loading = true;
      tintuc.NOI_DUNG = $scope.noidung;
      tintuc.ANH_TD = $scope.tieudeAnh;
      if (!$scope.update) {
        tintuc.ID_NGUOI_DANG = $rootScope.user.id;
        connect.post("/tintuc/create", tintuc, function(cb) {
          if (cb && cb.ID) {
            toastr.success('Lưu bài viết thành công!', "THÀNH CÔNG");
            $state.reload();
          } else {
            toastr.error('Lưu bài viết thất bại!', "THẤT BẠI");
          }
          $scope.loading = false;
        })
      } else {
        connect.post("/tintuc/update", tintuc, function(cb) {
          if (cb && cb.ID) {
            toastr.success('Cập nhật bài viết thành công!', "THÀNH CÔNG");
            $state.reload();
          } else {
            toastr.error('Cập nhật bài viết thất bại!', "THẤT BẠI");
          }
          $scope.loading = false;
        })
      }
    } else {
      toastr.warning('Chưa có ảnh tiêu đề bài viết', "CẢNH BÁO");
    }
  }
  $scope.xemTintuc = function(tintuc) {
    if (!tintuc) tintuc = {}
    tintuc.NOI_DUNG = convertTAYouTubeMarkupToIframe($scope.noidung);
    var modal = $uibModal.open({
      animation: true,
      templateUrl: "/views/tintuc_xemtruoc.html",
      controller: 'tintucDetailCtrl',
      size: 'lg',
      resolve: {
        body: tintuc
      }
    })
  }
})
