const readline = require('readline');
const Salle = require('./salle');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function creerSalleDepuisCLI() {
    rl.question("Nom de la salle : ", function (nom) {
        if (!validerNomSalle(nom)) {
            console.log("Le nom de la salle n'est pas dans le format correct.");
            creerSalleDepuisCLI();
            return;
        }

        rl.question("Capacité de la salle : ", function (capacite) {
            if (isNaN(capacite) || capacite <= 0) {
                console.log("La capacité de la salle n'est pas valide.");
                creerSalleDepuisCLI();
                return;
            }

            const nouvelleSalle = Salle.creerSalle(nom, parseInt(capacite));

            if (nouvelleSalle) {
                console.log("Salle créée avec succès:");
                nouvelleSalle.afficherDetails();
                Salle.enregistrerDansFichier();

                // Appel récursif pour afficher à nouveau le menu
                afficherMenu();
            } else {
                // Appel récursif pour re-demander les informations de la salle
                creerSalleDepuisCLI();
            }
        });
    });
}

function validerNomSalle(nom) {
    const regex = /^[A-Z]\d{3}$/;
    return regex.test(nom);
}

function afficherToutesLesClasses() {
    const toutesLesSalles = Salle.getSalles();

    if (toutesLesSalles.length === 0) {
        console.log("Vous n'avez créé aucune salle.");
        afficherMenu();
        return;
    }

    console.log("Détails de toutes les salles :");
    toutesLesSalles.forEach(salle => {
        salle.afficherDetails();
    });

    afficherMenu();
}
function obtenirInformationsSalle() {
    rl.question("Entrez le nom de la salle : ", function (nomSalle) {
        const salleTrouvee = Salle.getSalles().find(salle => salle.nom === nomSalle);

        if (salleTrouvee) {
            console.log("Informations sur la salle :");
            salleTrouvee.afficherDetails();
        } else {
            console.log(`La salle avec le nom '${nomSalle}' n'a pas été trouvée.`);
        }

        // Appel récursif pour afficher à nouveau le menu
        afficherMenu();
    });
}

function afficherMenu() {
    console.log("\nMenu :");
    console.log("1. Créer une salle");
    console.log("2. Voir toutes les salles");
    console.log("3. Obtenir des informations sur une salle");
    console.log("4. Quitter");

    rl.question("Choisissez une option : ", function (option) {
        switch (option) {
            case '1':
                creerSalleDepuisCLI();
                break;
            case '2':
                afficherToutesLesClasses();
                break;
            case '3':
                obtenirInformationsSalle();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez choisir une option valide.");
                afficherMenu();
        }
    });
}

module.exports = { afficherMenu };