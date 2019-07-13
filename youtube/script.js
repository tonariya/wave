console.clear();
var player,
	paused = false,
	stopped = true;
    time_update_interval = 0;
var videoData, currentTrack;

//control buttons img
var prevb = $("div#prev img");
var playb = $("div#play img");
var pauseb = $("div#pause img");
var stopb = $("div#stop img");
var nextb = $("div#next img");

var shufb = $("div.shuffle img");
var repb = $("div.replay img");

//each track index number (0-n)
var trackN = [];

//id associated with each youtube link
var trackId = [];
var trackInfo = ["Signal (f(x))",
"kzkzN6dFEX8",
"JUMP (SHINee)",
"h2YRIdPz-x8",
"Girl's Talk (LOONA)",
"D2N3ho2UDEA",
"Shinin' (JONGHYUN)",
"J41qe-TM1DY",
"View (SHINee)",
"UF53cptEE5k",
"Romance (SHINee)",
"MBz-yaAK4gk",
"SHIFT (SHINee)",
"6qU6UhPfvbU",
"Married To The Music (SHINee)",
"bcu7yZBeSKw",
"1 of 1 (SHINee)",
"WJua7KEP_oE",
"Um Oh Ah Yeh (MAMAMOO)",
"2atCp8rcYFQ",
"Sweet & Easy (Wonder Girls)",
"lEWYyCWd2Fg",
"Havana (IU)",
"7VacG7ySMM4",
"Zezé (IU)",
"I6c_Gjvruz8",
"Feel Good (SHINee)",
"pGfRL4ckTV0",
"Self Camera (MAMAMOO)",
"CzSaFaRIYB8",
"Girl Front (LOONA)",
"VEYo_buwcl0",
"Chocolate (SHINee)",
"Io34UDtp-3k",
"Sunny Side Up! (Red Velvet)",
"2QbenuWsG8o",
"Boogie On&On (Beenzino)",
"LWztCLIwcPw",
"Something Kinda Crazy (Red Velvet)",
"wqevb4r_9Oo",
"SELFISH (MoonByul Feat.Seulgi)",
"QG8bUKBT9FI",
"Aqua Man (Beenzino)",
"u4-ossqoTi0",
"Baton Touch (MAMAMOO)",
"Ouc0cqEipII",
"Beautiful Boy (Wonder Girls)",
"0mS1zPM9dhc",
"Shadow (f(x))",
"0mS1zPM9dhc",
"Kok Kok (Apink)",
"0mS1zPM9dhc",
"Jam Jam (IU)",
"KWjDSRdIFgc",
"Time To Love (Red Velvet)",
"mcWRglxZ2U0",
"Look (Red Velvet)",
"_ySMeIbXnVo",
"Something New (TAEYEON)",
"im1UUY8dQIk",
"My Hometown (MAMAMOO)",
"WJawlFRl3Mg",
"Words Don't Come Easy (MAMAMOO)",
"j6zNGc8uPxQ",
"Take It Slow (Red Velvet)",
"XOgjMJzY104",
"We Are Going To (Beenzino)",
"b_X5ccxrJg0",
"And July (Heize Feat.DEAN)",
"rCeM57e2BfU",
"Automatic (Red Velvet)",
"px2Q47O0_eE",
"4 Walls (f(x))",
"4j7Umwfx60Q",
"All Night (f(x))",
"z6UAEbsLEgQ",
"Bad Boy (Red Velvet)",
"1_0LRhtdUBo",
"TALK (Tiffany)",
"YVxsGNpuVo8",
"A train to chuncheon (TAEYEON & Yoon Jong Shin)",
"2zr0eOS_UKU",
"LADY (Yubin)",
"2MiQonPvlVM",
"Thank U Soooo Much (Yubin)",
"eiCDZYdPmys",
"All Night (Girls' Generation)",
"f4w8IbQTJpY",
"Lullaby (GOT7)",
"9RUeTYiJCyA",
"Look(A Starlight Night) (NU'EST)",
"rKNL7eME7JY",
"Black Pearl (SUNMI)",
"4SJAatu0ij8",
];
var trackName = [];
// flags id of excluded song
var flagged = [];
var flagIndex = 0;

// playlist Index of current song available to play 
var currentIndex = 0;

var shuffle = 0;
var replay = 0;
var loadScreen = $("#loadScreen");
$(document).ready( function(){
	done2 = true;
	if(done && done2){
		loadScreen.hide();
	}
});

//complete track name (displayed on the user interface - composed of trackN and trackName)
var trackTitle = [];
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        playerVars: {
            color: 'white',
            playlist: 'QG8bUKBT9FI',
			autoplay: 1,
			controls: 0
        },
        events: {
            onReady: initialize,
			onStateChange: onPlayerStateChange
        }
    });
}
//getPlaylistFile(); -- NOT IN USE (current playlist at top)
function initialize(){
	
	//UI fade
	$("div#playZone").css("opacity", "1");
	
	// Make video iframe hidden by default
	$("iframe#video-placeholder").css("opacity", "0");
	$("iframe#video-placeholder").css("z-index", "-100");
	$("iframe#video-placeholder").css("position", "absolute");
    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000);
	$('#volume-input').val(Math.round(player.getVolume()));
	$(".hide").css("visibility", "visible");
	
	trackId.length = trackN.length = trackTitle.length = player.getPlaylist().length;
	//Store playlists' video ids in 'trackId[]'
	var k=0;
	for(var i = 0; i<trackInfo.length; i++){
		/*trackN[i] = i+" - ";
		trackId[i] = player.getPlaylist()[i];
		
		trackTitle[i] = trackN[i] + " " + trackName[i];
		$(".track-list").append("<div id='"+trackId[i]+"' class= 'trackC' > <h4>"+ trackTitle[i] + "</h4></div>");
		*/
		trackN[k] = k+" - ";
		//returns text lines in odd numbers
		if(i%2 == 0){
			trackName[k] = trackInfo[i];
		}else{
			trackId[k] = trackInfo[i];
			trackTitle[k] = trackN[k] + " " + trackName[k];
			$(".track-list").append("<div id='"+trackId[k]+"' class= 'trackC' > <div class='flag'><p>x</p></div> <h4>"+ trackTitle[k] + "</h4></div>");
			k++;
			}
	}

	//set default volume to 50%
	$("#volume-input").val(50);
	player.setVolume(50);
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	//event.target.playVideo();
	cueByIndex();
}
// Imports tracklist file with name and ids (not being used)
// See track list var declaration up top
function getPlaylistFile(){
	$.get('youtube/assets/playlist.txt',{},function(content){
		let lines=content.split('\n');
		for(var k=0; k<lines.length;k++){
			trackInfo[k] = lines[k];
			if(k==lines.length-1){
				break;
			}
		}
	});
}

// Find and play selected track 
$(".track-list").on('click', "div.trackC h4", function(){
	var obj = $(this).parent();
	var id = $(this).parent().attr('id');
	var index = 0;
	if(!obj.hasClass("exclude")){
		player.cueVideoById(id);
		while(id != trackId[index]){
			player.nextVideo;
			index++;
		}
		currentIndex = index;
		player.playVideo();
	}
});

// Toggle "exclude" flag on clicked track
function flagTrack(track){
	if( track.hasClass("exclude") ){
		track.removeClass("exclude");
		
		//clear previously flagged track id in array flagTrack[] NOT IN USE
		/*for(var l=0; l<flagTrack.length; l++){
			if(flagTrack[l]==track.parent().attr("id")){
				flagTrack[l]=null;
				break;
			}
		}*/
	}else{
		track.addClass(" exclude");
		// index flagged song id
		/*PflagTrack[flagIndex] = track.parent().attr("id");
		flagIndex++;*/
	}
}

$(".track-list").on('click', "div.flag", function(){
	track = $(this).parent();
	flagTrack(track);
});

// check if currently-cued song is flagged
// return 1 if flagged, 0 if not
function flagCheck(track){
	var flagd = 0;
	$(".trackC").each(function(index, obj){
		if(track == $(this).attr("id") ){
			if($(this).is(".exclude") ){
				flagd = 1;
			}
		}
	});
	return flagd;
}
// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var loading = 1;
var loadErr = 0;
/* PLAYER STATE values for refference
BUFFERING: 3
CUED: 5
ENDED: 0
PAUSED: 2
PLAYING: 1
UNSTARTED: -1
*/
function onPlayerStateChange(event) {
	if (event.data == (YT.PlayerState.PLAYING || event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.STOPPED)){
		$(".mov-text").html(updateTrackName());

		if(event.data == YT.PlayerState.PLAYING){
			player.stopped = false;
			playb.attr("src", "youtube/assets/actv-play.png");

			pauseb.attr("src", "youtube/assets/pause.png");
			stopb.attr("src", "youtube/assets/stop.png");
		}
	}
	else if (event.data == YT.PlayerState.BUFFERING){
		loading = !loading;

		$(".mov-text").html("loading...");
		$(".mov-text").css("animation", "slideshow 12s linear infinite");
		
		//for moz & other browsers
		$(".mov-text").css("-moz-animation", "slideshow 12s linear infinite");
		$(".mov-text").css("-webkit-animation", "slideshow 12s linear infinite");
		
		loading = !loading;
	}
	//----------- 0 = ENDED  -------------------------------//
	else if (event.data == 0 && shuffle == 0 && replay == 0){
		while( flagCheck(trackId[currentIndex]) ){
			//currentIndex++;
		}
		currentIndex++;
		cueByIndex();
	}
	//----- 0 = ENDED  ----- shuffle = true   &&  replay = true ---------//
	else if (event.data == 0 && shuffle == 1 && replay == 0){
		shufb.attr("src", "youtube/assets/actv-shuffle.png");
		shuffleTracks();
		cueByIndex();
		console.log("shuffling...");
	}
	//----- 0 = ENDED  ----- replay = true ---------//
	else if (event.data == 0  && replay == 1){
		cueByIndex();
	}
	
	if(loading == loadErr){
		player.seekTo(0);
		$(".mov-text").html("Sorry, an error has ocurred while loading. Try refreshing the page.");
	}

	if(event.data === YT.PlayerState.PAUSED && !player.stopped){
		updateProgressBar();
		player.paused = true;

		pauseb.attr("src", "youtube/assets/actv-pause.png");

		stopb.attr("src", "youtube/assets/stop.png");
		playb.attr("src", "youtube/assets/play.png");
	}
	else if(event.data === YT.PlayerState.PAUSED && player.stopped){

		pauseb.attr("src", "youtube/assets/pause.png");
		playb.attr("src", "youtube/assets/play.png");
	}
	//if *not* PAUSED
	if(event.data != 2){
		player.paused = false;
	}
	
	$(".track-list h4").css("opacity", "0.5");
	$("#"+trackId[currentIndex]+" h4").css("opacity", "1");
	
	console.log(currentIndex);
}
// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}

function cueByIndex(){
	indexCheck();
	player.cueVideoById(trackId[currentIndex]);
	player.playVideo();
}

function shuffleTracks(){
	currentIndex = Math.floor((Math.random() * trackN.length));
}

function indexCheck(){
	//To assure the index variable (currentIndex) stays within boundaries 
	if(currentIndex < 0){
		currentIndex = trackN.length-1;
		while( flagCheck( trackId[currentIndex]) ){
			currentIndex--;
		}
	}
	if(currentIndex >= trackN.length ){
		currentIndex = 0;
		while( flagCheck( trackId[currentIndex]) ){
			currentIndex++;
		}
	}
}

// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}

//UPDATE & Display Current Track Name
function updateTrackName(){
	currentTrack = player.getVideoData().title;
	return currentTrack;
}

// Progress bar

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

//-----PLAYBACK CONTROLS
// Playback
$('#play').on('mouseup', function () {
	while( flagCheck(trackId[currentIndex]) ){
		currentIndex++;
	}
	if(player.paused){
		var resume = player.getCurrentTime();
		player.seekTo(resume);
		player.playVideo();
	} else{
		cueByIndex();
	}
});


$('#pause').on('mouseup', function () {
	stopb.attr("src", "youtube/assets/stop.png");
	pauseb.attr("src", "youtube/assets/actv-pause.png");
	player.pauseVideo();
	player.paused = true;
});

$('#stop').on('mouseup', function () {
	stopb.attr("src", "youtube/assets/actv-stop.png");
	pauseb.attr("src", "youtube/assets/pause.png");
	player.paused = false;
	player.stopped = true;
    player.pauseVideo();
	player.seekTo(0.0);
});

// Shuffle
$('.shuffle').on('mouseup', function () {
    shuffle = !shuffle;
	if(shuffle == 1){
		shufb.attr("src", "youtube/assets/actv-shuffle.png");
	} else{
		shufb.attr("src", "youtube/assets/shuffle.png");
	}
});

// Replay
$('.replay').on('mouseup', function () {
    replay = !replay;
	if(replay == 1){
		repb.attr("src", "youtube/assets/actv-replay.png");
		console.log("on");
	} else{
		repb.attr("src", "youtube/assets/replay.png");
		console.log("off");
	}
});

//Track hover (not working, being overriden by opacity 0.5 in state change)
/*$(".track-list").on('hover', "div.trackC h4", function(){
	$(this).css("opacity", "1");
});*/

//----------------------------------
// Sound volume
$('#mute-toggle img').on('mouseup', function() {
	var inputVal = $('#volume-input');
	var volume=50;
	var mute_toggle = $(this);
	
    if(player.isMuted()){
        player.unMute();
		mute_toggle.attr('src', "youtube/assets/no-mute.png");
		player.setVolume(volume);
		inputVal.val(volume);
    }
    else{
        player.mute();
		mute_toggle.attr('src', "youtube/assets/mute.png");
		player.setVolume(0);
		inputVal.val(0);
	}
});

$('#volume-input').on('change', function () {
	var volume = $(this).val();
	var mute_toggle = $('#mute-toggle img');
	player.setVolume(volume);
	this.value = volume;
	//visual bar check for mute/ no mute
	if(this.value<4){
		player.mute();
		mute_toggle.attr('src', "youtube/assets/mute.png");
	} else{
		player.unMute();
		mute_toggle.attr('src', "youtube/assets/no-mute.png");
	}
});
$("#volume-input").bind("mousewheel", function(event) {
	var volume;
	var mute_toggle = $('#mute-toggle img');
	if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    	// Scroll up
		
		volume = parseInt(this.value, 10) + 4;
		//bar visual update
		this.value = volume;
		//play volume change
		player.setVolume(volume);
	} else {
		//Scroll Down

		volume = parseInt(this.value, 10) - 4;
		//bar visual update
		this.value = volume;
		//play volume change
		player.setVolume(volume);
	}
	//visual bar check for mute/ no mute
	if(this.value<4){
		player.mute();
		mute_toggle.attr('src', "youtube/assets/mute.png");
	} else{
		player.unMute();
		mute_toggle.attr('src', "youtube/assets/no-mute.png");
	}
});

// Other options
$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist
$('#next').on('mouseup', function () {
	if(shuffle == 0){
		currentIndex++;
		while(flagCheck( trackId[currentIndex] ) ){
			currentIndex++;
		}
	} else{
		shuffleTracks();
		//to make sure the shuffled index (above) does not represent a flagged track
		while(flagCheck( trackId[currentIndex])==1 ){
			shuffleTracks();
		}
	}
	cueByIndex();
});

$('#prev').on('mouseup', function () {
	if(shuffle == 0){
		currentIndex--;
		while(flagCheck( trackId[currentIndex] ) ){
			currentIndex--;
		}
	}else{
		shuffleTracks();
		//to make sure the shuffled index (above) does not represent a flagged track
		while(flagCheck( trackId[currentIndex])==1 ){
			shuffleTracks();
		}
	}
	cueByIndex();
});

// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}