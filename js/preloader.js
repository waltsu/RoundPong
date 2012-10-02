function preloadImage(arrayOfImages) {
	$(arrayOfImages).each(function() {
		(new Image()).src = this;
	});
}

function preloadAudio(arrayOfAudio) {
	$(arrayOfAudio).each(function() {
		var audio = document.createElement("audio");
		audio.src = this;
	});
}

/* Usage
preloadImage([
	'kuva1.jpg',
	'kuva2.jpg',
	'kuva3.jpg'
]);

preloadAudio([
	'audio1.mp3',
	'audio2.mp3',
	'audio3.mp3'
]);

*/