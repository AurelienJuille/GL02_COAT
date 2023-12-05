const POI = require('../POI');

describe("Program Semantic testing of POI", function(){
	
	
	beforeAll(function() {

		this.p = new POI("Café d'Albert", 48.857735, 2.394987, [1,3,2]);

	});
	
	it("can create a new POI", function(){
		
		expect(this.p).toBeDefined();
		// toBe is === on simple values
		expect(this.p.name).toBe("Café d'Albert");
		expect(this.p).toEqual(jasmine.objectContaining({name: "Café d'Albert"}));
		
	});
	
	it("can add a new ranking", function(){
		
		this.p.addRating(2);
		expect(this.p.ratings).toEqual([1,3,2,2]);
		
	});
	
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
	});
	
});