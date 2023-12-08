const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");

// Convertir l'heure au format 'HH:MM' en minutes pour la comparaison
function convertToMinutes(heure) {
	const [hours, minutes] = heure.split(':').map(Number);
	return hours * 60 + minutes;
  }

module.exports = cli
	// Affiche la disponibilité d'une salle
	.command('disposalle', 'Affiche la disponibilté d\'une salle.')
    .argument('<salle>', 'Nom de la salle.')
	.action(({args, logger}) => {
	let parserResult = lectureDonnees(cheminDonnees);

	if(parserResult.errorCount > 0){
		logger.info("Le fichier .cru contient une erreur".red);
		return;
	}
	
	if (parserResult.salles.size === 0){
		logger.info("Le fichier ne contient pas de salles.".red);
		return;
	}

	const { parsedCRU, listeCreneaux, salles } = parserResult;

	const creneauxSalle = listeCreneaux.filter((creneau) => {
		return creneau.salle === args.salle
	});

	if (!(args.salle in parserResult.salles)) {
		console.log("La salle spécifiée n'existe pas.");
	  }

	else{

		// Trier les créneaux en fonction de l'heure de début
		creneauxSalle.sort((a, b) => {
			const heureDebutA = convertToMinutes(a.heureDebut);
			const heureDebutB = convertToMinutes(b.heureDebut);
			if (heureDebutA !== heureDebutB) {
			  return heureDebutA - heureDebutB;
			}
		});

			// Trier les créneaux en fonction de l'heure de début
		creneauxSalle.sort((a, b) => {
			const ordreJours = { L: 1, Ma: 2, ME: 3, J: 4, V: 5 };
  			return ordreJours[a.jour] - ordreJours[b.jour];
		});

		// Créer le planning trié
		let planning = creneauxSalle.map(creneau => {
		return {
			jour: creneau.jour,
			heureDebut: creneau.heureDebut,
			heureFin: creneau.heureFin
		};
		});

		// Afficher le planning trié par jour et heure de début
		console.log("Voici les créneaux pour lesquels la salle "+ args.salle + " est occupée:");
		planning.forEach((element)=>{
			console.log(`Le ${element.jour} de ${element.heureDebut} à ${element.heureFin}`)
		})
	}
    

})
