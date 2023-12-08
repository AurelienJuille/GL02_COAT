const Creneau = require('./model/creneau');
const Cours = require('./model/cours');

// Parser
var Parser = function (sTokenize, sParsedSymb) {
	this.parsedCRU = [];
	this.listeCreneaux = [];
	this.salles = {};
	this.symb = ["+", ":", "1", ",", "P", "H", "F", "S", "//", "=", "-"];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

// Parser procedure

// tokenize : tranform the data input into a list
// <eol> = CRLF
Parser.prototype.tokenize = function (data) {
	const separator = /(\r\n)/;
	data = data.split(separator);
	const firstremover = /(\r\n|^\s*$)/; 
	data = data.filter(val => !val.match(firstremover));
	data.splice(0, 8);
	data.pop();

	var dataJoined = data.join('|');
	const secondseparator = /(,|-|=| |\||\/\/|\+)/;
	splittedDataJoined = dataJoined.split(secondseparator);
	const secondremover = /(,|\||^\s*$)/;
	splittedDataJoined = splittedDataJoined.filter((val, idx) => !val.match(secondremover));

	return splittedDataJoined;
}

// parse : analyze data by calling the first non terminal rule of the grammar
Parser.prototype.parse = function (data) {
	if (data.length !== 0) {
		var tData = this.tokenize(data);
		if (this.showTokenize) {
			console.log(tData);
		}
		this.cours(tData);
	} else {
		console.log("Erreur : fichier est vide.".red);
		this.errorCount++;
	}

}

// Parser operand

Parser.prototype.errMsg = function (msg, input) {
	this.errorCount++;
	console.log("Parsing Error ! on " + input + " -- msg : ".red + msg);
}

// Read and return a symbol from input
Parser.prototype.next = function (input) {
	var curS = input.shift();
	if (this.showParsedSymbols) {
		console.log(curS);
	}
	return curS
}

// accept : verify if the arg s is part of the language symbols.

Parser.prototype.accept = function (s) {
	var idx = this.symb.indexOf(s);
	if (idx === -1) {
		this.errMsg("symbol " + s + " unknown", [" "]);
		return false;
	}

	return idx;
}



// check : check whether the arg elt is on the head of the list
Parser.prototype.check = function (s, input) {
	if (this.accept(input[0]) == this.accept(s)) {
		return true;
	}
	return false;
}

// expect : expect the next symbol to be s.
Parser.prototype.expect = function (s, input) {
	if (s === this.next(input)) {
		return true;
	}
	this.errMsg("symbol " + s + " doesn't match", input);
	return false;
}


// Parser rules
Parser.prototype.cours = function (input) {

	if (this.check("+", input)) {
		this.expect("+", input);
		var getNom = this.nom(input);
		var p = new Cours(getNom, []);
		this.creneau(input, p, getNom);
		this.parsedCRU.push(p);
		if (input.length > 0) {
			this.cours(input);
		}
		return true;
	}
	return false;

}


Parser.prototype.creneau = function (input, curCours, nomCours) {
	if (this.check("1", input)) {
		this.expect("1", input);
		const typeCreneau = this.type(input);
		const capaciteCreneau = this.capacitaire(input);
		const jourCreneau = this.jour(input);
		const heureDebutCreneau = this.heureDebut(input);
		const heureFinCreneau = this.heureFin(input);
		const indexCreneau = this.index(input);
		const salleCreneau = this.salle(input);
		if (!this.salles[salleCreneau]) this.salles[salleCreneau] = 0;
		if (parseInt(capaciteCreneau) > this.salles[salleCreneau]) this.salles[salleCreneau] = parseInt(capaciteCreneau);
		this.expect("//", input);
		const p = new Creneau(nomCours, typeCreneau, 
			capaciteCreneau, jourCreneau, heureDebutCreneau, heureFinCreneau, 
			indexCreneau, salleCreneau);
		curCours.addCreneau(p);
		this.listeCreneaux.push(p);
		if (input.length > 0) this.creneau(input, curCours, nomCours);
	}
}

//Récupérer le nom de l'UE du créneau
Parser.prototype.nom = function (input) {
	var curS = this.next(input);
	if (curS.match(/[A-Z0-9]+/)) {
		return curS;
	} else {
		this.errMsg("Erreur nom de l'UE du créneau", input);
	}
}

//Récupérer le type du créneau
Parser.prototype.type = function (input) {
	var curS = this.next(input);
	if (curS.match(/[TCD][0-9]/)) {
		return curS;
	} else {
		this.errMsg("Erreur type du créneau", input);
	}
}

//Récupérer la capacité de la salle au moment du créneau
Parser.prototype.capacitaire = function (input) {
	this.expect("P", input);
	this.expect("=", input);
	var curS = this.next(input);
	if (curS.match(/[0-9]?[0-9]?[0-9]/)) {
		return curS;
	} else {
		this.errMsg("Erreur capacité de la salle du créneau", input);
	}
}

//Récupérer le jour du créneau
Parser.prototype.jour = function (input) {
	this.expect("H", input);
	this.expect("=", input);
	var curS = this.next(input);
	if (!curS.match(/L|MA|ME|J|V|S/)) {
		this.errMsg("Erreur jour du creneau", input);
		return;
	}
	return curS;
}

//Récupérer l'heure de début du créneau
Parser.prototype.heureDebut = function (input) {
	var curS = this.next(input);
	if (!curS.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
		this.errMsg("Erreur heure de début du creneau", input);
		return;
	
	} 
	return curS;

}

//Recupérer l'heure de fin du créneau
Parser.prototype.heureFin = function (input) {
	this.expect("-", input);
	var curS = this.next(input);
	if (!curS.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
		this.errMsg("Erreur heure de fin du creneau", input);
		return;
	}
		
	return curS;
}

//Recuperer l'index du creneau
Parser.prototype.index = function (input) {
	var curS = this.next(input);
	if (!curS.match(/F([12]|[AB])/)) {
		this.errMsg("Erreur index", input);
		return;
	} 
	return curS;
}

//Recuperer le nom de salle du creneau
Parser.prototype.salle = function (input) {
	this.expect("S", input);
	this.expect("=", input);
	var curS = this.next(input);
	if (!curS.match(/[A-Z0-9]*/)) {
		this.errMsg("Erreur nom de salle", input);
		return;
	}
	return curS;
}


module.exports = Parser;
