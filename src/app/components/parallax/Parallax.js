import React, { Component } from 'react';

import * as u from "../../services/utility.service";
import * as shared from "../../services/shared.service";

import '../../../assets/css/classes.css';


var valid = function() {

  if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

    return true;
  }

  return false;
}

// var waitForElem = function (options, complete) {

//   var c = {
//     noexist:"noexist",
//     found:"found",
//     notfound:"notfound"
//   }

//     var count = 0;
//     var result = false;
//     var active = []

//     var checkElements = function (array) {

//       if (array === undefined || array === null) {
//         return c.noexist;
//       }

//       result = c.found;
//       active = [];

//       if (Array.isArray(array)) {

//         // console.log("###################\n\n\n\n\n\narray is array \n\n\n\n\n\n################")

//         for (var i in array) {

//           // console.log("element", array[i], "does not exist");

//             if ($(array[i])[0]) {
//               active.push(true);
//             }

//         }


//           if (active.length >= array.length) {

//             result = c.found;
//           }
//           else {
//             result = c.notfound;
//           }

//       }
//       else {

//         // console.log("@@@@@@@@@@@@@@@@\n\n\n\n\n\n\n\n\array is single\n\n\n\n\n\n@@@@@@@@@@@@@@")

//         if ($(array)[0]) {
//           // console.log("element does not exist");
//           result = c.found;
//         }
//         else {
//           result = c.notfound;
//         }

//       }

//       return result;
//     }

//     var stopTimer = function () {

//       clearInterval(waitTimer);
//         waitTimer = null;
//     }

//     var waitTimer = setInterval(function () {


//       if (checkElements(options.elems) == c.noexist) {
//         stopTimer();
//       }
//     else if (checkElements(options.elems) == c.found || count >= 500) {

//           // console.log("clear interval");

//           stopTimer();

//             if (count < 500) {

//               // console.log("run complete");
                
//                 if (typeof complete === "function") complete(options);
//             }
//             else {

//               // console.log("count limit reached");
//             }
            
//         }
//         else {

//             count++;
//         }

//     }, 30);
// }


//    // adjusts the size of the image (defined in the directive 'src') to always be bigger than the parent
var fixInside = function (params) {

  var $i = params.inside;
  var $s = params.space;
  
  var $iw = $i.width;
  var $ih = $i.height;
  var $sw = $s.width;
  var $sh = $s.height;

  var $ar = $iw/$ih;

  var goodAspect = function (width, height) {
    if (Math.abs($iw/$ih - $ar) < 0.01) return true;
    return false;
  }

  var checkHeight = function ($h) {
        if ($h < $sh) return "under";
        else if ($h > $sh*1.2) return "over";
        return "good";
    }

    var checkWidth = function ($w) {
        if ($w < $sw) return "under";
        else if ($w > $sw*1.2) return "over";
        return "good";
    }


    var fixHeight = function ($w, $h) {

      $h = $sh*1.2;
        $w = $h*$ar;

        return {
          width:$w,
          height:$h
        }
    }


    var fixWidth = function ($w, $h) {

      $w = $sw*1.2;
        $h = $w/$ar;

        if (checkHeight($h) == "under") {
           return fixHeight($w, $h)
        }

        return {
          width:$w,
          height:$h
        }
    }


    if (checkWidth($iw) == "under") {
        return fixWidth($iw, $ih);
    }

    // console.log("adjust image", $w, $h);

    return {
      width:$iw,
      height:$ih
    }

}

// generally solves a system of two linear equations 
var linear = function (params) {

  var y1 = params.y1;
  var y2 = params.y2;
  var x1 = params.x1;
  var x2 = params.x2;
  var m;
  var b;

  if (x2 != x1) {
    
    m = (y2-y1)/(x2-x1);
    b = y1 - x1*m;

  }
  else {
    m = 0;
    b = 0;
  }

  return {
    m:m,
    b:b
  }

}



var self;
var inner;
var img;
var top;
var active = false;
var factor = 1;

var o;
var elemheight;
var innerheight;
var imageheight;
var bodyheight;

var eqs;

// if src is defined, add the image to the parent div dynamically, called when loaded
var setup = function (options, complete) {


    var element = options.element;
    var attr = options.attr;
    var $options = options.$options;

    $(element).css({
        overflow:"hidden"
    });

    if (self.props.src && !self.props.inner) {

        active = true;


        inner = document.createElement("div");
        $(element).append(inner);

        // container div is always 150% taller than parent to allow enough room to parallax scroll
        $(inner).css({
            position:"absolute", 
            height:"150%", 
            width:"100%", 
            backgroundColor:"white", 
            zIndex:-50, 
            opacity:0.99
        });

        img = document.createElement("img");
        img.src = self.props.src;
        img.id = self.props.imgId;
        $(inner).append(img);


        // image is centered with in container, this is what is adjusted by fix()
        $(img).css({
            position:"absolute", 
            top:"50%", 
            left:"50%",
            // "margin-right":"-50%",
            transform: 'translate(-50%, -50%)',
            MozTransform: 'translate(-50%, -50%)',
            WebkitTransform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)'
            
        });

    }
    else if (self.props.inner && !self.props.src) {
        active = true;

        // console.log("inner", $options.elems[1]);
        inner = $(element).find("#" + self.props.inner)[0];
    }

    elemheight = $(element).height();
    innerheight = $(inner).height();

    if (typeof complete === "function") complete();
}


var getEqs = function (options, $ih) {

    
    var element = options.element;
    var attr = options.attr;
    var $options = options.$options;

    var xBuffer = 100;
    var yBuffer = 20;


    var bodyheight = $($options.elems[0]).height();

    // console.log("version 5", self.props.name, "sh:", elemheight, " ph:", innerheight, " ih:", $ih, " h:", bodyheight);

    if (!self.props.top) {

        // console.log("equation", self.props.name ? self.props.name : "", "is linear");

        eqs = linear({
            x1:(-1)*xBuffer,
            y1:(-1)*yBuffer,

            x2:bodyheight + xBuffer,
            y2:(elemheight-innerheight) + yBuffer
        });

    }
    else {
        // console.log("equation", self.props.name ? self.props.name : "", "is simple");
        eqs = {m:-0.99, b:(elemheight-innerheight)/2};
    }

    // console.log(self.props.name, "m:" + eqs.m + " b:" + eqs.b);

}


// get parallax scroll parameters, solve linear equation for current values, called when loaded and anytime the window is resized
var reset = function (options) {


    var element = options.element;
    var attr = options.attr;
    var $options = options.$options;

    var $inner = $options.elems[1];

    // console.log("options", $options.elems, inner);

    var ed = fixInside({
        inside:{
            width:$($inner).width(), 
            height:$($inner).height()
        }, 
        space:{
            width:$(element).width(),
            height:$(element).height()
        }
    });


    if (self.props.adjustinner) {
    // if (true) {
        $($inner).css({width:ed.width, height:ed.height});
    }

    getEqs(options, (img ? ed.height : innerheight));
    
}

// changes height of parallax scrolling element based on element offset compared to top of scrolling element
var scroll = function (options) {
    

    
    var element = options.element;
    var attr = options.attr;
    var $options = options.$options;

    // if device is desktop and a parallax scrolling element is defined
    if (valid() && active) {

        // getEqs(options, (img ? $(img).height() : ih));

        // if (self.props.name == "evolve" || self.props.name == "top") console.log(self.props.name, "m:" + eqs.m + " b:" + eqs.b);

        o = $(element).offset().top;

        // console.log("offset", self.props.name, $(element).offset().top);

        top = o*eqs.m*factor + eqs.b;

        $($options.elems[1]).css({top:top});
    }

    //console.log("version 1 factor: " + factor);
}

var runResetAndScroll = function (options) {


    var $options = options.$options;

    reset(options);
    scroll(options);

    $(window).resize(function () {
        reset(options);
        scroll(options);
    });

    // console.log("parallax options", $options, [
    //             {"scroll":$($options.elems[0])[0]},
    //             {"inner":$($options.elems[1])[0])}
    // ]);

    $($options.elems[0]).scroll(function () {

        // console.log(($($options.elems[0])[0] ? "parallax" : "no parallax"), "scroll");
        // reset(options);
        scroll(options);
    });
}


// console.log("parallax scope", [
//             {"name": self.props.name}, 
//             {"src": self.props.src},
//             {"imgID": self.props.imgId},
//             {"inner": self.props.inner},
//             {"scroll": self.props.scroll},
//             {"top": self.props.top},
//             {"factor": self.props.factor},
//             {"adjustinner": self.props.adjustinner}
// ])



var parallax = function ($this) {

  self = $this;

  factor = self.props.factor ? parseFloat(self.props.factor) : factor;

  if (factor < 0 || factor >= 0) {
      // console.log("factor is", factor);
  }
  else {
      console.log("factor is indeterminate for", self.props.name + ",", "set factor to 1");
      factor = 1;
  }

  shared.g.waitForElem({elems:["#" + self.props.scroll]}, function (options) {

      
      options.element = element;
      options.attr = attr;

      setup(options, function () {
              
          shared.g.waitForElem({elems:["#" + self.props.scroll, "#" + (self.props.inner ? self.props.inner : self.props.imgId)]}, function ($options) {
              options.$options = $options;
              runResetAndScroll(options);
          })

      });

  })

};

class Footer extends Component {


  render() {

    return (

        <div>

          {parallax(this)}

        </div>
    );
  }
}

export default Footer;