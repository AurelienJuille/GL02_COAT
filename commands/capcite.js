const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const colors = require('colors');

module.exports = cli
	//Capacité max d'une salle parmi tous les créneaux
	.command('capacite', "Affiche quelle capacité maximale une salle peut avoir.")
	.argument('<nomSalle>', 'Nom de la salle.')
	//.action(({ args, logger }) => {}
