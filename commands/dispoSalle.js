const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");

module.exports = cli
	// Affiche la disponibilté d'une salle
	.command('disposalle', 'Affiche la disponibilté d\'une salle.')
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

    let salle = prompt("Veuillez entrer la salle pour voir ses disponibilités");
    let dispo;

    if (parserResult.salles === salle){
        dispo.push ([parserResult.jour + parserResult.heureDebut + " - " + parserResult.heureFin , parserResult.nom])
    }

    dispo.sort((a, b) => b[0]- a[0]);

    console.log("La salle" + salle + "est occupé")
    dispo.array.forEach(element => {
        console.log(element[0] + "pour le cours de " + element[1])
    });

})
