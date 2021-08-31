var $form = $(document.forms["test"]);
var $title = $("#title");
var $test = $(".test");

var datas_type = {
	"windows":"./datas/windows.json",
	"html4-1":"./datas/html4-1.json",
	"html4-2":"./datas/html4-2.json",
	"html4-3":"./datas/html4-3.json",
	"markdown":"./datas/markdown.json",
	"css-1":"./datas/css-1.json",
	"css-2":"./datas/css-2.json",
	"css-3":"./datas/css-3.json",
	"css-4":"./datas/css-4.json",
	"xml":"./datas/xml.json",
	"dtd":"./datas/dtd.json",
	"xpath":"./datas/xpath.json",
	"js-1":"./datas/js-1.json",
	"js-2":"./datas/js-2.json",
	"js-3":"./datas/js-3.json"
}

var isFlag = false;
var $res = null;
var total = 0;
var prevType = null;
var type = null;
$test.click(function(){
	prevType = type;
	type = $(this).data("type");
	if(!isFlag){
		isFlag = true;
		render();
	}else{
		if(confirm("已经选择了"+prevType+"的测试题，确定要更换吗？")){
			 $("#error").html();
			render();
		}else{
			type = prevType;
		}
	}
	
	function render(){
		$.ajax({
			url:"./static/js/datas/"+type+".json",
			success:function(res){
				total = res.length;
				$title.html(type + " 测试，共" + total  + "题");
				$res = res;
				$($form).find("ol").empty();
				$(res).each(function(i,v){
					$($form).find("ol").append(`
					<li>
						${v.title}
						<br>
						<label>
							<input type="radio" name="${v.name}" value="1" class="cs"> 
							${v.item.a}
						</label>
						<label >
							<input type="radio" name="${v.name}" value="2" class="cs"> 
							${v.item.b}
						</label>
						<label >
							<input type="radio"  name="${v.name}"  value="3" class="cs"> 
							${v.item.c}
						</label>
					</li>
					`);
				});
			}
		});
	}
});



var error = [];

$form.submit(function(){
	if(isFlag){
		var sub_data = $($(this).serializeArray());
		if(total == sub_data.length){
			if(confirm("你确定要提交吗,查看结果吗？")){
				 sub_data.each(function(index,value){
					  if(value.value != $res[index].success){
						  error.push(index+1);
					  }
				 });
				 if(error.length > 0){
					 $("#error").html("您的错题：" +  error.join(","));
					 error = [];
				 }else{
					  $("#error").html("恭喜您全对啦!");
				 }
			}
		}else{
			alert("请做完题目");
		}
	}else{
		alert("请选择对应的测试项目并做完题目，在交卷")
	}
});
