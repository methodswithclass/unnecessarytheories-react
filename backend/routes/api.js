
// var AWS = require('aws-sdk');

var apiExpress = require("express");
var apiRouter = apiExpress.Router();

var http = require("axios");

// AWS.config.loadFromPath('./backend/aws-config.json');


// var dynamodb = new AWS.DynamoDB();

var gateway_url = "https://vvb4vuftr8.execute-api.us-east-1.amazonaws.com/development";

apiRouter.post("/blogs/:blog", function (req, res, next) {



	var params = {
	  Item: {
	   "Name": {
	     S: req.params.blog
	    },
	   "Blog": {
	     S: req.body.blog
	    }
	  },
	  ReturnConsumedCapacity: "TOTAL",
	  TableName: "Blogs"
	 };


	 dynamodb.putItem(params, function (err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     res.send({message:data ? {name:req.params.blog, success:true} : null});        // successful response
	});


})


apiRouter.get("/blogs/:blog", function (req, res, next) {

	// var params = {
	//   Key: {
	//    "Name": {
	//      S: req.params.blog
	//     }
	//   },
	//   TableName: "Blogs"
	//  };

	// dynamodb.getItem(params, function (err, data) {
	//   if (err) console.log(err, err.stack); // an error occurred
	//   else     res.send({blog:data.Item.Blog.S});        // successful response
	// });


	http({
		method: 'POST',
    	url:gateway_url + "/blog",
    	data:{
    		blog:req.params.blog
    	}
	})
	.then((response) => {

		// console.log("response", response.data);


		res.send({blog:response.data.body.blog});

	})
	.catch(error => {

		console.log("error", error);

		// res.send(error);
	})


})






module.exports = apiRouter;
