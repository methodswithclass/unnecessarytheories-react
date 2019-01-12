




export var catcher = function (message) {
    return function(reason) {
        console.log(message, reason);
    };
}