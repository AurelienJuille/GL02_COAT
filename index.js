const cli = require("@caporal/core").default;

const capacite = require("./commands/sallecours")
const classementsalles = require("./commands/classementsalles")

cli
					.version('parser-cli')
					.version('0.07')
					sallecours
					classementsalles
cli.run(process.argv.slice(2));
