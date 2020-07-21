// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL 
(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					answer: "drives",
					position: 4,
					orientation: "across",
					startx: 9,
					starty: 4
				},
				{
					answer: "having",
					position: 6,
					orientation: "across",
					startx: 9,
					starty: 8
				},
				{
					answer: "made",
					position: 8,
					orientation: "across",
					startx: 7,
					starty: 10
				},
				{
					answer: "tell",
					position: 10,
					orientation: "across",
					startx: 7,
					starty: 12
				},	
				{
					answer: "took",
					position: 11,
					orientation: "across",
					startx: 2,
					starty: 13
				},
				{
					answer: "speak",
					position: 13,
					orientation: "across",
					startx: 3,
					starty: 15
				},
				{
					answer: "pay",
					position: 14,
					orientation: "across",
					startx: 1,
					starty: 17
				},
				{
					answer: "find",
					position: 1,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					answer: "agree",
					position: 2,
					orientation: "down",
					startx: 14,
					starty: 7
				},
				{
					answer: "getting",
					position: 3,
					orientation: "down",
					startx: 13,
					starty: 3
				},
				{
					answer: "take",
					position: 5,
					orientation: "down",
					startx: 10,
					starty: 7
				},
				{
					answer: "make",
					position: 7,
					orientation: "down",
					startx: 8,
					starty: 9
				},
				{
					answer: "do",
					position: 9,
					orientation: "down",
					startx: 3,
					starty: 12
				},
				{
					answer: "talk",
					position: 20,
					orientation: "down",
					startx: 7,
					starty: 12
				},
				{
					answer: "keep",
					position: 12,
					orientation: "down",
					startx: 5,
					starty: 13
				},
				{
					answer: "say",
					position: 23,
					orientation: "down",
					startx: 3,
					starty: 15
				},
				
				
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)
