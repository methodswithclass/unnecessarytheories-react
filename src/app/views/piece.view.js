





import React from 'react';

import Navbtn from "../components/navbtn/Navbtn";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Parallax from "../components/parallax/Parallax";

// import '../states/home/Home.css';


import '../../assets/css/classes.css';



import * as u from "../services/utility.service";
import * as state from "../services/state.service";
import * as api from "../services/api.ws.service";
import * as data from "../services/data.service";



var getElem = function () {


	console.log("state name", state.getName());
	console.log("check mobile home", u.checkMobile());



	if (u.checkMobile()) {



	}
	else {


	}




	return (


	    <div className="relative width height cutoffX scrollY scroll-vertical-dark-narrow">



			<Header></Header>

		    <div className="relative width">

		        <div className="relative width height-1000 green7-back">

		        	<div className="absolute center font-40">

		        		Piece view
		        	</div>

		        </div>

		    </div>


		    <Footer></Footer>

		</div>

	);
}


export var Piece = function () {

	return getElem();
}
