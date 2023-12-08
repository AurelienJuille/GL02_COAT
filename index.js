const cli = require("@caporal/core").default;

const sallecours = require("./commands/sallescours")
const classementsalles = require("./commands/classementsalles")
const capacite = require("./commands/capacite")
const classementTauxOccupation = require("./commands/classementTauxOccupation");
const generateICalendar = require("./commands/generateICalendar");
const visuelOccupation=require("./commands/visuelOccupation");
const disposalle = require("./commands/dispoSalle")
const dispoHo = require("./commands/salleDispoH")



cli
					.version('parser-cli')
					.version('0.07')
					sallecours
					classementsalles
					capacite
					classementTauxOccupation
					generateICalendar
					visuelOccupation
					dispoHo
					disposalle

cli.run(process.argv.slice(2));
