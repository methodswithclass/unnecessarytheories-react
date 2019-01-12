// 'use strict';

const path = require('path');
process.traceDeprecation = true;

const testOutputPath = path.resolve(__dirname, 'temp/test');
const devOutputPath = path.resolve(__dirname, 'dist');
const contextPath = path.resolve(__dirname, 'src');


var dev = {
	name:"development",
	mode:"development",
	context: contextPath,
	entry: ['./app/index.js'],
	output: {
		path: devOutputPath,
		filename: 'main.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
						loader:"babel-loader",
						options: {
								cacheDirectory: true,
								babelrc: false,
								presets: [
								[
								"@babel/preset-env",
								{
										"targets": {
												'browsers': ['Chrome >=59']
										},
										"modules":false,
										"loose":true
								}
								],
								"@babel/preset-react"
								]
						}
				}
				]
			},  {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};

var test = {
	name:"test",
	mode:"development",
	context: contextPath,
	entry: ['./app/index.js'],
	output: {
		path: testOutputPath,
		filename: 'main.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
						loader:"babel-loader",
						options: {
								cacheDirectory: true,
								babelrc: false,
								presets: [
								[
								"@babel/preset-env",
								{
										"targets": {
												'browsers': ['Chrome >=50']
										},
										"modules":false,
										"loose":true
								}
								],
								"@babel/preset-react"
								]
						}
				}
				]
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};



// module.exports = function (env, args) {

//   if (args.name == "test") {
//     return test;
//   }
//   else {
//     return dev;
//   }
// }


module.exports = {
	dev:dev,
	test:test
}
