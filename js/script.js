window.onload = function(){
	//array with all of the blocks (divs with images)
	const img_block = document.getElementsByClassName("block");
	const img_pieces = [];
	for(let i=0; i<img_block.length; i++){
		img_pieces[i] = img_block[i].children;
	}

	var offsetX, offsetY, average, imgX, imgY, angX, angY;
	var followx = 0,
		followy = 0,
		x = 0,
		y = 0,
		friction = 1/50,
		velx = 0.05,
		vely = 0.00455;

	var lMouseX, lMouseY;

	const face_container = document.getElementsByClassName("face")[0];
	resizeIt();

	//sprite assets resize (scale up)
	function resizeIt(){
		let viewport = window.innerWidth;
		let scaleFactor = 1.25;

		if(viewport >= 1924){
			scaleFactor = 1.8;
		} else if(viewport <=1280){
			scaleFactor = 1;
		}
		document.getElementsByClassName("background")[0].style.transform = "scale("+scaleFactor+")";
		face_container.style.transform = "scale("+scaleFactor+")";
	}

	//not doing a thing
	function faceHeightAdjust(){
		const face_height = document.getElementById("block5").clientHeight + document.getElementById("block12").clientHeight + document.getElementById("block13").clientHeight;
		face_container.style.height = face_height + " !important";
	}

	//glasses light reflex div
	const gReflex = document.getElementsByClassName("song-name");
	const lensReflex = document.getElementById("block8");
	const glassReflex = document.getElementById("block18");

	//"about" field
	let tabopen = false;
	const infoWindow = document.getElementById("about-txt");
	const about_button = document.getElementById("abt");

	//toggle "about" text
	about_button.addEventListener("click", function(){
		if(!tabopen){
			about_button.setAttribute("src","youtube/assets/close.png");
		} else{
			this.setAttribute("src", "youtube/assets/info.png");
		}
		infoWindow.classList.toggle("visible");
		tabopen = !tabopen;
	});
	function moveIt(){
		x += (followx - x) * friction;
		y += (followy - y) * friction;
		
		for(let j=0; j<img_pieces.length; j++){
			//position of every div block (containing image piece)
			imgX = img_pieces[j][0].getBoundingClientRect().x;
			imgY = img_pieces[j][0].getBoundingClientRect().y;
		
		
			angX = offsetX * velx *imgX / (window.innerWidth/2) * Math.PI/2;
			angY = offsetY * vely *imgY / (window.innerHeight/2) * Math.PI/2;
		
			//all blocks
			img_pieces[j][0].style.transform = "translate("+(-angX*0.28+x)+"px, "+(angY*0.3+(-y))+"px)";
			
			//glass movement fix (hand, glass, glass light)
			document.getElementById("block16").children[0].style.transform = "translate("+(-angX*0.8+x)+"px, "+(angY*0.5+(-y))+"px)";
			document.getElementById("block15").children[0].style.transform = "translate("+(-angX*0.83+x)+"px, "+(angY*0.55+(-y))+"px)";
			document.getElementById("block18").children[0].style.transform = "translate("+(-angX*0.83+x)+"px, "+(angY*0.55+(-y))+"px)";

			//ponytail movement fix
			document.getElementById("block11").children[0].style.transform = "translate("+(-angX*0.55+x)+"px, "+(angY*0.05+(-y))+"px)";
		}

	
		//background element blocks
		//back buildings
		document.getElementById("b2").children[0].style.transform = "translate("+(angX*0.08+x)+"px, "+(-angY*0.0000054+y)+"px)";
	
		//buildings
		document.getElementById("b3").children[0].style.transform = "translate("+(angX*0.15+x)+"px, "+(-angY*0.000005+y)+"px)";

		//sky
		//document.getElementById("b1").style.transform = "translate("+(-angX*0.023+x)+"px, "+(-angY*0.252+y)+"px)";

		//left palm tree
		document.getElementById("b7").children[0].style.transform = "translate("+(-angX*0.25+x)+"px, "+(-angY*1.25+y)+"px) rotate(10deg)";

		//left palm tree2
		document.getElementById("b5").children[0].style.transform = "translate("+(-angX*0.025+x)+"px, "+(-angY*1.2+y)+"px) rotate(10deg)";
	
		//right palm tree
		document.getElementById("b6").children[0].style.transform = "translate("+(-angX*0.25+x)+"px, "+(-angY*1.25+y)+"px)";
	
		//top palm tree
		document.getElementById("b8").children[0].style.transform = "translate("+(-angX*0.3+x)+"px, "+(-angY*.8+y)+"px)";

		window.requestAnimationFrame(moveIt);
	}
	window.addEventListener("mousemove", function(e){
		offsetX = parseInt(e.pageX - window.innerWidth/2);
		offsetY = parseInt(e.pageY - window.innerHeight/2);
	
		lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
		lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));

		followx = (20 * lMouseX) / 100;
		followy = (10 * lMouseY) / 100;

		let reflex = 80 * ((offsetX/window.innerWidth)*(offsetY/window.innerHeight)/2 + 1.2);

		gReflex[0].style.opacity = reflex/120;
		lensReflex.style.opacity = reflex/120;
		lensReflex.style.filter = "brightness("+reflex+"%)";
		glassReflex.style.filter = "brightness("+reflex+"%)";
		glassReflex.style.opacity = "brightness("+reflex/100+")";
	});
	moveIt();

	window.addEventListener('resize', function(event) {
		resizeIt();
	}, true);

	document.getElementById("loadScreen").remove();
}