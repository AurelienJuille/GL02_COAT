const Creneau = require('../model/creneau');
const Cours = require('../model/cours');

describe("Program Semantic testing of Creneau", function(){
	
	
	beforeAll(function() {

		this.cours = new Cours("EN01", []);
		this.c = new Creneau("EN01", "C1", 24, "J", "10:00", "12:00", "F1", "P202");

	});
	
	it("can create a new Creneau", function(){
		
		expect(this.c).toBeDefined();
		// toBe is === on simple values
		expect(this.c.nomUe).toBe("EN01");
		expect(this.c).toEqual(jasmine.objectContaining({nomUe: "EN01"}));
		
	});
	
	it("can add a new ranking", function(){
		
		this.cours.addCreneau(creneau);
		expect(this.cours.creneaux).toEqual(["EN01", "C1", 24, "J", "10:00", "12:00", "F1", "P202"]);
		
	});
	/*
	it("can compute the average ranking", function(){
		expect(this.p.averageRatings()).toBe(2);
	});
	
	it("can track POI last updates date (DD/MM/YYYY)", function(){
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(2020, 11, 20));
		
		let currentDate = new Date();
		let currentDateString = currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear();
		let currentDateStringPlus2days = (currentDate.getDate() + 2) +"/"+currentDate.getMonth()+"/"+currentDate.getFullYear();
		
		let trackedPOI = new POI("Café d'Albert", 48.857735, 2.394987, []);
		
		
		expect(trackedPOI.lastUpdate).toBeDefined();
		expect(trackedPOI.lastUpdate).toBe(currentDateString);
		
		jasmine.clock().mockDate(new Date(2020, 11, 22));

		trackedPOI.addRating(2);
		expect(trackedPOI.lastUpdate).toBe(currentDateStringPlus2days);

		jasmine.clock().uninstall();
	});*/
	
});
