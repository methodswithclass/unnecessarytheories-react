





import React from 'react';

import Navbtn from "../components/navbtn/Navbtn";
import Blogbtn from "../components/navbtn/Blogbtn";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Parallax from "../components/parallax/Parallax";

import '../states/home/Home.css';


import '../../assets/css/classes.css';



import * as u from "../services/utility.service";
import * as state from "../services/state.service";
import * as api from "../services/api.ws.service";
import * as data from "../services/data.service";



var blogClick = function (name, id) {


	return function () {

		console.log("clicked", name, id);

	}
}


var getBlogButtons = function (genre) {



	if (genre[0]) {


		var blogButtons = data.getBlogsByGenre(genre[0].meta.genre).map(function (blog, key) {


			if (blog) {

				return (

				    <div key={key} className="relative width">

						<Blogbtn state={blog.meta.genre} blog={blog.meta.name}></Blogbtn>
					</div>
				)

			}
			else {

				return (

				    <div key={key} className="relative width">

				    	<div className="absolute center font-40">
				    		no blog
				    	</div>

				    </div>
				)

			}


		})

		return (

			<div className="relative width">

				{blogButtons};

			</div>

		)

	}
	else {

		return (

		    <div key="key0" className="relative width">

		    	<div className="absolute center font-40">
		    		no blog
		    	</div>

		    </div>
		)

	}


}


var getGenres = function () {


	console.log("blogs", data.getGenres());

	var genres = data.getGenres().map(function ($genre, key) {


		var genre = $genre[0];

		console.log("genre", genre);

		return (

		    <div key={key} className="relative width">

		        <div className="relative height-80 width80 border-bottom">

					<div className="absolute bottom0 font150-rem">

						{genre[0].meta.genre.toUpperCase()}
					</div>
				</div>


				<div className="relative width">

					<div className="flex flex-wrap flex-row flex-justify-space width">


						{getBlogButtons(genre)}

					</div>

				</div>

			</div>

		)


	})

	return (

		<div className="relative width">

			{genres};

		</div>

	)
}


var getElem = function () {


	console.log("state name", state.getName());
	console.log("check mobile home", u.checkMobile());



	if (u.checkMobile()) {
		// parallax name="home" scroll="body" top="true" inner="splash"

		// <!-- src="assets/img/landscape.jpg" -->

		// <!-- <div className="flex flex-row flex-justify-space flex-centerY width height-80 margin-v-50 border-top border-bottom">

		// 			<div className="flex-grow flex-grow-1 width20 height-40 border pointer rounded20 margin-20 black-back beige font120-rem" ng-repeat="btn in main.menu" ng-style="main.genreGenre == btn.state ? {'background-color':'#fbb44f', color:'black', 'font-weight':'bold'} : {}" ng-click="main.menuClick(btn.state)">

		// 				<div className="relative text-center center">
		// 					{{btn.title}}
		// 				</div>
		// 			</div>

		// 		</div>


		// 		<ui-view></ui-view> -->

		// <!--

		// 		<div className="relative width80 hcenter"> -->


		// parallax name="{'genre_page_' + blog.meta.name}" scroll="body" top="false" inner="{{'genre_thumb' + blog.meta.name}}" id="{{'genre_button' + blog.meta.name}}"

	}
	else {


	}




	return (



		<div className="relative width height scrollY scroll-vertical-dark-narrow">


			<Header></Header>

			<div className="relative width80 hcenter white-back" id="button-group">


					<div className="relative width margin-v-100">


						{getGenres()}


					</div>


			</div>


			<Footer></Footer>

		</div>


	);
}


export var Home = function () {

	return getElem();
}
