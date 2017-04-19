
// Variables :
var color = "#000"; // Couleur du pinceau
var width_brush = 5; // Largeur du pinceau
var painting = false; // Suis-je en train de dessiner ?
var started = false; // Ai-je commencé à dessiner ?
var canvas, context, cursorX, cursorY; // Variables concernant le canvas définies plus tard



function init(){
	// -----------------------
	// Ajout du canvas :
	// -----------------------

	var largeur_canvas = window.innerWidth - 20;
	var hauteur_canvas = window.innerHeight - 180;


	// -----------------------
	// Définition des variables :
	// -----------------------

	// Canvas :
	var canvas = getCanvas();
	var context = getContext();

	// Trait arrondi :
	context.lineJoin = 'round';
	context.lineCap = 'round';



	// Doigt enfoncé sur le canvas, je dessine :
	canvas.addEventListener('touchstart', function(e){
		moveStart(e, true);
	}, false);

	// Relachement du doigt sur tout le document, j'arrête de dessiner :
	canvas.addEventListener('touchend', function(){
		moveEnd();
	});

	// Mouvement du doigt sur le canvas :
	canvas.addEventListener('touchmove', function(e) {
		move(e, true, this);
	});

	// Click souris enfoncé sur le canvas, je dessine :
	canvas.addEventListener('mousedown', function(e) {
		moveStart(e, false);
	});

	// Relachement du Click sur tout le document, j'arrête de dessiner :
	canvas.addEventListener('mouseup', function() {
		moveEnd();
	});

	// Mouvement de la souris sur le canvas :
	canvas.addEventListener('mousemove', function(e) {
		move(e, false, this);
	});




};

window.init = init();




function getContext(){
  return getCanvas().getContext('2d');
}
function getCanvas(){
    return document.getElementById("signature");
}



// Fonction qui dessine une ligne :
function drawLine() {
	var canvas = getCanvas();
	var context = getContext();
	// Si c'est le début, j'initialise
	if (!started) {
		// Je place mon curseur pour la première fois :
		context.beginPath();
		context.moveTo(cursorX, cursorY);
		started = true;
	}
	// Sinon je dessine
	else {
		context.lineTo(cursorX, cursorY);
		context.strokeStyle = color;
		context.lineWidth = width_brush;
		context.stroke();
	}
}

// Clear du Canvas :
function clear_canvas() {
	context.clearRect(0,0, canvas.width(), canvas.height());
}

// -----------------------
// Fonctions Event :
// -----------------------

// Fonction de mouvement :
function move(e, mobile, obj) {
	// Si je suis en train de dessiner (click souris enfoncé) :
	if (painting) {
		if (mobile) {
			// Event mobile :
			e.preventDefault();
			// Set Coordonnées du doigt :
			// cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
			// cursorY = (ev.pageY - obj.offsetTop);

			cursorX = (e.targetTouches[0].screenX - obj.offsetLeft); // 10 = décalage du curseur
			cursorY = (e.targetTouches[0].screenY - obj.offsetTop);
		}
		else {
			// Set Coordonnées de la souris :
			cursorX = (e.pageX - obj.offsetLeft); // 10 = décalage du curseur
			cursorY = (e.pageY - obj.offsetTop);
		}

		// Dessine une ligne :
		drawLine();
	}
}

// Fonction fin de mouvement :
function moveEnd() {
	painting = false;
	started = false;
}

//  Fonction début de mouvement :
function moveStart(e, mobile) {
	painting = true;

	// Coordonnées de la souris :
	if (mobile) {
		// Event mobile :
		e.preventDefault();

		// Set Coordonnées du doigt :
		cursorX = (e.targetTouches[0].screenX - this.offsetLeft); // 10 = décalage du curseur
		cursorY = (e.targetTouches[0].screenY - this.offsetTop);
	}
	else {
		// Set Coordonnées de la souris :
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
	}
}
