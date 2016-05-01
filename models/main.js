(() =>{
	"use strict";
	var PEG = require("./parser.js");
	const parser = (input) =>{
		const tree = PEG.parse(input);
		console.log(tree);
	};
	module.exports = parser;
});
