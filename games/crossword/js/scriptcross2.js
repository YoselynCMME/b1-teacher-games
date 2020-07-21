// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL 
(function ($) {
	$(function () {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			
			{
				answer: "up",
				position: 2,
				orientation: "across",
				startx: 14,
				starty: 2
			},
			{
				answer: "behaved",
				position: 5,
				orientation: "down",
				startx: 11,
				starty: 6
			},
			{
				answer: "free",
				position: 6,
				orientation: "across",
				startx: 8,
				starty: 7
			},
			{
				answer: "tempered",
				position: 12,
				orientation: "across",
				startx: 7,
				starty: 11
			},
			{
				answer: "saving",
				position: 14,
				orientation: "across",
				startx: 3,
				starty: 13
			},
			{
				answer: "working",
				position: 15,
				orientation: "across",
				startx: 9,
				starty: 14
			},
			{
				answer: "known",
				position: 16,
				orientation: "across",
				startx: 1,
				starty: 15
			},
			{
				answer: "minded",
				position: 17,
				orientation: "across",
				startx: 9,
				starty: 16
			},
			{
				answer: "hush",
				position: 1,
				orientation: "down",
				startx: 14,
				starty: 1
			},
			{
				answer: "time",
				position: 3,
				orientation: "down",
				startx: 13,
				starty: 5
			},
			{
				answer: "aged",
				position: 4,
				orientation: "down",
				startx: 15,
				starty: 5
			},
			{
				answer: "famous",
				position: 7,
				orientation: "down",
				startx: 3,
				starty: 8
			},
			{
				answer: "lasting",
				position: 8,
				orientation: "down",
				startx: 7,
				starty: 8
			},
			{
				answer: "arm",
				position: 9,
				orientation: "down",
				startx: 9,
				starty: 9
			},
			{
				answer: "service",
				position: 10,
				orientation: "down",
				startx: 13,
				starty: 10
			},
			{
				answer: "moving",
				position: 11,
				orientation: "down",
				startx: 5,
				starty: 11
			},
			{
				answer: "looking",
				position: 13,
				orientation: "down",
				startx: 1,
				starty: 12
			},
			{
				answer: "being",
				position: 18,
				orientation: "across",
				startx: 11,
				starty: 6
			},







		]

		$('#puzzle-wrapper').crossword(puzzleData);

	})

})(jQuery)