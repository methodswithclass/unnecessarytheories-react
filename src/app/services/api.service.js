import * as api from "./api.ws.service";


export var getBest = function (callback) {
    api.getBest(callback);
};


export var stepdata = function (callback) {
    api.stepdata(callback);
	};


export var isRunning = function  (callback) {
    api.isRunning(callback);
};


export var setInput = function (resend, callback) {
    api.setInput(resend, callback);
	};


export var instantiate = function (callback) {
    console.log("api instantiate")
    api.instantiate(callback);
};


export var initialize = function (callback) {
    console.log("api initialize");
    api.initialize(callback);
};


export var run = function (callback) {
   api.run(callback);
};

export var instruct = function (clear, callback) {
    api.instruct(callback);
};

export var refreshEnvironment = function (callback) {
    api.refreshEnvironment(callback);
};

export var resetEnvironment = function (callback) {
    api.resetEnvironment(callback);
};


export var simulate = {


    trash:function (_input, callback) {
        api.simulate.trash(_input, callback);
    },
    recognize:function (index, callback) {
        api.simulate.recognize(index, callback);
    },
    digit:function (index, callback) {
        api.simulate.digit(index, callback);
    }

};


export var hardStop = function (callback) {
    api.hardStop(callback);
};



