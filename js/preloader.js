function preloadImage(arrayOfImages) {
	$(arrayOfImages).each(function() {
		(new Image()).src = this;
	});
}

/* Usage
preloadImage([
	'kuva1.jpg',
	'kuva2.jpg',
	'kuva3.jpg'
]);

*/