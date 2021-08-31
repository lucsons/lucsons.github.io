//  添加任务

//  判断 早中晚 

var time = new Date().getHours();
var todo_time = $("#todo_time");

if(time > 5 && time < 11) todo_time.html("上午好,新的一天新的风景！").next().html("开启新一天的任务 做一个有规划的人 ！")
else if(time > 10 && time < 15) todo_time.html("中午好,记得睡个舒服的午觉！").next().html("祝您在梦里遇到开心的事 ！")
else if(time > 14 && time < 19) todo_time.html("下午好,下午的凉茶 有您一份！").next().html("也许您也憧憬简单的爱情！")
else if(time > 18 && time < 24) todo_time.html("晚上好,记得下班早点休息哦！").next().html("累了一天 该放松一下了！")
else todo_time.html("深夜了,还在加班吗！").next().html("注意身体！");



// 添加数据

var $todo_submit = $("#todo_submit");
var $todo_content = $("#todo_content");
var $todo_tip = $(".todo_tip");
var todo_datas = localStorage.getItem("todo_list");
var $todo_list_content = $("#todo_list_content");
var $todo_clear = $("#todo_clear");
var $todo_success = $("#todo_success");
var $todo_fail = $("#todo_fail");
var $todo_total = $("#todo_total");
var $todo_numbers = $("#todo_numbers");
var $now_time = $("#now_time");

setInterval(function(){
    $now_time.html("现在时间：" + new Date().toLocaleString());	
});

// 是否是第一次添加
if(!todo_datas){
	 localStorage.setItem("todo_list",JSON.stringify([]));
}

//  主渲染函数
function render(id){
	  
	  if(id){
		  var res = todo_datas.filter(v => v.id != id);
		  localStorage.setItem("todo_list",JSON.stringify(res))
	  }
	  
	  todo_datas = JSON.parse(localStorage.getItem("todo_list"));

	  $("#todo_list_content").empty();
	  if(todo_datas.length <= 0){
		  $("#todo_no").css("display","table-cell");
	  }else{
		   $("#todo_no").css("display","none");
		   $(todo_datas).each(function(i,v){
				$todo_list_content.append(`
					<tr>
						<td width="100">
							 <input class="check" value="${v.id}" type="checkbox" />
						</td>
						<td>${v.content}</td>
						<td>${v.first_add_time}</td>
						<td>${v.out_time}</td>
						<td>${v.over_date}</td>
						<td class="todo_del" data-tid="${v.id}" style="cursor:pointer;text-decoration:underline;">
							 删除
						</td>
					</tr>
				`);
		   });
	  }
	  is_success();
	  return todo_datas;
}

render();

// 判断每个任务已超过多少天

function out_time(){
	if(todo_datas.length > 0){
	   var date = new Date();
	   var nowDate = new Date(date.toLocaleDateString()).getTime();
	   var move_todo = [];
	   var date__ = null;
	   $(todo_datas).each(function(index,value){
		   var vDate = value.first_add_time;
		   var date_ = new Date(vDate);
		   date__  = date_.getTime();
		   if(nowDate != date__){
			   value.out_time = date.toLocaleDateString();
			   value.over_date = parseInt((nowDate/1000/60/60/24) - (date__/1000/60/60/24));
			   move_todo.push(value);
		   }
	   });
	   if(nowDate != date__){
		   localStorage.setItem("todo_list",JSON.stringify(move_todo));
	   }
	}
}

out_time();

// 勾选切换已完成和未完成
$("#todo_list_content").on("change",".check",function(){
	   var id = $(this).val();
	   var res_datas = null;
	   if($(this).prop("checked")){
		   res_datas = todo_datas.map(v=>{
		   		   if(v.id == id) v.is_success = true;
		   		   return v;
		   });
	   }else{
		    res_datas = todo_datas.map(v=>{
		    		   if(v.id == id) v.is_success = false;
		    		   return v;
		    }); 
	   }
	   $(this).parent().parent().toggleClass("success");
	   localStorage.setItem("todo_list",JSON.stringify(res_datas));
	   render();
});

function is_success(){
	 var todo_success = 0;
	 var todo_fail = 0;
	 $(todo_datas).each(function(index,value){
		if(value.is_success){
			$(".check").eq(index).prop("checked",true);
			$(".check").eq(index).parent().parent().addClass("success");
			todo_success++;
		}else{
			todo_fail++;
			$(".check").eq(index).prop("checked",false);
			$(".check").eq(index).parent().parent().removeClass("success");
		}
	 });
	 $todo_success.html(todo_success);
	 $todo_fail.html(todo_fail);
	 $todo_numbers.html(todo_fail);
	 $todo_total.html(todo_datas.length);
}


//  添加数据
$todo_submit.on("click",function(){
		 var $todo_data = $todo_content.val();
		 if($todo_data.length <= 0){
		 		 $todo_tip.css("display","block");
		 		 $todo_content.addClass("todo_vaild").focus();
		 	 }else{
		 		  $todo_tip.css("display","none");
		 		  $todo_content.removeClass("todo_vaild");
		 			  // 开始添加
		 			  var d = new Date();
		 			  var data = {
		 			  			  id:d.getTime(),
		 			  			  is_success:false,
		 			  			  content:$todo_data,
		 			  			  first_add_time:d.toLocaleDateString(),
		 			  			  over_date:0,
								  out_time:d.toLocaleDateString()
		 			  };
		 		     todo_datas.push(data);
		 		     localStorage.setItem("todo_list",JSON.stringify(todo_datas));
		 		     render(todo_datas);
					 $todo_content.val("").focus();
		  }
});

// 清空数据

$todo_clear.click(function(){
	 todo_datas = localStorage.setItem("todo_list","[]");
	 render(todo_datas);
});

// 删除数据

$("#todo_list_content").on("click",".todo_del",function(){
	  var id = $(this).data("tid");
	  render(id);
});



