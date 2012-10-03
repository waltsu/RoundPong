function preload(ArrayOfFiles) {
	$(ArrayOfFiles).each(function() {
		$.ajax({
        	url: this,
        	success: function() {
        		/* Here something to do when loading is complete */
            	//console.log("done loading " + this);
        	}
    	});
	});
}


/* Usage of preloader

preload([
	'image.jpg',
	'audio.mp3',
	'video.avi'
]);

*/