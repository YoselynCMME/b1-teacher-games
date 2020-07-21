// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL 
(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					answer: "borrow",
					position: 2,
					orientation: "across",
					startx: 12,
					starty: 4
				},
				{
					answer: "created",
					position: 4,
					orientation: "across",
					startx: 7,
					starty: 7
				},
				{
					answer: "received",
					position: 10,
					orientation: "across",
					startx: 10,
					starty: 10
				},
				{
					answer: "laughing",
					position: 11,
					orientation: "across",
					startx: 19,
					starty: 10
				},
				{
					answer: "started",
					position: 12,
					orientation: "across",
					startx: 5,
					starty: 12
				},
				{
					answer: "empty",
					position: 13,
					orientation: "across",
					startx: 16,
					starty: 12
				},
				{
					answer: "remember",
					position: 14,
					orientation: "across",
					startx: 1,
					starty: 14
				},
				{
					answer: "attacking",
					position: 15,
					orientation: "across",
					startx: 15,
					starty: 14
				},
				{
					answer: "admitted",
					position: 16,
					orientation: "across",
					startx: 21,
					starty: 16
				},
				{
					answer: "allowed",
					position: 1,
					orientation: "down",
					startx: 13,
					starty: 1
				},
				{
					answer: "won",
					position: 3,
					orientation: "down",
					startx: 17,
					starty: 4
				},
				{
					answer: "awarded",
					position: 5,
					orientation: "down",
					startx: 10,
					starty: 7
				},
				{
					answer: "tightened",
					position: 6,
					orientation: "down",
					startx: 22,
					starty: 8
				},
				{
					answer: "failed",
					position: 7,
					orientation: "down",
					startx: 24,
					starty: 8
				},
				{
					answer: "rejected",
					position: 8,
					orientation: "down",
					startx: 16,
					starty: 9
				},
				{
					answer: "leaves",
					position: 9,
					orientation: "down",
					startx: 7,
					starty: 10
				},
				
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)
