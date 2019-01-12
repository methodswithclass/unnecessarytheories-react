


var testOverride = false;

var dev = {
	test:true,
	name:"unnecessary-theories-dev",
	url:'https://unnecessarytheories-dev.herokuapp.com/',
	// url:"localhost:3300",
	id:'725062234262184'
}

var prod = {
	test:false,
	name:"unnecessary-blog",
	url:'https://www.unnecessarytheories.io/',
	id:'696572137111194'
}

export var env = function (_test) {

	console.log("location", $location.absUrl(), $location.absUrl() == prod.url);

	return (_test !== undefined ? (_test ? dev : prod) : (testOverride ? dev : ($location.absUrl() == prod.url ? prod : dev)));
}

var genres = {
	genres:[
	{
		id:"blogs",
		title:"Blogs",
		map:"nonFict"
	},
	{
		id:"poetry",
		title:"Poetry",
		map:"poetry"
	}
	],
	nonFict:"blogs",
	poetry:"poetry"
}


var fonts = {
	button:{
		d:"font-15",
		m:"font-30"
	},
	blog:{
		d:"font-50",
		m:"font-50"
	}
}


var published = {
	none:false,
	prison:true,
	scale_time:false,
	meaning_god:false,
	intelligence:true,
	vase:true,
	online_dating:true,
	girl:true,
	contact:true,
	perspective:true,
	extraterrestrial_life:true,
	evolution:true,
	sexuality:true
}

var home = {
	meta:{
		name:"home",
		title:"unnecessary theories",
		image:"img/landscape"
	},
	share:{
		description:"here are some theories, they're probably unnecessary"
	}
}

var allblogs = [];

var writeBlog;

writeBlog = new Blog();
writeBlog.setDate(new Date(2019, 0, 5, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("sexuality");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("on sexuality");
writeBlog.setLongTitle("We need to talk about sex. You are not a man or a woman, you are not straight or gay. Sorry, not sorry.");
writeBlog.setShortTitleFont({button:{d:"font-30", m:"font-30"}});
writeBlog.setImage("img/gender");
writeBlog.setFile("files/sexuality.txt");
writeBlog.setPublished(published.sexuality);
writeBlog.setTwitter("Your penis is not that big o' deal. Your vagina doesn't matter. Just do your personality.");
writeBlog.setFacebook(env().url + genres.nonFict + "/sexuality");

allblogs.push(writeBlog);

writeBlog = null;


writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 10, 15, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("contact");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("challenges for alien contact");
writeBlog.setLongTitle("The science fiction community has done our culture an immense disservice by making possible what is perfectly implausible. What's wrong is that it has affected real scientific research endeavors.");
writeBlog.setShortTitleFont({button:{d:"font-15", m:"font-15"}});
writeBlog.setImage("img/contact");
writeBlog.setFile("files/alien-contact3.txt");
writeBlog.setPublished(published.contact);
writeBlog.setTwitter("The science fiction community has done our culture an immense disservice by making possible what is perfectly implausible");
writeBlog.setFacebook(env().url + genres.nonFict + "/contact");

allblogs.push(writeBlog);

writeBlog = null;


writeBlog = new Blog();
writeBlog.setDate(new Date(2018, 2, 11, 12, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("evolution");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("The misunderstanding of 'natural selection' and it's repercussions");
writeBlog.setLongTitle("There's no 'selection' in Evolution, you've been mislead, and now it's time to know what's more accurate");
writeBlog.setImage("img/evolution2");
writeBlog.setFile("files/evolution.txt");
writeBlog.setPublished(published.evolution);
writeBlog.setTwitter("There's no 'selection' in Evolution, you've been mislead, and now it's time to know the truth");
writeBlog.setFacebook(env().url + genres.nonFict + "/evolution");

allblogs.push(writeBlog);

writeBlog = null;


writeBlog = new Blog();
writeBlog.setDate(new Date(2018, 0, 23, 12, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("extraterrestrial_life");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("misconceptions of extraterrestrial life");
writeBlog.setLongTitle("Do you image aliens as our counterparts, but just slightly different? Think again. The differences are most probably so basic and fundamental that they will make you question your own existence");
writeBlog.setImage("img/extraterrestrial-life5");
writeBlog.setFile("files/extraterrestrial-life2.txt");
writeBlog.setPublished(published.extraterrestrial_life);
writeBlog.setTwitter("Sci-Fi has unfortunately taught us many terrible lessons about the possibilities for alien life and has put us all in a small mental box. Even trained scientists are not often free from sci-fi's gripping influence.");
writeBlog.setFacebook(env().url + genres.nonFict + "/extraterrestrial_life");

allblogs.push(writeBlog);

writeBlog = null;



writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 0, 7, 12, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("intelligence");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("the myth of intelligence");
writeBlog.setLongTitle("How can we, as humans, be so intelligent when we can't really define it?");
writeBlog.setImage("img/machine");
writeBlog.setFile("files/intelligence2.txt");
writeBlog.setPublished(published.intelligence);
writeBlog.setTwitter("It's a good thing we can think up something as sophisticated as intelligence or we'd be in trouble");
writeBlog.setFacebook(env().url + genres.nonFict + "/intelligence");

allblogs.push(writeBlog);

writeBlog = null;


writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 7, 21, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("vase");
writeBlog.setGenre(genres.poetry);
writeBlog.setShortTitle("vase of the world");
writeBlog.setLongTitle("Caution to you, when you create in order to relieve, you know not what you make");
writeBlog.setImage("img/cavemen");
writeBlog.setFile("files/vaseoftheworld.txt");
writeBlog.setPublished(published.vase);
writeBlog.setTwitter("Be careful what you create, you know not what it can become.");
writeBlog.setFacebook(env().url + genres.nonFict + "/vase");

allblogs.push(writeBlog);

writeBlog = null;



writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 9, 1, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("online_dating");
writeBlog.setGenre(genres.poetry);
writeBlog.setShortTitle("online dating");
writeBlog.setLongTitle("Online dating is not a fun activity, so I wrote some poetry about it.");
writeBlog.setImage("img/online-date");
writeBlog.setFile("files/online-date.txt");
writeBlog.setPublished(published.online_dating);
writeBlog.setTwitter("Online dating is not a fun activity, so I wrote some poetry about it.");
writeBlog.setFacebook(env().url + genres.nonFict + "/online_dating");

allblogs.push(writeBlog);

writeBlog = null;



writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 9, 30, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("girl");
writeBlog.setGenre(genres.poetry);
writeBlog.setShortTitle("girl on the path");
writeBlog.setLongTitle("I was lost in a world of my own thinking thoughts, then I came upon her, and she connected the dots.");
writeBlog.setImage("img/girl");
writeBlog.setFile("files/girl_on_path.txt");
writeBlog.setPublished(published.girl);
writeBlog.setTwitter("I was lost in a world of my own thinking thoughts, then I came upon her, and she connected the dots.");
writeBlog.setFacebook(env().url + genres.nonFict + "/girl");

allblogs.push(writeBlog);

writeBlog = null;


writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 10, 16, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("perspective");
writeBlog.setGenre(genres.poetry);
writeBlog.setShortTitle("perspective");
writeBlog.setLongTitle("For the stone and the mote, the grass is always greener...");
writeBlog.setImage("img/dust");
writeBlog.setFile("files/mote.txt");
writeBlog.setPublished(published.perspective);
writeBlog.setTwitter("For the stone and the mote, the grass is always greener...");
writeBlog.setFacebook(env().url + genres.nonFict + "/perspective");

allblogs.push(writeBlog);

writeBlog = null;



writeBlog = new Blog();
writeBlog.setDate(new Date(2015, 11, 22, 12, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("prison");
writeBlog.setGenre(genres.poetry);
writeBlog.setShortTitle("the prison");
writeBlog.setLongTitle("Even prisons with three walls are impossible to break free from");
writeBlog.setImage("img/prison");
writeBlog.setFile("files/prison.txt");
writeBlog.setPublished(published.prison);
writeBlog.setTwitter("You're in a prison you can't see because you're distracted by all the writing on the wall");
writeBlog.setFacebook(env().url + genres.nonFict + "/prison");

allblogs.push(writeBlog);

writeBlog = null;



writeBlog = new Blog();
writeBlog.setDate(new Date(2016, 5,  1, 6, 0, 0));
writeBlog.setBy("Christopher Polito");
writeBlog.setName("meaning_god");
writeBlog.setGenre(genres.nonFict);
writeBlog.setShortTitle("the meaning of god");
writeBlog.setLongTitle("Whether God exists or not is the wrong question, ask instead what is the 'meaning' of god");
writeBlog.setImage("img/space");
writeBlog.setFile("files/meaning_god1.txt");
writeBlog.setPublished(published.meaning_god);
writeBlog.setTwitter("Whether God exists or not is the wrong question, ask instead what is the 'meaning' of god");
writeBlog.setFacebook(env().url + genres.nonFict + "/meaning_god");

allblogs.push(writeBlog);

writeBlog = null;



allblogs.sort(function (a,b) {

	return b.meta.date.getTime() - a.meta.date.getTime();
});

var blogs = allblogs.filter(function (blog, index, array) {

	var now = new Date();

	//console.log("fliter blogs", blog);

	return (blog.meta.date.getTime() < now.getTime() && published[blog.meta.name] && !published.none);

});

blogs.forEach(function (value, index, array) {

	value.meta.index = index;

	file.process(value.meta.file, function (blog) {
		value.content = blog;
	});

});

var resolveName = function (name) {

	if (name == "scale_time") {

		name = "contact";
	}

	return name;
}

export var getBlogByIndex = function (index) {

	return blogs[index];
}

export var getIndexByName = function (name) {

	name = resolveName(name);

	console.log("get index by name", name);

	var indexA = -1;

	blogs.map(function (value, index) {

		if (value.meta.name == name) {
			indexA = index;
		}
	})

	console.log("get index by name", indexA);

	return indexA;
}

var resolveIndex = function (index) {

	if (index >= 0 && index < blogs.length) {
		return true;
	}
	return false;
}

export var getBlogByName = function (name) {

	if (name == "home") {

		return home;
	}

	name = resolveName(name);

	var blog = blogs.find(function (p) {

		return p.meta.name == name;
	})

	if (blog) return blog;
	else {
		console.log("invalid name");
		return null;
	}

}

export var getBlogsByGenre = function (genre) {


	var genreBlogs = blogs.filter(function (blog, index, array) {


		return blog.meta.genre == genre;
	})

	return genreBlogs;

}

export var isBlog = function (name) {

	var index = getIndexByName(name);

	return resolveIndex(index);
}

export var isGenre = function (name) {

	for (var i in genres) {

		if (name == genres[i]) {
			return true;
		}
	}

	return false;
}

export var getButtonPosition = function (index) {

	var cols = blogs.length <= 3 ? 2 : 3;
	cols = 2;
	cols = g.isMobile() ? 1 : cols;
	var rowsFrac = blogs.length/cols;
	// var rows = rowsFrac % cols == 0 ? rowsFrac : rowsFrac + 1;
	var rows = rowsFrac + 1;

	//console.log("rows " + rows);

	return {x:index % cols, y:Math.floor(index/cols), cols:cols, rows:rows};

}


export var getGenres = function () {

	return blogs;
}
