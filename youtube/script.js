console.clear();
console.log(
	"██╗  ██╗███████╗██╗   ██╗██╗"+"\n"+
	"██║  ██║██╔════╝╚██╗ ██╔╝██║"+"\n"+
	"███████║█████╗   ╚████╔╝ ██║"+"\n"+
	"██╔══██║██╔══╝    ╚██╔╝  ╚═╝"+"\n"+
	"██║  ██║███████╗   ██║   ██╗"+"\n"+
	"╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝");
console.log(
	"You're not supposed to be here!\n But since you are, check out one of my favorite Simpsons moment of all time:\n https://www.youtube.com/watch?v=P0jw_AFEGoI");

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
"FqR1bNjFyyw",
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
"Um Oh Ah Yeh (MAMAMOO)",
"2atCp8rcYFQ",
"Sweet & Easy (Wonder Girls)",
"lEWYyCWd2Fg",
"Havana (IU)",
"7VacG7ySMM4",
"Zezé (IU)",
"I6c_Gjvruz8",
"Feel Good (SHINee)",
"7BgHzuEZc0M",
"Self Camera (MAMAMOO)",
"CzSaFaRIYB8",
"Girl Front (LOONA)",
"kqoZTnnjyPo",
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
"arzbGNJCWOU",
"Shadow (f(x))",
"HPQQvJUJf0Q",
"Kok Kok (Apink)",
"5Y79hAmuq7c",
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
"ckQLgENOChI",
"Take It Slow (Red Velvet)",
"XOgjMJzY104",
"We Are Going To (Beenzino)",
"wzyS9TiUe3I",
"And July (Heize Feat.DEAN)",
"oWE4Vk9oIDY",
"Automatic (Red Velvet)",
"RVUv6Hw3WsE",
"4 Walls (f(x))",
"4j7Umwfx60Q",
"All Night (f(x))",
"wYiOuz04kkA",
"Bad Boy (Red Velvet)",
"zy1xWmqqpKA",
"TALK (Tiffany)",
"JdN-Oa-Rd0M",
"A train to chuncheon (TAEYEON & Yoon Jong Shin)",
"HmxmLUHrWbY",
"LADY (Yubin)",
"2MiQonPvlVM",
"Thank U Soooo Much (Yubin)",
"eiCDZYdPmys",
"Lullaby (GOT7)",
"9RUeTYiJCyA",
"Look(A Starlight Night) (NU'EST)",
"rKNL7eME7JY",
"Black Pearl (SUNMI)",
"Vbh3JPR5jaI",
];
var trackName = [];
// flags id of excluded song
var flagged = [];
var flagIndex = 0;

// playlist Index of current song available to play 
var currentIndex = 0;

var shuffle = 0;
var replay = 0;

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
            onReady: onPlayerReady,
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
	initialize();
	cueByIndex();
}

// Find and play selected track 
$(".track-list").on('click', "div.trackC h4", function(){
	var obj = $(this).parent();
	var id = $(this).parent().attr('id');
	var index = 0;
	if(!obj.hasClass("exclude")){
		player.loadVideoById(id, 0);
		while(id != trackId[index]){
			player.nextVideo;
			index++;
		}
		currentIndex = index;
		currentTrack = trackName[currentIndex];
		player.playVideo();
	}
});

// Toggle "exclude" flag on clicked track
function flagTrack(track){
	if( track.hasClass("exclude") ){
		track.removeClass("exclude");

	}else{
		track.addClass(" exclude");
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
	currentTrack = trackName[currentIndex];
	$(".mov-text").html(currentTrack);
	
	if (event.data == (YT.PlayerState.PLAYING || event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.STOPPED)){

		nextb.attr('src', "youtube/assets/next.png");
		prevb.attr('src', "youtube/assets/back.png");

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
		loading = !loading;
	}
	//----------- 0 = ENDED  -------------------------------//
	else if (event.data == 0 && shuffle == 0 && replay == 0){
		while( flagCheck(trackId[currentIndex]) ){
			currentIndex++;
		}
		currentIndex++;
		cueByIndex();
	}
	//----- 0 = ENDED  ----- shuffle = true   &&  replay = true ---------//
	else if (event.data == 0 && shuffle == 1 && replay == 1){
		shufb.attr("src", "youtube/assets/actv-shuffle.png");
		shuffleTracks();
		cueByIndex();
		//console.log("shuffling...");
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
	if(event.data == -1 || event.data == 0){
		$('#progress-bar').val(0);
		$(".mov-text").html("BRR--Jambot set and ready!");
	}

	//console.log("this: "+event.data);
	$(".track-list h4").css("opacity", "0.5");
	$("#"+trackId[currentIndex]+" h4").css("opacity", "1");
}
// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}

function cueByIndex(){
	indexCheck();
	player.loadVideoById(trackId[currentIndex].toString(), 0);
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

// Progress bar
$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);
	player.playVideo();

});

//-----PLAYBACK CONTROLS
// Playback
$('#play').on('mouseup', function () {
	while( flagCheck(trackId[currentIndex]) ){
		currentIndex++;
	}
	if(player.paused){
		let resume = player.getCurrentTime();
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
	player.seekTo(0.0);
	player.pauseVideo();
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
	} else{
		repb.attr("src", "youtube/assets/replay.png");
	}
});

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
	nextb.attr('src', "youtube/assets/actv-next.png");
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
	prevb.attr('src', "youtube/assets/actv-back.png");
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