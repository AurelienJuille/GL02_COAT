const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const colors = require('colors');

module.exports = cli
	//Capacité max d'une salle parmi tous les créneaux
	.command('capacite', "Affiche quelle capacité maximale une salle peut avoir.")
	.argument('<nomSalle>', 'Nom de la salle.')
	.action(({ args, logger }) => {

		let parserResult = lectureDonnees(cheminDonnees);

		if (parserResult.errorCount > 0) {
			logger.info("Le fichier .cru contient une erreur".red);
			return;
		}

		if (!parserResult.salles[args.nomSalle]) {
			logger.info("La salle demandé n'existe pas dans la base de donnée.".red)
		} else {
			logger.info("La salle " + args.nomSalle + " peut acceuillir au maximum : " + parserResult.salles[args.nomSalle] + " personnes.");
		}
		
	})
