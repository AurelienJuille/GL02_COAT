const cli = require("@caporal/core").default;

module.exports = cli
	// Affiche un classement des salles ordonné selon leur capacité
	.command('classementsalles', 'Affiche un classement des salles ordonné selon leur capacité.')
	.action(({logger}) => { }
