const Salle = require('./salle');
const { afficherMenu } = require('./cli');

Salle.chargerDepuisFichier();

// Utilisation de la CLI pour afficher le menu principal
afficherMenu();