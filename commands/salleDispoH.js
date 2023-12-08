const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const colors = require('colors');

module.exports = cli
	//Capacité max d'une salle parmi tous les créneaux
	.command('dispoHo', "Affiche quelle capacité maximale une salle peut avoir.")
	.argument('<jour>', 'Jour du créneau.')
    .argument('<heure>','Horaire début de créneau')
	.action(({ args, logger }) => {

		let parserResult = lectureDonnees(cheminDonnees);

		if (parserResult.errorCount > 0) {
			logger.info("Le fichier .cru contient une erreur".red);
			return;
		}

        const { parsedCRU, listeCreneaux, salles } = parserResult;

		// Filtrer les créneaux pour trouver ceux qui correspondent au jour et à l'heure fournis
        const creneauxFiltres = listeCreneaux.filter(creneau => {
            return creneau.jour === args.jour && (
              args.heure.split(':') >= creneau.heureDebut.split(':')[0] && args.heure.split(':') < creneau.heureFin.split(':')[0]
            );
          });
        
          // Liste des salles occupées à cet horaire
          const sallesOccupees = creneauxFiltres.map(creneau => creneau.salle);
        
          // Liste de toutes les salles disponibles
          const toutesLesSalles = Object.keys(salles);
        
          // Liste des salles disponibles à cet horaire
          const sallesDisponibles = toutesLesSalles.filter(salle => !sallesOccupees.includes(salle));

          console.log("Les salles disponibles à cet horaire sont :")
          sallesDisponibles.forEach((salle)=>{
            console.log(salle);
          });
          		
	})
