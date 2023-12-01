const cli = require("@caporal/core").default;

const colors = require('colors');

module.exports = cli
    // Récupérer les salles utilisées par une UE
	.command('sallescours', "Permet d'afficher quelles sont les salles utilisées par une UE")
	.argument('<cours>', 'Le cours')
	.action(({args, logger}) => { }
