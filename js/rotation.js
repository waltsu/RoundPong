$(".refresh-image").click(function(){
	var value = 0;
	//console.log("rotate clicked");
	value +=720;
	$(this).rotate({
		animateTo: value,
		duration: 2000
	});
});