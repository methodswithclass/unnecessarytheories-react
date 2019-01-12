





import React from 'react';

import Navbtn from "../components/navbtn/Navbtn";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Parallax from "../components/parallax/Parallax";

import '../states/home/Home.css';


import '../../assets/css/classes.css';



import * as u from "../services/utility.service";
import * as state from "../services/state.service";
import * as api from "../services/api.ws.service";
import * as data from "../services/data.service";


var getBlogButtons = function (genre) {


	var blogButtons = data.getBlogsByGenre(genre).map(function (blog, key) {


		return (

			<div key={key} className="flex-grow flex-grow-1 width30 height-200 margin-50 rounded20 border cutoff" onClick="blogClick(blog.meta.name, genre.id)">

				<div className="relative width height black-back pointer rounded20 cutoff">

					<div className="absolute black-back hcenter" style="width:200%; height:500%" id={'genre_thumb' + blog.meta.name}>

						<img className="absolute width-auto height hcenter" src={blog.meta.image + '.jpg'} />
					</div>



					<div className="absolute width height font1-rem">

						<div className="absolute width80 rounded10 center black-back transparent opacity80">
							<div className="relative width80 hcenter padding-v-50 text-center">
								{blog.meta.title.s.text}
							</div>
						</div>

						<div className="absolute width80 center beige">
							<div className="relative width80 hcenter padding-v-50 text-center">
								{blog.meta.title.s.text}
							</div>
						</div>

					</div>

				</div>

			</div>

		)

	})


	return {blogButtons};

}


var getGenres = function () {


	var genres = data.getGenres().map(function (genre, key) {


		return (

		    <div className="relative width">

		        <div key={key} className="relative height-80 width80 border-bottom">

					<div className="absolute bottom0 font150-rem">

						{genre.title}
					</div>
				</div>


				<div className="relative width">

					<div className="flex flex-wrap flex-row flex-justify-space width">


						{getBlogButtons()}

					</div>

				</div>

			</div>

		)

	})

	return {genres};
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



		<div className="relative width height">


			<Header></Header>

			<div className="relative width80 hcenter white-back" id="button-group">


					<div className="relative width margin-v-100" ng-repeat="genre in genres">


						{getGenres()}


					</div>


			</div>

		</div>


	);
}


export var Home = function () {

	return getElem();
}
