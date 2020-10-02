var canvas = $("#canvas")[0];
var con = canvas.getContext("2d");
con.strokeStyle = "red";

// Global bool that keeps the pointer drawing
currentlyDrawing = 0;

function userDraw()
{
    var randx = Math.random() * 800
    var randy = Math.random() * 600
    con.beginPath()
    con.moveTo(randx, randy);
    con.lineTo(randx, randy);
    con.stroke();
}

$(document).ready(function () {
    
    $("#canvas").mousedown(function(event) {

        if (event.which == 1 && !currentlyDrawing)
        {
            currentlyDrawing = setInterval(userDraw, 10);
        }

    });

    $(document).mouseup(function(event) {

        if (event.which == 1 && currentlyDrawing)
        {
            currentlyDrawing = 0;
        }
    });

}());
