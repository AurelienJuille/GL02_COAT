const readline = require('readline');
const Salle = require('./salle');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function creerSalleDepuisCLI() {
    rl.question("Nom de la salle : ", function(nom) {
        if (!validerNomSalle(nom)) {
            console.log("Le nom de la salle n'est pas dans le format correct.");
            // Appel récursif pour re-demander le nom de la salle
            creerSalleDepuisCLI();
            return;
        }

        rl.question("Capacité de la salle : ", function(capacite) {
            if (isNaN(capacite) || capacite <= 0) {
                console.log("La capacité de la salle n'est pas valide.");
                // Appel récursif pour re-demander la capacité de la salle
                creerSalleDepuisCLI();
                return;
            }

            const nouvelleSalle = Salle.creerSalle(nom, parseInt(capacite));

            if (nouvelleSalle) {
                console.log("Salle créée avec succès:");
                nouvelleSalle.afficherDetails();
            }

            // Appel récursif pour afficher à nouveau le menu
            afficherMenu();
        });
    });
}

function validerNomSalle(nom) {
    const regex = /^[A-Z]\d{3}$/;
    return regex.test(nom);
}

function afficherToutesLesClasses() {
    const toutesLesSalles = Salle.getSalles();
    console.log("Détails de toutes les salles :");
    toutesLesSalles.forEach(salle => {
        salle.afficherDetails();
    });

    // Appel récursif pour afficher à nouveau le menu
    afficherMenu();
}

function afficherMenu() {
    console.log("\nMenu :");
    console.log("1. Créer une salle");
    console.log("2. Voir toutes les salles");
    console.log("3. Quitter");

    rl.question("Choisissez une option : ", function(option) {
        switch (option) {
            case '1':
                creerSalleDepuisCLI();
                break;
            case '2':
                afficherToutesLesClasses();
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez choisir une option valide.");
                afficherMenu();
        }
    });
}

module.exports = { afficherMenu };
