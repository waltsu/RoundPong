var value = 0;
$(".refresh-image").click(function(){
	value +=720;
	$(this).rotate({
		animateTo: value,
		duration: 2000
	});
});