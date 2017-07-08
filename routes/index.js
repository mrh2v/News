var express = require('express');
var router = express.Router();
var path = require("path");
var moment = require("moment");
var sequelize = require('../models');
var nhom = sequelize.import('../models/nhomtt.js');
var tintuc = sequelize.import('../models/tintuc.js');
var binhluan = sequelize.import('../models/binhluan.js');
var theodoi = sequelize.import('../models/theodoi.js');
var user = sequelize.import('../models/user.js');

//moment.tz.setDefault("Hanoi/VietNa");
/*tạo ràng buộc dữ liệu*/

// nhom.belongsTo(tintuc, { foreignKey: 'ID_LOAI_TIN' });
// user.belongsTo(tintuc, { foreignKey: 'ID_NGUOI_DANG' });
// binhluan.belongsTo(tintuc, { foreignKey: 'ID_TIN' });
// user.belongsTo(binhluan, { foreignKey: 'ID_USER' });

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
  user.create(ob).then(function(u) {
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
  binhluan.findAll({
    where: {
      ID_TIN: id
    },
    order: [
      ["THOI_GIAN", "DESC"]
    ]
  }).then(function(results) {
    res.send(results);
  }).catch(next);
})

/*TINTUC*/

router.get('/tintuc/get_all', function(req, res, next) {
  tintuc.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get('/tintuc/get_offset', function(req, res, next) {
  var offset = req.query.offset;
  var limit = req.query.limit;
  offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
  limit = parseInt(limit);
  if (!req.query.offset || !req.query.limit || isNaN(offset) || isNaN(limit) || limit > 100) {
    return res.sendStatus(403);
  }
  tintuc.count().then(function(size) {
    tintuc.findAll({
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
router.post('/tintuc/create', function(req, res, next) {
  var ob = req.body;
  ob.THOI_GIAN = new Date();
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
  nhom.findAll().then(function(results) {
    res.send(results);
  }).catch(next);
})
router.get('/nhom/get_by_id/:id', function(req, res, next) {
  console.log(req.params.id)
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
