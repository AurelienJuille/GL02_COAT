const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees, dureeOccupation } = require("../fonctions.js");

module.exports = cli
    .command('classementTauxOccupation', 'Affiche un classement des salles ordonné selon leur taux d\'occupation.')
    .action(({ logger }) => {
        let parserResult = lectureDonnees(cheminDonnees);

        if (parserResult.errorCount > 0) {
            logger.info("Le fichier .cru contient une erreur".red);
            return;
        }

        if (parserResult.salles.size === 0) {
            logger.info("Le fichier ne contient pas de salles.".red);
            return;
        }

        const joursOuvertsParSemaine = 5; // Nombre de jours par semaine
        const heuresParJour = 10; // Nombre d'heures par jour

        // Calcul du taux + tri des salles
        const sallesAvecTaux = Object.keys(parserResult.salles)
            .map(key => {
                const salle = key;
                const capacite = parserResult.salles[key];
                const dureeTotale = parserResult.listeCreneaux.reduce((total, creneau) => {
                    if (creneau.salle === salle) {
                        const dureeCreneau = dureeOccupation(creneau.heureDebut, creneau.heureFin);
                        //console.log(`Salle: ${salle}, Capacite: ${capacite}, Duree Creneau: ${dureeCreneau}`);
                        return total + dureeCreneau;
                    }
                    return total;
                }, 0);

                //console.log(`Salle: ${salle}, Capacite: ${capacite}, Duree Totale: ${dureeTotale}`);

                const tauxOccupation = (dureeTotale / (joursOuvertsParSemaine * heuresParJour)) * 100; // Converti en pourcentage
                //console.log(`Salle: ${salle}, Taux Occupation: ${tauxOccupation}`);

                return {
                    salle: salle,
                    capacite: capacite,
                    tauxOccupation: tauxOccupation
                };
            })
            .sort((a, b) => b.tauxOccupation - a.tauxOccupation);

        sallesAvecTaux.forEach((salle, index) => {
            console.log(`${index + 1}. ${salle.salle} (Taux d'occupation: ${salle.tauxOccupation.toFixed(2)}%)`);
        });
    });
