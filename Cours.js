class Cours {
    constructor(titre, nombreEtudiant, salleAssociee, type) {
        this.titre = titre;
        this.nombreEtudiant = nombreEtudiant;
        this.salleAssociee = salleAssociee;
        this.type = type;
    }

    getTitre() {
        return this.titre;
    }

    getNombreEtudiant() {
        return this.nombreEtudiant;
    }

    getSalleAssociee() {
        return this.salleAssociee;
    }

    getType() {
        return this.type;
    }
}

module.exports = Cours;
