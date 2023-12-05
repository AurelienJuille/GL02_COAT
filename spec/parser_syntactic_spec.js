/*describe("Program Syntactic testing of VpfParser", function(){
	
	beforeAll(function() {
		const POI = require('../POI');

		const VpfParser = require('../VpfParser');
		this.analyzer = new VpfParser();
		
		this.pEmptyRating = new POI("Café d'Albert", 48.857735, 2.394987, []);

	});
	
	it("can read a name from a simulated input", function(){
		
		let input = ["name", "Café d'Albert"];
		expect(this.analyzer.name(input)).toBe("Café d'Albert");
		
	});


	it("can read a lat lng coordinate from a simulated input", function(){
		
		let input = ["latlng", "48.866205;2.399279"];
		expect(this.analyzer.latlng(input)).toEqual({ lat: "48.866205" , lng: "2.399279" });
		
		let inputNeg = ["latlng", "-48.866205;2.399279"];
		expect(this.analyzer.latlng(inputNeg)).toEqual({ lat: "-48.866205" , lng: "2.399279" });
		
	});	
	
	it("can read several rankings for a POI from a simulated input", function(){
		
		let input = ["note", "1", "note", "7"];
		
		this.analyzer.note(input, this.pEmptyRating);

		expect(this.pEmptyRating.ratings[0]).toBe("1");
		expect(this.pEmptyRating.ratings[1]).toBeUndefined();
		
	});	
	
	it("can parse an entire POI from a simulated input", function(){
		
		let input = "START_POI\r\nname: Chez Gabin\r\nlatlng: 48.871794;2.379538\r\nnote: 3\r\nnote: 2\r\nEND_POI"
		let data = this.analyzer.tokenize(input);
		
		expect(this.analyzer.poi(data)).toBeTrue();
		
	});
	
});*/
