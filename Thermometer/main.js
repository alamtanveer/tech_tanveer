
for(var i=0; i<11; i++){
	$('.thermoLine').append('<div class="verticalLine"></div>');
	var leftMarg=Math.floor(53/5);
	for (var j = 0; j < 5; j++) {
			if (i<=9){		
			$($('.verticalLine')[i]).append('<div class="childLine" style="left:'+leftMarg+'px"></div>');
			leftMarg +=10;
			}
	}
};

/*Handle through keyboard up/down arrow*/
function keyHandle(event){
	document.addEventListener('keydown', function(event){
		console.log(event.keyCode);
		if (event.keyCode==38){
			keyupScrollUp();
		}
		else if (event.keyCode==40){
			keydownScrollDown();			
		}
	
	})
};
keyHandle();

/*Handle through mouse wheel*/
function mouseWheel(event){
	$(document).ready(function(){
    $(document).bind('mousewheel DOMMouseScroll', function(e){
		 if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	        if (e.originalEvent.detail > 0) {
	            //scroll down
	            delta = 0.2;
	             keydownScrollDown();
	        } else {
	            //scroll up
	            delta = 0;
	            keyupScrollUp();
	        }
	    }else{    	
	        if(e.originalEvent.wheelDelta /120 > 0) {
	            keydownScrollDown();
	        }
	        else{
	           keyupScrollUp();
	        }
	    }
    });
	});
}
mouseWheel();

function keydownScrollDown(){
	if(document.getElementsByClassName('pointer')[0].style.left==""){
		return;
	}
	else{
		var par=document.getElementsByClassName('pointer')[0].style.left;	
		if (par !=="0%"){				
			var tot=parseInt(par.split('%')[0]) - 1 ;
			if (tot===""){
				return;
			}
			else{
				document.getElementsByClassName('pointer')[0].style.left=(tot) +"%";
				document.getElementsByClassName('marker')[0].style.width =  tot+"%";					
			}
		}
	}
};

function keyupScrollUp(){
	if(document.getElementsByClassName('pointer')[0].style.left==""){
		document.getElementsByClassName('pointer')[0].style.left = "1%";
		document.getElementsByClassName('marker')[0].style.width = "1%";
	}
	else{
		var par=document.getElementsByClassName('pointer')[0].style.left;					
		var tot=parseInt(par.split('%')[0]) + 1;
		if (tot <=100){						
			document.getElementsByClassName('pointer')[0].style.left=tot +"%";
			document.getElementsByClassName('marker')[0].style.width = (tot) +"%";
		}
		else{
			return;
		}
	}
};