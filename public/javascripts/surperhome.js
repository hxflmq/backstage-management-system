$(function(){
    $("#side-menu li").eq(0).on("click",function(){
        $(".admin").css("display","block");
        $(".log").css("display","none");
        $(".puto").css("display","none");
        $(".vip").css("display","none");
         $(".skin").css("display","none");
         $(".curd").css("display","none")
    })
    $("#side-menu li").eq(1).on("click",function(){
        $(".log").css("display","block");
        $(".admin").css("display","none");
        $(".puto").css("display","none");
        $(".vip").css("display","none");
         $(".skin").css("display","none");
         $(".curd").css("display","none")
    })
    $("#puton").on("click",function(){
        $(".log").css("display","none");
        $(".admin").css("display","none");
        $(".puto").css("display","block");
         $(".skin").css("display","none");
        $(".vip").css("display","none");
         $(".curd").css("display","none");
         //从数据库拿到接口 查询普通用户信息
         var str = ""
         $.get("users/puton",(data)=>{
             console.log(data)
             for(var i=1;i<data.length;i++){
               str+="<li id='list'>用户名：<h1>"+data[i].username+"</h1>密码：<h2>"+data[i].password+"</h2>邮箱：<h3>"+data[i].email+"</h3></li>"
                //console.log(data[i].username,data[i].password,data[i].email) 
             }
             $("#putong").html(str);
         })
    })
    $("#vip").on("click",function(){
        $(".log").css("display","none");
        $(".admin").css("display","none");
        $(".puto").css("display","none");
        $(".vip").css("display","block");
         $(".skin").css("display","none");
         $(".curd").css("display","none");
    });
    $("#side-menu").on("click",function(){
         $(".conh").animate({"opacity":"0"},500);
    })
    $("#curd").on("click",function(){
        $(".log").css("display","none");
        $(".admin").css("display","none");
        $(".puto").css("display","none");
        $(".vip").css("display","none");
         $(".skin").css("display","none");
        $(".curd").css("display","block");
         //从数据库拿到接口 查询普通用户信息
         var str = ""
         $.get("users/puton",(data)=>{
            // console.log(data)
             for(var i=1;i<data.length;i++){
                // console.log(i)
               str+="<li id='list'>用户名：<h1>"+data[i].username+"</h1>密码：<h2>"+data[i].password+"</h2>邮箱：<h3>"+data[i].email+"</h3><input type='button' value='删除用户' class='del btn-danger' data-id="+data[i]._id+"><input type='button' value='更改用户' class='edit btn-info' data-id="+data[i]._id+"></li>"
                //console.log(data[i].username,data[i].password,data[i].email) 
             }
             $("#aid").html(str);
         });
    })
    $("#skin").on("click",function(){
        $(".log").css("display","none");
        $(".admin").css("display","none");
        $(".puto").css("display","none");
        $(".vip").css("display","none");
        $(".curd").css("display","none");
        $(".skin").css("display","block");
    })
    $(".btn-info").on("click",function(){
        $(".top1").css("background","#35c0f0");
        $(".sidebar").css("background","#35c0f0");
    })
    $(".btn-warning").on("click",function(){
        $(".top1").css("background","#00d9bc");
        $(".sidebar").css("background","#00d9bc");
    })
    $(".btn-danger").on("click",function(){
        $(".top1").css("background","#ff5334");
        $(".sidebar").css("background","#ff5334");
    });
    //删除按钮
      $("#aid").on("click",".del",function(){
       for(let i = 0;i<$(".del").length;i++){
          var del = document.querySelectorAll(".del");
          del[i].onclick = function(){
            //拿到页面对应的id
              var data_id = this.getAttribute("data-id");
              $(this).parent().remove()
              //console.log(data_id);
             $.post("users/del",{id:data_id},(data)=>{
                  //console.log(data);
            })  
        }
      }
})
{/* <div class="conh">
用户名:<input type="text" id="text">
密 码:<input type="password" id="pass">
邮箱:<input type="email" name="" id="email">
<input type="button" value="取消更改" id="qx">
<input type="button" value="确认更改" id="qr">
</div> */}
    //更改按钮
    $("#aid").on("mousedown",".edit",function(){
        for(let k = 0;k<$(".edit").length;k++){
            var edit = document.querySelectorAll(".edit");
            edit[k].onclick = function(e){
                e.preventDefault()
            //拿到页面对应的id
                var data_id =this.getAttribute("data-id");
                $(".conh").animate({"opacity":"1"},500)
                $text = $("#text").val();
                $pass = $("#pass").val();
                $email = $("#email").val();
            //当更改的用户名长度>6 才会执行post请求 与注册规则一致
                if($text.length>6){
                     //console.log($text,$pass,$email)
            //请求 参数传递给后端 然后传递到接口 将传递的参数放到数据库中data
               $.post("users/edit",{id:data_id,username:$text,password:$pass,email:$email},(data)=>{
                console.log(data)
               })
            }
                }
               
        }
    })
    $("#qx").on("click",function(){
        $(".conh").animate({"opacity":"0"},500)
    });
    //更改分页
    for(let k = 0;k<$("#page li").length;k++){
       var list = document.querySelectorAll("#page li");
       list[k].onclick = function(){
          $.post("users/page",{skip:k},(data)=>{
              console.log(data)
              var page = ""
             for(var i=1;i<data.length;i++){
                // console.log(i)
               page+="<li id='list'>用户名：<h1>"+data[i].username+"</h1>密码：<h2>"+data[i].password+"</h2>邮箱：<h3>"+data[i].email+"</h3><input type='button' value='删除用户' class='del btn-danger' data-id="+data[i]._id+"><input type='button' value='更改用户' class='edit btn-info' data-id="+data[i]._id+"></li>"
             }
             $("#aid").html(page); 
           })
       }
    };
    //查找分页
    for(let k = 0;k<$("#pucha li").length;k++){
        var cha = document.querySelectorAll("#pucha li");
        cha[k].onclick = function(){
           $.post("users/page",{skip:k},(data)=>{
               console.log(data);
               var strp = "";
               for(var i =1;i<data.length;i++){
                strp+="<li id='list'>用户名：<h1>"+data[i].username+"</h1>密码：<h2>"+data[i].password+"</h2>邮箱：<h3>"+data[i].email+"</h3></li>";
               }
               $("#putong").html(strp);
           })
        }
    }
})