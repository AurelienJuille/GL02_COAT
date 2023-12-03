const cli = require("@caporal/core").default;

const sallecours = require("./commands/sallecours")
const classementsalles = require("./commands/classementsalles")
const capacite = require("./commands/capacite")

cli
					.version('parser-cli')
					.version('0.07')
					sallecours
					classementsalles
					capacite
cli.run(process.argv.slice(2));
