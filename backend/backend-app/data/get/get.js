

var g = require("@methodswithclass/shared").utility_service;
// var g = require("../../../../src/assets/js/shared.js").utility_service;


const UIDGenerator = require('uid-generator');


const uidgen = new UIDGenerator();


var SESSION_EXPIRY = 3600*24*1000;

var $session = {};

var getSessionId = function () {

	return uidgen.generateSync();
}


var clearSessions = function () {

	var now = (new Date()).getTime();

	for (var i in $session) {

		if (!$session[i].expires || now > $session[i].expires) {
			delete $session[i]
		}

	}
}


var createSession = function () {

	clearSessions();

	var sessionId = getSessionId();

	console.log("create session", sessionId);

	var now = new Date();
	var nowMilli = now.getTime();
	var expires = new Date(nowMilli + SESSION_EXPIRY);

	$session[sessionId] = {};
	$session[sessionId].expires = expires.getTime();
	
	return {
		s:$session[sessionId],
		id:sessionId
	}
}


var getAllSessions = function () {

	return $session;
}

var $getSession = function ($sessionId) {

	return {
		s:$session[$sessionId],
		id:$sessionId
	}
}

var getSession = function ($sessionId) {

	var session = $getSession($sessionId);

	if (!(session && session.s && session.id)) {

		console.log("session with id:", $sessionId, "does not exist, creating new session");

		session = createSession();
	}

	return {
		s:session.s,
		id:session.id
	}
}


module.exports =  {
	
	getSessionId:getSessionId,
	createSession:createSession,
	getAllSessions:getAllSessions,
	getSession:getSession

}



