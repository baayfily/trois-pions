$(document).ready(function() {

	

	/* *******************
		VARIABLES 
	******************* */

	var winner;

	// Combinaisons gagnantes
	var wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];

	// Variables du tableau de scores
	var gameNumber = 1;
	var Xwins = 0;
	var Owins = 0;





	/* *******************
		FONCTIONS
	******************* */



	/* Recommence le jeu */

	function clearBoard() {
		$('.carre').removeClass('Xjoues');
		$('.carre').removeClass('Ojoues');
		$('.carre').removeClass('joues');

		$('.carre').data("joues", false);
		$('.carre').data("joueur", "");
	}
	$('.boutton-reset').click(function() {
		clearBoard();
	})


	
	/* Vérifies si la case a déjà été jouée */

	function checkIfcarreFree(carreNumber) {
		if ( $('.carre[data-carre="'+carreNumber+'"]').data("joues") === true ) {
			return false; // la case n'est pas libre
		} else {
			return true; // la case est libre
		}
	}



	/* Gestion du tableau des victoires */

	function addWinToTable() {

		if (winner === 'X') {
			Xwins++ 

			// Ajoute une nouvelle ligne au tableau
			$('.scores tbody').append('<tr><td>'+gameNumber+'</td><td>Gagné</td><td>Perdu</td></tr>');
		} else {
			Owins++ 

			// Ajoute une nouvelle ligne au tableau
			$('.scores tbody').append('<tr><td>'+gameNumber+'</td><td>Perdu</td><td>Gagné</td></tr>');
		}

		// Mets à jour le nombre total de victoire
		$('.x-gagne').html(Xwins);
		$('.o-gagne').html(Owins);

		gameNumber++;
	}



	/* Vérifie si une combinaison gagnante a été jouée */

	function registerWin(x, y, z) {

		if ( 

			// Les trois carrés gagnants ont été joués
			$('.carre[data-carre="'+x+'"]').data("joues") === true &&
			$('.carre[data-carre="'+y+'"]').data("joues") === true &&
			$('.carre[data-carre="'+z+'"]').data("joues") === true

			&&

			// Les trois carrés gagnants ont été joués par le même joueur
			$('.carre[data-carre="'+x+'"]').data("joueur") === $('.carre[data-carre="'+y+'"]').data("joueur") 
			&& $('.carre[data-carre="'+x+'"]').data("joueur") === $('.carre[data-carre="'+z+'"]').data("joueur") ) 

		{

			winner = $('.carre[data-carre="'+x+'"]').data("joueur");
			return true;

		} else {
			return false;
		}	

	} // fin de la fonction registerWin


	/* Vérifie s'il y a match nul */ 

	function checkDraw() {

		if ( $('.carre.joues').length === 9 ) {
			alert("Match nul! Réessayez");
			clearBoard();
		}

	}


	/* Vérifie s'il y a une victoire */

	function checkWin() {

		// Fait une boucle pour vérifier si on a une combinaison gagnante
		for (i = 0; i < wins.length; i++) {
			
			var w = registerWin(wins[i][0], wins[i][1], wins[i][2]);

			if (w) {
				
				alert(winner+ " gagne!");
				addWinToTable();
				clearBoard();
			}

			if ( !w && i === (wins.length - 1) ) {
				checkDraw();
			}
		} // fin de la boucle
	} // fin de la fonction checkWin




	/* *******************
		JEU de O
	******************* */

	/* Fonction qui permet de vérifier si une des 3 cases gagnantes ont été jouées par le même joueur */

	function checkTacticalPlay(x, y, z) {

		// x et y joués
		if ( 
			// 2 des 3 cases gagnantes
			$('.carre[data-carre="'+x+'"]').data("joues") === true &&
			$('.carre[data-carre="'+y+'"]').data("joues") === true

			&&

			// Les deux cases ont été jouées par le même joueur
			$('.carre[data-carre="'+x+'"]').data("joueur") === $('.carre[data-carre="'+y+'"]').data("joueur")
			) {

			// RRetourne la case restante
			return z;
		} 

		// x et z joués
		else if ( 
			$('.carre[data-carre="'+x+'"]').data("joues") === true &&
			$('.carre[data-carre="'+z+'"]').data("joues") === true
			&&
			$('.carre[data-carre="'+x+'"]').data("joueur") === $('.carre[data-carre="'+z+'"]').data("joueur")
			) {
			return y;
		}

		// z et y joués
		else if ( 
			$('.carre[data-carre="'+z+'"]').data("joues") === true &&
			$('.carre[data-carre="'+y+'"]').data("joues") === true
			&&
			$('.carre[data-carre="'+z+'"]').data("joueur") === $('.carre[data-carre="'+y+'"]').data("joueur")
			) {

			return x;
		} 

		else {
			return false;
		}
	}

	/* Jeu aléatoire pour 0 lorsque aucun coup tactique b'est possible */
	function ORandomPlay() {

		// Boucle pour trouver un coup valide
		for (var i = 0; i < 100; i++) {
		
			var n = Math.floor((Math.random() * 9) + 1);
			if ( checkIfcarreFree( n ) ) {

				$('.carre[data-carre="'+n+'"').addClass("Ojoues");
				$('.carre[data-carre="'+n+'"').addClass("joues");
				$('.carre[data-carre="'+n+'"').data("joues", true);
				$('.carre[data-carre="'+n+'"').data("joueur", "O");

				checkWin();
				break;
			} 

		}
	}


	function OPlay() {

		// Parcourt toutes les combinaisons gagnantes
		for (i = 0; i < wins.length; i++) {

			// Vérifie si un coup tactique est possible
			var tacticalPlay = checkTacticalPlay(wins[i][0], wins[i][1], wins[i][2]);


			if (tacticalPlay) {

				if ( checkIfcarreFree( tacticalPlay ) ) {

					$('.carre[data-carre="'+tacticalPlay+'"').addClass("Ojoues");
					$('.carre[data-carre="'+tacticalPlay+'"').addClass("joues");
					$('.carre[data-carre="'+tacticalPlay+'"').data("joues", true);
					$('.carre[data-carre="'+tacticalPlay+'"').data("joueur", "O");

					checkWin();
					break;

				} else {
					ORandomPlay();
				}
			}


			if ( !tacticalPlay && i === (wins.length - 1) ) {
				ORandomPlay();
			}
		} // end loop

	}



	

	/* *******************
		Jeu de X
	******************* */

	$(".carre").on("click", function() {

		if ( checkIfcarreFree( $(this).data("carre") ) ) {

			$(this).addClass("Xjoues");
			$(this).addClass("joues");

			$(this).data("joues", true);
			$(this).data("joueur", "X");

			checkWin();

			OPlay();

		} else {
			alert("Case déjà jouée. Réessayez svp.")
		}
		

	})


	
		





})