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

        if (Salle.salleExisteDeja(nom)) {
            console.log(`Une salle avec le nom ${nom} existe déjà.`);
            afficherMenu();
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
                afficherMenu();
            } else {
                creerSalleDepuisCLI();
            }
        });
    });
}
function modifierSalleDepuisCLI() {
    rl.question("Nom de la salle à modifier : ", function (nom) {
        if (!validerNomSalle(nom)) {
            console.log("Le nom de la salle n'est pas dans le format correct.");
            modifierSalleDepuisCLI();
            return;
        }

        // Rechercher la salle dans la liste
        const salleAModifier = Salle.getSalles().find(salle => salle.nom === nom);

        if (!salleAModifier) {
            console.log(`Aucune salle trouvée avec le nom ${nom}.`);
            afficherMenu();
            return;
        }

        rl.question("Nouveau nom de la salle : ", function (nouveauNom) {
            // Ajoutez une vérification pour s'assurer que le nouveau nom n'est pas uniquement composé de chiffres
            if (!isNaN(nouveauNom) || !validerNomSalle(nouveauNom)) {
                console.log("Le nouveau nom de la salle n'est pas valide.");
                modifierSalleDepuisCLI();
                return;
            }

            rl.question("Nouvelle capacité de la salle : ", function (nouvelleCapacite) {
                if (isNaN(nouvelleCapacite) || nouvelleCapacite <= 0) {
                    console.log("La nouvelle capacité de la salle n'est pas valide.");
                    modifierSalleDepuisCLI();
                    return;
                }

                // Mettez à jour les propriétés de la salle
                salleAModifier.nom = nouveauNom;
                salleAModifier.capacite = parseInt(nouvelleCapacite);

                console.log("Salle modifiée avec succès:");
                salleAModifier.afficherDetails();

                // Enregistrez les salles dans le fichier après la modification de la salle
                Salle.enregistrerDansFichier();

                // Appel récursif pour afficher à nouveau le menu
                afficherMenu();
            });
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
    } else {
        console.log("Détails de toutes les salles :");
        toutesLesSalles.forEach(salle => {
            salle.afficherDetails();
        });
    }

    afficherMenu();
}
function obtenirInformationsSalleDepuisCLI() {
    rl.question("Nom de la salle : ", function (nom) {
        if (!validerNomSalle(nom)) {
            console.log("Le nom de la salle n'est pas dans le format correct.");
            obtenirInformationsSalleDepuisCLI();
            return;
        }

        // Rechercher la salle dans la liste
        const salleTrouvee = Salle.getSalles().find(salle => salle.nom === nom);

        if (salleTrouvee) {
            // Afficher les détails de la salle
            salleTrouvee.afficherDetails();
        } else {
            console.log(`Aucune salle trouvée avec le nom ${nom}.`);
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
    console.log("4. Modifier une salle");
    console.log("5. Quitter");

    rl.question("Choisissez une option : ", function (option) {
        switch (option) {
            case '1':
                creerSalleDepuisCLI();
                break;
            case '2':
                afficherToutesLesClasses();
                break;
            case '3':
                obtenirInformationsSalleDepuisCLI();
                break;
            case '4':
                modifierSalleDepuisCLI(); // Ajoutez cette option
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez choisir une option valide.");
                afficherMenu();
        }
    });
}

module.exports = { afficherMenu };