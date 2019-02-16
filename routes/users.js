var express = require('express');
var router = express.Router();
//建立mongodb数据库客户端
var MogondbClient = require("mongodb").MongoClient;
//建立mongodb数据库的地址
var url ="mongodb://localhost:27017";
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册接口
router.post("/register",(req,res)=>{
//post 请求用req.body get则用req.query 从页面拿到数据
  var data = req.body;
  var username = data.username;
  /* var password = data.password;
  var email = data.email;
  console.log(username,password,email)  */
  //连接数据库
  MogondbClient.connect(url,(err,db)=>{
  //错误优先原则
     if(err){
       throw err;
     }
     //建表
       var dabese = db.db("msg");
    //建集合
       var col = dabese.collection("permsg");
    //查找数据库是否重名注册的用户信息
       col.find({"username":username}).toArray((err,result)=>{
           if(result.length !=0){
             res.send("0")
           }else{
             col.insertOne(data,(err,result)=>{
               res.send("1");
             })
           }
           //关闭数据库
            db.close();
       }) 
  })
});
//登录接口"
  router.post("/login",(req,res)=>{
//拿到登录页面的数据
    var data = req.body;
    console.log(data)
//连接mongodb数据库
MogondbClient.connect(url,(err,db)=>{
//建表已有不建直接找
    var dabese =db.db("msg");
//建集合已有不建直接找
    var col = dabese.collection("permsg");
 col.find(data).toArray((err,result)=>{
  //如果result长度等于0则说明数据库找不到  否则正确
  if(result.length==0){
    res.send("0")  
    }else{
      res.send("1");
    }
 })
      db.close();
  })
}) 
//查找数据库
router.get("/puton",(req,res)=>{
  //res.end("d");
  MogondbClient.connect(url,(err,db)=>{
    var data = req.query;
    //建表已有不建直接找
        var dabese =db.db("msg");
    //建集合已有不建直接找
        var col = dabese.collection("permsg");
     col.find(data).toArray((err,result)=>{
      //如果result长度等于0则说明数据库找不到  否则正确
       res.send(result);
     })
          db.close();
    });
});
//删除数据库
router.post("/del",(req,res)=>{
  var data = req.body;
  //console.log(data)
  //res.send(data_id)
 MogondbClient.connect(url,(err,db)=>{
  var data = req.body;
  console.log(data)
  //建表已有不建直接找
      var dabese =db.db("msg");
  //建立mongodb的模块id
  var ObjectId = require("mongodb").ObjectId;
    //id 为页面的post求带带的参数id在data页面中
  id = ObjectId(data.id);
  var col = dabese.collection("permsg")
    col.deleteOne({_id:id},(err,ruslt)=>{
      console.log("删除");
      res.end("aaa");
    })
    db.close();
      })  
  });
//更改数据库
router.post("/edit",(req,res)=>{
    var data = req.body;
    console.log(data)
    MogondbClient.connect(url,(err,db)=>{
    var ObjectId = require("mongodb").ObjectId;
    //id 为页面的post求带带的参数id在data页面中
    id = ObjectId(data.id);
     var dabese = db.db("msg");
     //连接集合
     var col = dabese.collection("permsg");
     //更新post请求的参数
          col.update({_id:id},{$set:{username:data.username,password:data.password,email:data.email}},(req,result)=>{
           res.send(result)
          })
  })  
})
//管理与查找的分页
 router.post("/page",(req,res)=>{
  var data =req.body;
  console.log(data)
  var skip = data.skip;
  //console.log(skip*5)
  MogondbClient.connect(url,(err,db)=>{
    var dabese = db.db("msg");
    var col = dabese.collection("permsg");
    col.find().skip(skip*5).limit(6).toArray((err,result)=>{
      res.send(result);
    })
  })
})   
module.exports = router;
