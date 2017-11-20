var backcolor = '#014'; // 014
var forecolor = '#dde'; // dde
var midcolor = '#55a'; //55a
var colors = {"A": '#afa', "B": '#faa'};
var army_colors = {"A": '#181', "B": '#811'};

function plus_alpha(c, a){
    var r = parseInt(c[1] + c[1], 16);
    var g = parseInt(c[2]+c[2], 16);
    var b = parseInt(c[3] + c[3], 16);
    return 'rgba('+r+','+g+','+b+','+a+')';
}

var towerfont = '15px Arial';

var canvas = document.getElementById("maincanvas");
canvas.style.background=backcolor;
var context = canvas.getContext("2d");