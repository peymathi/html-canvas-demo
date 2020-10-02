
$(document).ready(function () {

    var con = $(canvas).getContext("2d");
    con.strokeStyle = "red";

    con.beginPath();
    con.moveTo(0, 0);
    con.lineTo(200, 400);
    con.stroke();
    con.closePath();

}());
