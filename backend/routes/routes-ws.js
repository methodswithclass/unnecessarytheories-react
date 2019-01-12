

var routesExpress = require("express");
var routesRouter = routesExpress.Router();

var db = require("./db.js");
const UIDGenerator = require('uid-generator');



var get = require("../backend-app/data/get/get.js");

const uidgen = new UIDGenerator();



var called = 0;
var check = 0;


routesRouter.ws("/instantiate", function (ws, req, next) {

	try {

		ws.on("message", function ($msg) {

			var msg = JSON.parse($msg);

			console.log("instantiate", msg);

			var session = get.createSession();

			var result = {session:session.id, success:"success"};

			ws.send(JSON.stringify(result));

		});

	}
	catch (err) {

		next(err);
	}

});


routesRouter.ws("/initialize", function (ws, req, next) {

	try {

		ws.on("message", function ($msg) {

			var msg = JSON.parse($msg);

			console.log("initialize", msg);

			var input = msg.data.input;

			var session = get.getSession(input.session);

			var result = {session:session.id, success:"success"};

			ws.send(JSON.stringify(result));

		});

	}
	catch (err) {

		next(err);
	}
});



module.exports = routesRouter;





