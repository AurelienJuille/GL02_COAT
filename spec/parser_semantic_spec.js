const Creneau = require('../model/creneau');
const Cours = require('../model/cours');

describe("Program Semantic testing of Creneau", function(){
	
	
	beforeAll(function() {

		this.cours = new Cours("EN01", []);
		this.c = new Creneau("EN01", "C1", 24, "J", "10:00", "12:00", "F1", "P202");

	});

	it("can create a new Cours", function(){
		
		expect(this.cours).toBeDefined();
		// toBe is === on simple values
		expect(this.cours.uv).toBe("EN01");
		expect(this.cours).toEqual(jasmine.objectContaining({uv: "EN01"}));
		
	});
	
	it("can create a new Creneau", function(){
		
		expect(this.c).toBeDefined();
		// toBe is === on simple values
		expect(this.c.nomUe).toBe("EN01");
		expect(this.c).toEqual(jasmine.objectContaining({nomUe: "EN01"}));
		
	});
	
	
});
