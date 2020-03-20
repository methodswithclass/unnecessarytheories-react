





import React from 'react';

import Navbtn from "../components/navbtn/Navbtn";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Parallax from "../components/parallax/Parallax";

// import '../states/home/Home.css';


import '../../assets/css/classes.css';



import * as u from "../services/utility.service";
import * as state from "../services/state.service";
import * as api from "../services/api.service";
import * as data from "../services/data.service";


var blog;
var text;


var chooseParagraph = function ($paragraph) {


	if ($paragraph.para == "para") {


		return (

	        <div className="relative width">
					<div className="relative width font-15 line-height-30">{$paragraph.text}</div>
			</div>

		)



	}
	else if ($paragraph.para = "list") {



		return (


			<div className="relative width">
					<table className="relative width">
						<tbody>
							<tr className="relative width">
								<td className="relative width10 table-cell cell-top"></td>
								<td className="relative width10 font-20 line-height-40 table-cell cell-top">
									<div className="relative width height-30"><div className="absolute center">&bull;</div></div>
								</td>
								<td className="relative width75 font-15 line-height-30 table-cell cell-top">{$paragraph.text}</td>
							</tr>
						</tbody>
					</table>
				</div>
		)
	}
}


var paragraph = function ($paragraph) {


	return (

	        <div className="relative width">


	        	{chooseParagraph($paragraph)}


	        	<div className="relative width height-30 white-back"></div>

	        </div>
	)
}

var section = function ($section) {


	return (


		<div className="relative width">

			<div className="relative width hcenter">

				{getParagraphs($section)}

			</div>


			<div className="relative width40 height-70 margin-bottom-100 hcenter border-bottom"></div>

		</div>

	)
}


var getParagraphs = function ($section) {

	var allParagraphs = $section.map(function ($paragraph, index) {


		return (

		   	<div key={index} className="relative width">
		    	{paragraph($paragraph)}

		    </div>

		)


	});



	return (


	    <div className="relative width">

	    	{allParagraphs}

	    </div>
	)


}

var getSections = function (sections) {

	var sectionDivs = sections.map(function ($section, index) {

		return (

		        <div key={index} className="relative width">

		        	{section($section)}
		        </div>
		)

	});


	return (

		<div className="relative width">

			{sectionDivs}
		</div>

	)

}


var getPiece = function (text) {




	console.log("text", text);

	return (


	        <div className="relative width hcenter">

	        	{getSections(text)}

	        </div>

	)
}


var getDate = function (blog) {

	var date = blog.meta.date;

	var year = date.getYear() + 1900;

	var getMonth = function () {

		return u.getMonth(date.getMonth());
	}

	return getMonth() + " " + date.getDate() + ", " + year;
}

var getElem = function (props) {


	console.log("state name", state.getName());
	console.log("check mobile home", u.checkMobile());


	blog = data.getBlogByName(props.$stateParams.name);

	text = blog.content


	if (u.checkMobile()) {



	}
	else {


		console.log("blog", blog);





	}





	return (


	    <div className="relative width height cutoffX scrollY scroll-vertical-dark-narrow">



			<Header title={blog.meta.name} img={blog.meta.image}></Header>

		    <div className="relative width">

		        <div className="relative width white-back">

		        	<div className="relative width padding-100">

		        		<div className="relative width80 hcenter">


		        			<div className="relative width padding-v-100">


		        				<div className="relative width">

		        					{blog.meta.by}
		        				</div>

		        				<div className="relative width">

		        					{getDate(blog)}
		        				</div>


		        				<div className="relative width">

		        					{blog.meta.title.l.text}
		        				</div>

		        			</div>

				        	<div className="relative width60 font-15">

				       			{getPiece(blog.content)}
				        	</div>

			        	</div>

		        	</div>

		        </div>

		    </div>

		    <div className="relative width">
		    	<Footer></Footer>

		    </div>

		</div>

	);
}


export var Piece = function (props) {

	return getElem(props);
}
