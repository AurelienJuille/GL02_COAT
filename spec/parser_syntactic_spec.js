describe("Program Syntactic testing of Parser", function(){
	
	beforeAll(function() {
		const Creneau = require('../model/Creneau');
		const Cours = require('../model/Cours');

		const Parser = require('../Parser');
		this.analyzer = new Parser();
		
		this.cours = new Cours("EN01", []);
		this.creneau = new Creneau("EN01", "C1", 24, "J", "10:00", "12:00", "F1", "P202");


	});
	
	it("can read a nomeUe from a simulated input", function(){
		
		let input = ["EN01"];
		expect(this.analyzer.nom(input)).toBe("EN01");
		
	});

	it("can read a type from a simulated input", function(){
		
		let input = ["C1"];
		expect(this.analyzer.type(input)).toBe("C1");
		
	});

	it("can read a capacitaire from a simulated input", function(){
		
		let input = ["P", "=", "24"];
		expect(this.analyzer.capacitaire(input)).toBe("24");
		
	});

	it("can read a jour from a simulated input", function(){
		
		let input = ["H", "=", "J"];
		expect(this.analyzer.jour(input)).toBe("J");
		
	});

	it("can read a heureDebut from a simulated input", function(){
		
		let input = ["10:00"];
		expect(this.analyzer.heureDebut(input)).toBe("10:00");
		
	});

	it("can read a heureFin from a simulated input", function(){
		
		let input = ["-","12:00"];
		expect(this.analyzer.heureFin(input)).toBe("12:00");
		
	});

	it("can read an index from a simulated input", function(){
		
		let input = ["F1"];
		expect(this.analyzer.index(input)).toBe("F1");
		
	});

	it("can read a salle from a simulated input", function(){
		
		let input = ["S", "=", "P202"];
		expect(this.analyzer.salle(input)).toBe("P202");
		
	});
	
	/*it("can parse an entire Cours from a simulated input", function(){
		
		let input = "+MC01\r\n1,C1,P=24,H=J 10:00-12:00,F1,S=P202//\r\n1,T1,P=24,H=J 13:00-16:00,F2,S=EXT1//"
		let data = this.analyzer.tokenize(input);
		
		expect(this.analyzer.cours(data)).toBeDefined();
		
	});*/
	
});
