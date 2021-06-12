let pages = document.querySelectorAll(".page");
let nextPageBtn = document.querySelector(".fas");
let currPage = 0;

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.playCat');
track.connect(audioCtx.destination);
playButton.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	console.log(this.dataset.playing);
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);

// if track ends
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

nextPageBtn.addEventListener("click", function () {
    for(let i=0; i<pages.length; i++) {
        if(i==(currPage+1)%pages.length) {
            pages[i].style.display = "block";
        }
        else {
            pages[i].style.display = "none";
        }
    }
    currPage = (currPage+1)%pages.length;
})