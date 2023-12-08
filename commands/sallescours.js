const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const colors = require('colors');

module.exports = cli
    // Récupérer les salles utilisées par une UE
	.command('sallescours', "Permet d'afficher quelles sont les salles utilisées par une UE")
	.argument('<cours>', 'Le cours')
	.action(({args, logger}) => {
		let parserResult = lectureDonnees(cheminDonnees);

		if (parserResult.errorCount > 0) {
			logger.info("Le fichier .cru contient une erreur".red);
			return;
		}

		if (parserResult.listeCreneaux.filter(c => c.nomUe === args.cours).length === 0) {
			logger.info("Le cours n'existe pas.".red);
			return;
		}

		console.log(
			"Salles occupées par l'UE",
			args.cours,
			":", 
			[...new Set(
				parserResult.listeCreneaux
					.filter(creneau => creneau.nomUe === args.cours)
					.map(creneau => creneau.salle)
			)]
		);
	})
