
// Variables :
var color = "#000"; // Couleur du pinceau
var width_brush = 5; // Largeur du pinceau
var painting = false; // Suis-je en train de dessiner ?
var started = false; // Ai-je commencé à dessiner ?
var canvas, context, cursorX, cursorY; // Variables concernant le canvas définies plus tard

$(document).ready(function() {

	// -----------------------
	// Ajout du canvas :
	// -----------------------

	var largeur_canvas = $(window).width() - 20;
	var hauteur_canvas = $(window).height() - 180;

	$("body").prepend('<canvas id="canvas" width="' + largeur_canvas + '" height="' + hauteur_canvas + '"></canvas>');

	// -----------------------
	// Définition des variables :
	// -----------------------

	// Canvas :
	canvas = $("#canvas");
	context = canvas[0].getContext('2d');

	// Trait arrondi :
	context.lineJoin = 'round';
	context.lineCap = 'round';

	// Doigt enfoncé sur le canvas, je dessine :
	canvas.bind('touchstart', function(e) {
		moveStart(e, true);
	});

	// Relachement du doigt sur tout le document, j'arrête de dessiner :
	$(this).bind('touchend', function() {
		moveEnd();
	});

	// Mouvement du doigt sur le canvas :
	canvas.bind('touchmove', function(e) {
		move(e, true, this);
	});

	// Click souris enfoncé sur le canvas, je dessine :
	canvas.mousedown(function(e) {
		moveStart(e, false);
	});

	// Relachement du Click sur tout le document, j'arrête de dessiner :
	$(this).mouseup(function() {
		moveEnd();
	});

	// Mouvement de la souris sur le canvas :
	canvas.mousemove(function(e) {
		move(e, false, this);
	});



	// Pour chaque carré de couleur :
	$("#couleurs a").each(function() {
		// Je lui attribut une couleur de fond :
		$(this).css("background", $(this).attr("data-couleur"));

		// Et au click :
		$(this).click(function() {
			// Je change la couleur du pinceau :
			color = $(this).attr("data-couleur");

			// Et les classes CSS :
			$("#couleurs a").removeAttr("class", "");
			$(this).attr("class", "actif");

			return false;
		});
	});

	// Largeur du pinceau :
	$("#largeurs_pinceau input").change(function() {
		if (!isNaN($(this).val())) {
			width_brush = $(this).val();
			$("#output").html($(this).val() + " pixels");
		}
	});

});



// Fonction qui dessine une ligne :
function drawLine() {
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
			var ev = e.originalEvent;
			e.preventDefault();

			// Set Coordonnées du doigt :
			// cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
			// cursorY = (ev.pageY - obj.offsetTop);
			cursorX = (ev.targetTouches[0].pageX - obj.offsetLeft); // 10 = décalage du curseur
			cursorY = (ev.targetTouches[0].pageY - obj.offsetTop);
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
		var ev = e.originalEvent;
		e.preventDefault();

		// Set Coordonnées du doigt :
		cursorX = (ev.pageX - obj.offsetLeft); // 10 = décalage du curseur
		cursorY = (ev.pageY - obj.offsetTop);
	}
	else {
		// Set Coordonnées de la souris :
		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
	}
}
