//const Console = require("console");
var Cours = function(uv, creneau){
    this.uv = uv;
    this.creneaux = [].concat(creneau);
};

Cours.prototype.addCreneau = function (creneau) {
    this.creneaux.push(creneau);
}

module.exports = Cours;
