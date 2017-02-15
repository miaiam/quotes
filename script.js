var scroll = true;
var sections = $("section");
var menu = $("li");
var countElements = sections.length;	
var curElement = 0;
var before = countElements - 1;

function upscroll(){
  	$(menu[curElement]).addClass("active");
  	$(menu[before]).removeClass("active");

  	$(sections[curElement]).css("display", "block");
  	$(sections[curElement]).css("top", "0%");
  	$(sections[before]).css("z-index", "1");

  	$(sections[before]).animate({top: '-100%'}, 1000,function(){
  		$(sections[before]).css("display", "none");
  		$(sections[before]).css("z-index", "0");
  		scroll = true;
	}); 
}

function downscroll(){
  	$(menu[curElement]).addClass("active");
  	$(menu[before]).removeClass("active");

  	$(sections[curElement]).css("display", "block");
  	$(sections[curElement]).css("z-index", "1");
  	$(sections[before]).css("z-index", "0");
  	$(sections[curElement]).animate({top: '0%'}, 1000,function(){
  		$(sections[before]).css("display", "none");
  		$(sections[before]).css("top", "-100%");
  		scroll = true;
	}); 
}

$(document).ready(function(){
	$(menu).click(function(){
		var beforeIndex = $(".active").index();
		$("li").removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		curElement = index;
		before = beforeIndex;
		if(beforeIndex < index){
			downscroll();
		}
		else if(beforeIndex == 3 && index == 0){
			downscroll();
		}
		else if(beforeIndex == index){

		}
		else{
			upscroll();
		}
	});
	
	$(window).bind('mousewheel DOMMouseScroll', function(event){
	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	    	if(scroll == true){
				scroll = false;
		    	if(curElement <= 0){
		    		curElement = countElements - 1;
		    		before = 0;
		    	}
		    	else{
		    		curElement--;	
		    		before = curElement + 1;
		      	}
		    	upscroll();
		    }
	    }
	    else {
	    	if(scroll == true){
				scroll = false;   
		    	if(curElement >= (countElements - 1)){
		    		curElement = 0;
		    		before = countElements - 1;
		    	}
		    	else{
		    		curElement++;	
		    		before = curElement - 1;
		      	}
		    	downscroll();
		    }
	    }
	});
	$("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $(".quote").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
    });
});