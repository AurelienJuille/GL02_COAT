const Salle = require('./salle');
const { afficherMenu } = require('./cli');

// Exemple d'utilisation
const salle1 = Salle.creerSalle('A204', 30);
const salle2 = Salle.creerSalle('B101', 40);
const salle3 = Salle.creerSalle('C302', 25);

// Utilisation de la CLI pour afficher le menu principal
afficherMenu();