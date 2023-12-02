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

	Object.keys(parserResult.salles).map(key => ({
			salle: key,
			capacite: parserResult.salles[key]
		})).sort((a, b) => b.capacite- a.capacite)
		.forEach((salle, index) => {
			console.log(`${index+1}. ${salle.salle} (${salle.capacite})`);
		});
})
