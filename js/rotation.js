var value = 0;
$(".refresh-image").rotate({ 
   bind: 
     { 
        click: function(){
            value +=720;
            $(this).rotate({
                animateTo:value,
                duration:2000
            });
        }
     } 
   
});​