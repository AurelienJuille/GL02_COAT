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

        const nouvelleSalle = new Salle(nom, capacite);
        return nouvelleSalle;
    }

    static getSalles() {
        return Salle.salles;
    }
}

module.exports = Salle;