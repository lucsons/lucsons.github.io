var $contextmenu = $("#contextmenu");
$(document).on("contextmenu",function(e){
	      $contextmenu.css({display:"block",left:e.pageX + "px",top:e.pageY + "px"});
		  return false;
});

$(document).on("click",function(e){
	    $contextmenu.css("display","none");
});


$("#u_copy").click(function(){
	document.execCommand("copy");
});