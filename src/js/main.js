var foo = require('./foo.js');

var app = {

	init : function(){
		console.log(foo);
	},

};

$(document).ready(function () {
    app.init();
});