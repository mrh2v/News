var express = require('express');
var router = express.Router();
var path = require("path");
var moment = require("moment");
var path = require('path');
var fs = require("fs");
var async = require("async");
var mkdirp = require('mkdirp');
var sequelize = require('../models');
var nhom = sequelize.import('../models/nhomtt.js');
var tintuc = sequelize.import('../models/tintuc.js');
var binhluan = sequelize.import('../models/binhluan.js');
var theodoi = sequelize.import('../models/theodoi.js');
var user = sequelize.import('../models/user.js');

/*tạo ràng buộc dữ liệu*/

tintuc.belongsTo(nhom, { foreignKey: 'ID_LOAI_TIN', as: "NHOM" });
tintuc.belongsTo(user, { foreignKey: 'ID_NGUOI_DANG', as: "NGUOI_DANG" });
binhluan.belongsTo(tintuc, { foreignKey: 'ID_TIN', as: "TINTUC" });
binhluan.belongsTo(user, { foreignKey: 'ID_USER', as: "USER" });



router.get("/tintuc/get_tin_desc_xem", function(req, res, next) {
  var loaitin = req.query.loaitin;
  var dk = {
    offset: 0,
    limit: 10,
    order: [
      ["SO_LAN_XEM", "DESC"]
    ],
    attributes: ["ID", "TIEU_DE", "NOI_DUNG_TT", "THOI_GIAN", "ID_LOAI_TIN", "SO_LAN_XEM"]
  }
  if (loaitin) {
    dk.where = {
      ID_LOAI_TIN: loaitin
    }
  }
  tintuc.findAll(dk).then(function(tins) {
    res.send(tins);
  }).catch(next)
})

router.get("/trang-chu/get-tin", function(req, res, next) {
  nhom.findAll({
    where: {
      HIEN_THI: 1
    }
  }).then(function(nhoms) {
    var kq = [];
    async.eachSeries(nhoms, function(nhom, callback) {
      if (nhom && nhom.dataValues.ID) {
        tintuc.findAll({
          where: {
            ID_LOAI_TIN: nhom.dataValues.ID
          },
          offset: 0,
          limit: 6,
          order: [
            ["THOI_GIAN", "DESC"]
          ],
          attributes: ["ID", "TIEU_DE", "NOI_DUNG_TT", "THOI_GIAN", "ANH_TD", "ID_LOAI_TIN"]
        }).then(function(tins) {
          var ob = {
            TEN_NHOM: nhom.dataValues.TEN_NHOM,
            ID: nhom.dataValues.ID,
            TINTUC: tins
          }
          kq.push(ob);
          callback();
        })
      } else {
        callback();
      }
    }, function done() {
      // ket qua
      res.send(kq);
    })
  }).catch(next);
})


router.get('/tintuc/get_new', function(req, res, next) {
  var limit = req.query.limit;
  if (!limit || isNaN(parseInt(limit))) {
    limit = 20;
  }
  var loaitin = req.query.loaitin;
  var dk = {
    order: [
      ["THOI_GIAN", "DESC"]
    ],
    offset: 0,
    limit: limit,
    attributes: ['ID', 'TIEU_DE', 'NOI_DUNG_TT', 'THOI_GIAN', 'ANH_TD', "ID_LOAI_TIN"],
  }
  if (loaitin) {
    dk.where = {
      ID_LOAI_TIN: loaitin
    };
    dk.include= [{model: nhom, as : "NHOM", attributes: ["TEN_NHOM"] }]
  }
  tintuc.findAll(dk).then(function(results) {
    res.send(results);
  }).catch(next);
})

router.get('/tintuc/get_by_id/:id', function(req, res, next) {
  var id = req.params.id;
  var xem = req.query.xem;
  tintuc.findOne({
    where: {
      ID: id
    },
    include: [
      { model: user, as: "NGUOI_DANG", attributes: ['HO_TEN', 'TEN_HIEN_THI', 'TEN_DANG_NHAP'] }
    ]
  }).then(function(results) {
    var ob = {
      ID: id,
      SO_LAN_XEM: results.dataValues.SO_LAN_XEM + 1
    }
    results.dataValues.SO_LAN_XEM = results.dataValues.SO_LAN_XEM + 1;
    tintuc.update(ob, {
      where: { ID: ob.ID }
    }).then(function(cb) {}).catch(next)
    res.send(results);
  }).catch(next);
})

router.get('/tintuc/get_offset', function(req, res, next) {
  var offset = req.query.offset;
  var limit = req.query.limit;
  var id = req.query.id;
  offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
  limit = parseInt(limit);
  if (!req.query.offset || !req.query.limit || isNaN(offset) || isNaN(limit) || limit > 100) {
    return res.sendStatus(403);
  }
  var dk = {
    offset: offset,
    limit: limit,
    attributes: ['ID', 'ID_LOAI_TIN', 'ID_NGUOI_DANG', 'TIEU_DE', 'SO_LAN_XEM', 'NOI_DUNG_TT', 'THOI_GIAN'],
    include: [
      { model: nhom, as: "NHOM", attributes: ['ID', 'TEN_NHOM'] },
      { model: user, as: "NGUOI_DANG", attributes: ['ID', 'HO_TEN', 'TEN_HIEN_THI'] }
    ],
    order: [
      ["THOI_GIAN", "DESC"]
    ]
  }
  if (id) {
    dk.where = {
      ID_NGUOI_DANG: id
    }
  }
  tintuc.count().then(function(size) {
    tintuc.findAll(dk).then(function(results) {
      res.send({
        data: results,
        length: size
      });
    }).catch(next);
  }).catch(next);
})

router.post("/hethong/save_img", function(req, res, next) {
  var file = req.body;
  var folder = new Date().getTime();
  mkdirp(path.join(__dirname, "/..") + "/upload/" + file.id + "/" + folder, function(err) {
    if (err) res.sendStatus(500);
    var url = path.join(__dirname, "/..") + "/upload/" + file.id + "/" + folder + "/" + file.name;
    var data = file.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    fs.writeFile(url, new Buffer(data[2], "base64"), function(err) {
      if (err) res.sendStatus(500);
      res.send("/" + file.id + "/" + folder + "/" + file.name);
    })
  })
})

router.post("/hethong/login", function(req, res, next) {
  var ob = req.body;
  if (ob.username && ob.password) {
    user.findOne({
      where: {
        TEN_DANG_NHAP: ob.username,
        MAT_KHAU: ob.password
      }
    }).then(function(user) {
      res.send(user);
    }).catch(next);
  } else {
    res.sendStatus(403)
  }
})
router.post("/hethong/change_password", function(req, res, next) {
  var body = req.body;
  user.findOne({
    where: {
      TEN_DANG_NHAP: body.username,
      MAT_KHAU: body.password
    },
    attributes: ['ID', 'MAT_KHAU']
  }).then(function(ob) {
    if (ob) {
      var obj = ob.dataValues;
      obj.THOI_GIAN_CAP_NHAT = new Date();
      obj.MAT_KHAU = body.newpass;
      user.update(obj, {
        where: { ID: obj.ID }
      }).then(function(results) {
        res.send(obj);
      }).catch(next);
    } else {
      res.send("Mật khẩu không chính xác!")
    }
  }).catch(next)
})

/*USER*/
router.get('/user/get_all', function(req, res, next) {
  user.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get("/user/get_by_id/:id", function(req, res, next) {
  var id = req.params.id;
  user.findOne({
    where: {
      ID: id
    }
  }).then(function(obj) {
    res.send(obj)
  }).catch(next);
})

router.post('/user/create', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN_CAP_NHAT = new Date();
  user.create(ob).then(function(u) {
    res.send(u);
  }).catch(next)
})
router.post('/user/update', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN_CAP_NHAT = new Date();
  user.findOne({
    where: {
      ID: ob.ID
    }
  }).then(function(u) {
    if (u) {
      user.update(ob, {
        where: { ID: ob.ID }
      }).then(function(results) {
        res.send(ob);
      }).catch(next);
    }
  }).catch(next);
})
router.get("/user/delete/:id", function(req, res, next) {
  var id = req.params.id;
  user.findOne({
    where: {
      ID: id
    }
  }).then(function(obj) {
    if (obj) {
      obj.destroy().then(function(results) {
        res.send(results);
      }).catch(next);
    } else {
      res.sendStatus(400);
    }
  }).catch(next);
})
router.get('/user/get_offset', function(req, res, next) {
  var offset = req.query.offset;
  var limit = req.query.limit;
  offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
  limit = parseInt(limit);
  if (!req.query.offset || !req.query.limit || isNaN(offset) || isNaN(limit) || limit > 100) {
    return res.sendStatus(403);
  }
  user.count().then(function(size) {
    user.findAll({
      offset: offset,
      limit: limit
    }).then(function(results) {
      res.send({
        data: results,
        length: size
      });
    }).catch(next);
  }).catch(next);
})

/*BINHLUAN*/

router.get('/binhluan/get_all', function(req, res, next) {
  binhluan.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})
router.post('/binhluan/create', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN = new Date();
  binhluan.create(ob).then(function(u) {
    res.send(u);
  }).catch(next)
})
router.post('/binhluan/update', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN = new Date();
  binhluan.findOne({
    where: {
      ID: ob.ID
    }
  }).then(function(u) {
    if (u) {
      binhluan.update(ob, {
        where: { ID: ob.ID }
      }).then(function(results) {
        res.send(ob);
      }).catch(next);
    }
  }).catch(next);
})
router.get("/binhluan/delete/:id", function(req, res, next) {
  var id = req.params.id;
  binhluan.findOne({
    where: {
      ID: id
    }
  }).then(function(obj) {
    if (obj) {
      obj.destroy().then(function(results) {
        res.send(results);
      }).catch(next);
    } else {
      res.sendStatus(400);
    }
  }).catch(next);
})
router.get('/binhluan/get_by_tin/:id', function(req, res, next) {
  var id = req.params.id;
  var offset = req.query.offset;
  var limit = req.query.limit;
  var kq = {};
  var dk = {
    order: [
      ["THOI_GIAN", "DESC"]
    ],
    include: [
      { model: user, as: "USER", attributes: ['ANH'] }
    ],
    where: {
      ID_TIN: id
    }
  }
  offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
  limit = parseInt(limit);
  if (req.query.offset && req.query.limit && !isNaN(offset) && !isNaN(limit) && limit < 100) {
    dk.offset = offset;
    dk.limit = limit;
  }
  binhluan.count({
    where: {
      ID_TIN: id
    }
  }).then(function(socm) {
    binhluan.findAll(dk).then(function(results) {
      var kq = {
        length: socm,
        data: results
      }
      res.send(kq);
    }).catch(next);
  }).catch(next);
})

/*TINTUC*/

router.get('/tintuc/get_all', function(req, res, next) {
  tintuc.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})

router.post('/tintuc/create', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN = new Date();
  ob.SO_LAN_XEM = 0;
  tintuc.create(ob).then(function(u) {
    res.send(u);
  }).catch(next)
})
router.post('/tintuc/update', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN = new Date();
  tintuc.findOne({
    where: {
      ID: ob.ID
    }
  }).then(function(u) {
    if (u) {
      tintuc.update(ob, {
        where: { ID: ob.ID }
      }).then(function(results) {
        res.send(ob);
      }).catch(next);
    }
  }).catch(next);
})
router.get("/tintuc/delete/:id", function(req, res, next) {
  var id = req.params.id;
  tintuc.findOne({
    where: {
      ID: id
    }
  }).then(function(obj) {
    if (obj) {
      obj.destroy().then(function(results) {
        res.send(results);
      }).catch(next);
    } else {
      res.sendStatus(400);
    }
  }).catch(next);
})
router.get('/tintuc/get_by_user/:id', function(req, res, next) {
  var id = req.params.id;
  tintuc.findAll({
    where: {
      ID_NGUOI_DANG: id
    },
    order: [
      ["THOI_GIAN", "DESC"]
    ]
  }).then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get('/tintuc/get_by_loaitin/:id', function(req, res, next) {
  var id = req.params.id;
  tintuc.findAll({
    where: {
      ID_LOAI_TIN: id
    },
    order: [
      ["THOI_GIAN", "DESC"]
    ]
  }).then(function(results) {
    res.send(results);
  }).catch(next);
})


/*NHOM TT*/
router.get('/nhom/get_all', function(req, res, next) {
  nhom.findAll({
    order: [
      ["THU_TU", "ASC"]
    ]
  }).then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get('/nhom/get_by_id/:id', function(req, res, next) {
  nhom.findOne({
    where: {
      ID: req.params.id
    }
  }).then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get('/nhom/get_offset', function(req, res, next) {
  var offset = req.query.offset;
  var limit = req.query.limit;
  offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
  limit = parseInt(limit);
  if (!req.query.offset || !req.query.limit || isNaN(offset) || isNaN(limit) || limit > 100) {
    return res.sendStatus(403);
  }
  nhom.count().then(function(size) {
    nhom.findAll({
      offset: offset,
      limit: limit
    }).then(function(results) {
      res.send({
        data: results,
        length: size
      });
    }).catch(next);
  }).catch(next);
})
router.post('/nhom/create', function(req, res, next) {
  var ob = req.body;
  nhom.create(ob).then(function(u) {
    res.send(u);
  }).catch(next)
})
router.post('/nhom/update', function(req, res, next) {
  var ob = req.body;
  nhom.findOne({
    where: {
      ID: ob.ID
    }
  }).then(function(u) {
    if (u) {
      nhom.update(ob, {
        where: { ID: ob.ID }
      }).then(function(results) {
        res.send(ob);
      }).catch(next);
    }
  }).catch(next);
})
router.get("/nhom/delete/:id", function(req, res, next) {
    var id = req.params.id;
    nhom.findOne({
      where: {
        ID: id
      }
    }).then(function(obj) {
      if (obj) {
        obj.destroy().then(function(results) {
          res.send(results);
        }).catch(next);
      } else {
        res.sendStatus(400);
      }
    }).catch(next);
  })
  /*THEO DOI*/
router.get('/theodoi/get_all', function(req, res, next) {
  theodoi.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})
router.post('/theodoi/create', function(req, res, next) {
  var ob = req.body;
  theodoi.create(ob).then(function(u) {
    res.send(u);
  }).catch(next)
})
router.post('/theodoi/update', function(req, res, next) {
  var ob = req.body;
  theodoi.findOne({
    where: {
      ID: ob.ID
    }
  }).then(function(u) {
    if (u) {
      theodoi.update(ob, {
        where: { ID: ob.ID }
      }).then(function(results) {
        res.send(ob);
      }).catch(next);
    }
  }).catch(next);
})
router.get("/theodoi/delete/:id", function(req, res, next) {
  var id = req.params.id;
  theodoi.findOne({
    where: {
      ID: id
    }
  }).then(function(obj) {
    if (obj) {
      obj.destroy().then(function(results) {
        res.send(results);
      }).catch(next);
    } else {
      res.sendStatus(400);
    }
  }).catch(next);
})

module.exports = router;
