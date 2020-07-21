// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL 
(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			
			 	{
				answer: "character",
				position: 7,
				orientation: "across",
				startx: 5,
				starty: 5
			},
			{
				answer: "plot",
				position: 9,
				orientation: "across",
				startx: 1,
				starty: 7
			},
			
			{
				answer: "communicative",
				position: 11,
				orientation: "across",
				startx: 10,
				starty: 8
			},
			{
				answer: "episodes",
				position: 12,
				orientation: "across",
				startx: 2,
				starty: 11
			},
			{
				answer: "reads",
				position: 13,
				orientation: "across",
				startx: 21,
				starty: 13
			},
			{
				answer: "entertainment",
				position: 1,
				orientation: "down",
				startx: 16,
				starty: 1
			},
			{
				answer: "Antagonist",
				position: 2,
				orientation: "down",
				startx: 20,
				starty: 1
			},
			{
				answer: "Protagonist",
				position: 3,
				orientation: "down",
				startx: 11,
				starty: 2
			},
			{
				answer: "imagination",
				position: 4,
				orientation: "down",
				startx: 18,
				starty: 2
			},
			{
				answer: "narrative",
				position: 5,
				orientation: "down",
				startx: 8,
				starty: 3
			},
			{
				answer: "culture",
				position: 6,
				orientation: "down",
				startx: 2,
				starty: 5
			},
			{
				answer: "adventure",
				position: 8,
				orientation: "down",
				startx: 22,
				starty: 5
			},
			{
				answer: "Subplot",
				position: 10,
				orientation: "down",
				startx: 14,
				starty: 7
			},

				
				
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)
