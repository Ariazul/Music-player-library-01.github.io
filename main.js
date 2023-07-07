let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "BadFlash2K",
     path: "1.mp3",
     img: "img1.jpg",
     singer: "Conceptual Cue, conformado por tres secciones de stems. Los stems se integran de dos capas instrumentales y por otro lado se mantiene una capa percusiva constante. Esta pieza responde a una dinámica de resecuenciación horizontal adaptativa en la cual se ejecuta una determinada sección musical en funcion de la dificultad y puntuación. El diseño de este cue se conceptualizó a partir de un nivel de juego de carreras."
   },
   {
     name: "GrassSite",
     path: "2.wav",
     img: "img2.jpg",
     singer: "Conceptual Cue, conformado por una única sección conformada por tres capas de stems, dos capas percusivas y una capa instrumental. Esta pieza responde a una dinámica de remezcla vertical adaptativa en la cual las capas musicales se añaden o se remueven a tempo en función de los eventos del juego en tiempo real a fin de añadir o apaciguar la tensión. El diseño fue conceptualizado para un nivel de juego de exploración."
   },
   {
     name: "Key Stinger",
     path: "3.wav",
     img: "img3.jpg",
     singer: "Stinger Collections, en el contexto del audio para videojuegos, un stinger es un término utilizado para describir un breve fragmento musical o sonoro que se reproduce en momentos específicos del juego para enfatizar una acción, evento o transición importante. El diseño del presente Key Stinger fue conceptualizado para un nivel de juego de aventura."
   },
   {
     name: "GreyYard-Ashborne",
     path: "4.mp3",
     img: "img4.jpg",
     singer: "Conceptual Slice Ashborne, Conformado por un conjunto de piezas diferentes que integran el OST del juego, GreyYard está conformado por única sección conformada por tres capas de stems, dos capas instrumentales y una capa percusiva. Además, a este slice se le añade un stinger de transición al inicio. Esta pieza responde a una dinámica de remezcla vertical adaptativa en la cual las capas musicales se añaden o se remueven a tempo en función de añadir o apaciguar la tensión en tiempo real. El diseño conjunto de piezas fue conceptualizado para el nivel de juego de misterio en el cual se incluye la dinámica de resecuenciación horizontal al cambiar el motivo musical en funcion del escenario."
   },
   {
     name: "HellsPark-Ashborne",
     path: "5.wav",
     img: "img5.jpg",
     singer: "Conceptual Slice Ashborne, Conformado por un conjunto de piezas diferentes que integran el OST del juego, GreyYard está conformado por única sección conformada por cuatro capas de stems, dos capas instrumentales y dos capas percusivas, esta pieza responde a una dinámica de remezcla vertical adaptativa en la cual las capas musicales se añaden o se remueven a tempo en función de añadir o apaciguar la tensión en tiempo real. El diseño conjunto de piezas fue conceptualizado para el nivel de juego de misterio en el cual se incluye la dinámica de resecuenciación horizontal al cambiar el motivo musical en funcion del escenario."
   }
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#148F77";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }