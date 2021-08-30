//  添加任务

//  判断 早中晚 

var time = new Date().getHours();
var todo_time = $("#todo_time");

if(time > 5 && time < 12) todo_time.html("上午好,新的一天新的风景！").next().html("开启新一天的任务 做一个有规划的人 ！")
else if(time > 11 && time < 15) todo_time.html("中午好,记得睡个舒服的午觉！").next().html("祝您在梦里遇到开心的事 ！")
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
// 是否是第一次添加
if(!todo_datas){
	 localStorage.setItem("todo_list",JSON.stringify([]));
}
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
							 <input type="checkbox" />
						</td>
						<td>${v.content}</td>
						<td>${v.first_add_time}</td>
						<td>${v.over_date}</td>
						<td class="todo_del" data-tid="${v.id}" style="cursor:pointer;text-decoration:underline;">
							 删除
						</td>
					</tr>
				`);
		   });
	  }
	  
	  return todo_datas;
}

render();

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
		 			  			  first_add_time:d.toLocaleString(),
		 			  			  over_date:0
		 			  };
		 		     todo_datas.push(data);
		 		     localStorage.setItem("todo_list",JSON.stringify(todo_datas));
		 		     render(todo_datas);
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