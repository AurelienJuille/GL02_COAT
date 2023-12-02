const browseDir = require("browse-directory");
const Parser = require('./Parser');
const colors  = require('colors');
//const vegalite = require('vega-lite');
const fs = require('fs');
//const vg = require('vega');

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
    }
}
