var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册页面渲染
router.get("/register",(req,res)=>{
  res.render("register");
});
//登录页面渲染
router.get("/login",(req,res)=>{
  res.render("login");
});
//超级用户页面渲染
router.get("/surper",(req,res)=>{
  res.render("surper");
})
//超级用户主页页面渲染
router.get("/surperhome",(req,res)=>{
  res.render("surperhome");
})
module.exports = router;
