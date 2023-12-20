const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");

module.exports = cli
	// Affiche un classement des salles ordonné selon leur capacité
	.command('classementsalles', 'Affiche un classement des salles ordonné selon leur capacité.')
	.action(({logger}) => {
		let parserResult = lectureDonnees(cheminDonnees);

		if(parserResult.errorCount > 0){
			logger.info("Le fichier .cru contient une erreur".red);
			return;
		}

		if (parserResult.salles.size === 0){
			logger.info("Le fichier ne contient pas de salles.".red);
			return;
		}
		
		var lastCapacity = -1;
		var realIdx = 1;
		Object.keys(parserResult.salles)
			.map(key => ({
				salle: key,
				capacite: parserResult.salles[key]
			}))
			.filter(salle => salle.capacite > 0)
			.sort((a, b) => b.capacite - a.capacite)
			
			.forEach((salle, index) => {
				if (salle.capacite != lastCapacity) {
					realIdx = index + 1
					lastCapacity = salle.capacite
				}
				console.log(`${realIdx}. ${salle.salle} (Taux d'occupation: ${salle.capacite})`);
			});
	});
