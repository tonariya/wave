console.clear();
//array with all of the blocks (divs with images)
var img_pieces = $(".block img").toArray();
var offsetX, offsetY, average, imgX, imgY, angX, angY;
var followx = 0,
	followy = 0,
	x = 0,
	y = 0,
	friction = 1/50,
	velx = 0.05,
	vely = 0.00455;

var lMouseX, lMouseY;

//glasses light reflex div
var gReflex = $("div.song-name");
var lensReflex = $("div#block8");
var glassReflex = $("div#block18");

var tabopen = false;
var infoWindow = $("div#about-txt");
$("#abt").on("click", function(){
	if( !tabopen ){
		$("#abt").attr("src", "youtube/assets/close.png");
	} else{
		$("div#aditional-info img").attr("src", "youtube/assets/info.png");
	}
	infoWindow.toggle( "drop", {
		direction: "up"
	},200), function(){
		this.toggleClass("window");
	};
	tabopen = !tabopen;
});

var ready = false;

while(false){
	location.reload();
}

$(document).ready( function(){
	ready = true;
});


function moveIt(){
	x += (followx - x) * friction;
	y += (followy - y) * friction;
	
	for(var i = 1; i<img_pieces.length+1; i++){
		//position of every div block i (containing image piece)
		imgX = img_pieces[i-1].getBoundingClientRect().left;
		imgY = img_pieces[i-1].getBoundingClientRect().top;
		
		
		angX = offsetX * velx *imgX / (window.innerWidth/2) * Math.PI/2;
		angY = offsetY * vely *imgY / (window.innerHeight/2) * Math.PI/2;
		
		//girl blocks
		$("#block"+i).css({"-webkit-transform":"translate("+(-angX*0.28+x)+"px, "+(angY*0.3+(-y))+"px)"});
		
		//shade <circle>
		$("#block7 ellipse").css({"-webkit-transform":"translate("+(-angX*0.4+x)+"px, "+(angY*0.3+(-y))+"px)"});
		
		//hand glass & glass light movement fix
		$("#block15").css({"-webkit-transform":"translate("+(-angX*0.002+x)+"px, "+(angY*0.05+(-y))+"px)"});
		$("#block18").css({"-webkit-transform":"translate("+(-angX*0.002+x)+"px, "+(angY*0.05+(-y))+"px)"});
		
		//glass movement fix
		$("#block16").css({"-webkit-transform":"translate("+(-angX*0.0024+x)+"px, "+(angY*0.05+(-y))+"px)"});

		//face (whole) movement fix
		$("#block5").css({"-webkit-transform":"translate("+(-angX*0.48+x)+"px, "+(angY*0.2+(-y))+"px)"});

		//ponytail movement fix
		$("#block11").css({"-webkit-transform":"translate("+(-angX*0.48+x)+"px, "+(angY*0.05+(-y))+"px)"});

	}
	
	//girl container div
	$(".container").css({"perspective":(imgX+imgY)+"px", "-webkit-transform": "rotateX("+angY*0.2+"deg) rotateY("+angX*0.05+"deg)"});
	
	//background element blocks
	//back buildings
	$("#b2").css({"-webkit-transform":"translate("+(-angX*0.08+x)+"px, "+(-angY*0.281+y)+"px)"});
	
	//buildings
	$("#b3").css({"-webkit-transform":"translate("+(-angX*0.15+x)+"px, "+(-angY*0.852+y)+"px)"});
	
	//parasol and car (not in view)
	//$("#b4").css({"-webkit-transform":"translate("+(angX*0.02-x)+"px, "+(-angY*0.02+y)+"px)"});

	//sky
	$("#b1").css({"-webkit-transform":"translate("+(-angX*0.023+x)+"px, "+(-angY*0.252+y)+"px)"});

	//left palm tree
	$("#b7").css({"-webkit-transform":"translate("+(-angX*0.425+x)+"px, "+(-angY*1.56+y)+"px)"});

	//left palm tree2
	$("#b5").css({"-webkit-transform":"translate("+(-angX*0.25+x)+"px, "+(-angY*1.22+y)+"px)"});
	
	//right palm tree
	$("#b6").css({"-webkit-transform":"translate("+(-angX*0.3+x)+"px, "+(-angY*1.252+y)+"px)"});
	
	//right palm tree2
	$("#b8").css({"-webkit-transform":"translate("+(-angX*0.8+x)+"px, "+(-angY*2.505+y)+"px)"});


	////----perspective transform on left and right palm tree
	/*$("#b7").css({"perspective":(imgX+imgY)+"px", "-webkit-transform": "rotateX("+angY*0.2+"deg) rotateY("+0.02+"deg)"});
	$("#b6").css({"perspective":(imgX+imgY)+"px", "-webkit-transform": "rotateX("+angY*0.2+"deg) rotateY("+0.02+"deg)"});
	*/
	//background container div
	$(".container2").css({"perspective":(imgX+imgY)+"px", "-webkit-transform": "rotateX("+angY*0.02+"deg) rotateY("+angX*0.01+"deg)"});
	
	window.requestAnimationFrame(moveIt);
}

$("body").append("<div id='why'> <h1>why would you do this</h1> </div>");
$("#why").append("<h1>you must go back.<h1>");

$(window).on( "mousemove click", function( e ) {
	/*x = -(window.innerWidth/2) - e.pageX/2;
	y = -(window.innerHeight/2) - e.pageY/2;
	
	//$block1 offset
	x1 = x*0.05;
	y1 = y*0.15;
	
	//$block2 offse
	x2 = x*0.01;
	y2 = y*0.05;*/
	
	//general offset / places point O(0,0) at the center of the screen
	offsetX = parseInt(e.pageX - window.innerWidth/2);
	offsetY = parseInt(e.pageY - window.innerHeight/2);
		
	lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  	lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
	
	followx = (20 * lMouseX) / 100;
	followy = (10 * lMouseY) / 100;
	
	var reflex = 80 * ((offsetX/window.innerWidth)*(offsetY/window.innerHeight)/2 + 1.2);

	gReflex.css("opacity", reflex + 0.8);
	lensReflex.css("opacity", reflex + 0.8);
	lensReflex.css("-webkit-filter", "brightness("+reflex+"%)");
	glassReflex.css("-webkit-filter", "brightness("+reflex+"%)");
	glassReflex.css("opacity", "brightness("+reflex/100+")");
	//---------------------------------------------------------------------//
	/* Deprecated junk - meant for initial testing (I like to hoard)	
	$(".container2").css({"perspective":(imgX+imgY)+"px", "-webkit-transform": "rotateX("+angY+"deg) rotateY("+angX+"deg)"});
		
	console.log((angX+" , "+ angY));
	var y = -e.pageY * 60 / window.innerHeight;
	$("#block1").css({"-webkit-transform":"translate(" + x + "px," + y + "px)"});
	$("#block2").css({"-webkit-transform":"translate(" + x + "px," + y + "px)"});
	$("#block3").css({"-webkit-transform":"translate(" + x + "px," + y + "px)"});
	$("#block1").css({"-webkit-transform":"translate("+x1+"px, "+y1+"px)"});
	$("#block2").css({"-webkit-transform":"translate("+x2+"px, "+y2+"px)"});*///
});

moveIt();


//img Block Resize
var scaleFactor = 1.4; //face blocks must be adjustes acoordingly for every different value
$.each($(".container .face .block img"), function(){
	var originalSize = this.clientWidth;
	var obj = $(this);
	
	obj.css("width", originalSize*scaleFactor);
});

$.each($(".container2 .backg img"), function(){
	var originalSize = this.clientWidth;
	var obj = $(this);

	if(obj.attr("id") == "sky"){
		obj.height(this.clientHeight*scaleFactor);
	} else{
		obj.width(originalSize*scaleFactor);
	}
});