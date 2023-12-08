const browseDir = require("browse-directory");
const Parser = require('./Parser');
const colors  = require('colors');
//const vegalite = require('vega-lite');
const fs = require('fs');
//const vg = require('vega');
const dureeOccupation = function (heureDebut, heureFin) {
    const debut = heureDebut.split(":").map(Number);
    const fin = heureFin.split(":").map(Number);

    const debutMinutes = debut[0] * 60 + debut[1];
    const finMinutes = fin[0] * 60 + fin[1];

    const dureeEnMinutes = finMinutes - debutMinutes;

    if (dureeEnMinutes < 0) {
        // Gestion du cas où l'heure de fin est avant l'heure de début
        return 0;
    }

    return dureeEnMinutes / 60; // Retourne la durée en heures
};


module.exports = {
    cheminDonnees: './donnees',

    // Permet de retourner toutes les données du répertoire dans une liste d'objets créneau
    lectureDonnees: (data) => {
        console.log("Recuperation des données depuis ".blue + data.blue);
        const dirFiles = browseDir.browseFiles(data);
        let parserResult = new Parser();

        if (dirFiles.length === 0) {
            console.log("Le dossier ".red + data.red + " ne contient pas de fichiers .cru".red);
            parserResult.errorCount++;
            return parserResult;
        }

        dirFiles
            .map(e => e.src)
            .forEach(file => {
                const data = fs.readFileSync(file, 'utf-8')
                parserResult.parse(data);
            });

        return parserResult;
    },
    dureeOccupation: dureeOccupation


}
