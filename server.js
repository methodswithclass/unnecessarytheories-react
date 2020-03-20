const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// var expressWs = require('express-ws')(app);

// const apiRoutes = require("./backend/routes/routes-ws.js");

const apiRoutes = require("./backend/routes/api.js");

const bot = require("./server/bot");
const middleware = require("./server/middleware");

const config = require("./config.js");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/server'));


// app.use(middleware.accessControl());


var PORTS = {
	heroku:8080,
	http:80,
	livereload:config.livereloadPort,
	misc1:3501,
	misc2:4801,
	misc3:4861
}



app.use(bot.middleware);
app.use(middleware.refresh());
if  (process.env.NODE_ENV == "production") app.use(middleware.ssl());
else {console.log("environment development");}
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/api", apiRoutes);


app.use("/url", function (req, res, next) {

	var host = req.get("host");

	console.log("host is:", host);

	res.send({data:{host:host}});
})


app.get("/env", function (req, res, next) {

	res.json({data:{env:middleware.getEnv()}});
})


app.use("/public", express.static(path.join(__dirname, "dist/assets")));
app.use("/files", express.static(path.join(__dirname, "asset/files")));
app.use("/img", express.static(path.join(__dirname, "asset/img")));
app.use("/t", express.static(path.join(__dirname, "temp")))
app.use("/blogs/*", express.static(path.join(__dirname, "dist")));
app.use("/poetry/*", express.static(path.join(__dirname, "dist")));
// app.use("/genre/*", express.static(path.join(__dirname, "dist")));


if  (process.env.NODE_ENV != "production") {
	app.use(require('connect-livereload')({
		port: PORTS.livereload
	}));
}


app.use("/", express.static(path.join(__dirname, "dist")));


var env = process.env.NODE_ENV;
var port;


if (process.env.PORT) {
	port = process.env.PORT;
}
else if (env == "production") {

	port = PORTS.heroku;

}
else if (env == "development") {

	port = PORTS.misc2;
}
else {

	port = PORTS.misc1;
}



var listener = app.listen(port, function () {

	console.log("listening on port", listener.address().port);
});


