const fs = require('fs');

class Salle {
    static salles = [];

    constructor(nom, capacite) {
        this.nom = nom;
        this.capacite = capacite;
        Salle.salles.push(this);
    }

    afficherDetails() {
        console.log(`Salle: ${this.nom}, Capacité: ${this.capacite}`);
    }

    static creerSalle(nom, capacite) {
        const regex = /^[A-Z]\d{3}$/;
        if (!regex.test(nom)) {
            console.log("Le nom de la salle n'est pas dans le format correct.");
            return null;
        }

        // Vérifier si la salle existe déjà dans la liste actuelle
        const salleExistante = Salle.salles.find(salle => salle.nom === nom && salle.capacite === capacite);

        if (salleExistante) {
            console.log("Cette salle existe déjà.");
            return null;
        }

        const nouvelleSalle = new Salle(nom, capacite);
        return nouvelleSalle;
    }

    static getSalles() {
        return Salle.salles;
    }

    static enregistrerDansFichier() {
        const nomFichier = 'salles.txt';

        const sallesValides = Salle.salles.filter(salle => salle.nom && salle.capacite);
        const contenu = sallesValides.map(salle => `${salle.nom},${salle.capacite}`).join('\n') + '\n';

        fs.writeFile(nomFichier, contenu, { flag: 'w' }, err => {
            if (err) {
                console.error(`Erreur lors de l'écriture dans le fichier ${nomFichier} : ${err.message}`);
            } else {
                console.log("Salles enregistrées dans le fichier.");
            }
        });
    }


    static chargerDepuisFichier() {
        const nomFichier = 'salles.txt';

        try {
            const data = fs.readFileSync(nomFichier, 'utf-8');
            const lignes = data.split('\n');

            Salle.salles = []; // Réinitialisez la liste des salles

            lignes.forEach(ligne => {
                const [nom, capacite] = ligne.split(',');

                if (nom && capacite) {
                    const nouvelleSalle = new Salle(nom, parseInt(capacite));
                    // Pas besoin du push ici car la salle est déjà ajoutée dans le constructeur
                }
            });

            console.log("Salles chargées depuis le fichier.");
        } catch (err) {
            console.error(`Erreur lors de la lecture du fichier ${nomFichier} : ${err.message}`);
        }
    }
    static salleExisteDeja(nom) {
        return Salle.salles.some(salle => salle.nom === nom);
    }
}

module.exports = Salle;