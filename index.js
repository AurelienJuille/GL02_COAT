const cli = require("@caporal/core").default;

const sallecours = require("./commands/sallecours")
const classementsalles = require("./commands/classementsalles")
const capacite = require("./commands/capacite")
const classementTauxOccupation = require("./commands/classementTauxOccupation");
const generateICalendar = require("./commands/generateICalendar");
const visuelOccupation=require("./commands/visuelOccupation");



cli
					.version('parser-cli')
					.version('0.07')
					sallecours
					classementsalles
					capacite
					classementTauxOccupation
					generateICalendar
					visuelOccupation

cli.run(process.argv.slice(2));
