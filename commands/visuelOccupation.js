const cli = require("@caporal/core").default;
const { lectureDonnees, cheminDonnees } = require("../fonctions.js");
const { createWriteStream } = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const vegaEmbed = require('vega-embed');
const {dureeOccupation} = require("../fonctions");

module.exports = cli
    .command('visuelOccupation', 'Génère un visuel synthétique du taux d\'occupation des salles.')
    .action(async ({ logger }) => {
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

        // Calcul du taux d'occupation et tri des salles
        const sallesAvecTaux = Object.keys(parserResult.salles)
            .map(key => {
                const salle = key;
                const capacite = parserResult.salles[key];
                const dureeTotale = parserResult.listeCreneaux.reduce((total, creneau) => {
                    if (creneau.salle === salle) {
                        const dureeCreneau = dureeOccupation(creneau.heureDebut, creneau.heureFin);

                        return total + dureeCreneau;
                    }
                    return total;
                }, 0);

                const tauxOccupation = (dureeTotale / (joursOuvertsParSemaine * heuresParJour)) * 100; // Converti en pourcentage

                return {
                    salle: salle,
                    capacite: capacite,
                    tauxOccupation: tauxOccupation
                };
            })
            .sort((a, b) => b.tauxOccupation - a.tauxOccupation);

        // Create Vega-Lite specification
        const vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: sallesAvecTaux
            },
            mark: 'bar',
            encoding: {
                y: { field: 'salle', type: 'nominal', title: 'Salle' },
                x: { field: 'tauxOccupation', type: 'quantitative', title: 'Taux d\'occupation (%)' }
            }
        };

        // Generate HTML content
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vega-Lite Bar Chart</title>
          <meta charset="utf-8" />
          <script src="https://cdn.jsdelivr.net/npm/vega@5.25.0"></script>
          <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.16.3"></script>
          <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.22.2"></script>
        </head>
        <body>
          <h1>Taux d'occupation des salles</h1>
          <div id="vis"></div>
          <script>
            // Embed the visualization in the container with id 'vis'
            vegaEmbed('#vis', ${JSON.stringify(vlSpec)});
          </script>
        </body>
      </html>
    `;

        // Save the HTML content to a file
        await pipeline(
            htmlContent,
            createWriteStream('occupation_chart.html')
        );

        logger.info("Chart saved as 'occupation_chart.html'");
    });