var express = require('express');
var router = express.Router();
var path = require("path");
var sequelize = require('../modules');
var nhom_tt = sequelize.import('../modules/nhomtt');
var nhom_tt = sequelize.import('../modules/tintuc');


/* GET home page. */
router.get('/abc', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
