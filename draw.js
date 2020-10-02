var canvas = $("#canvas")[0];

// Global connection to the canvas
var con = canvas.getContext("2d");
con.strokeStyle = "red";
con.fillStyle = "red";

// Global bool that keeps the pointer drawing
currentlyDrawing = 0;

// Global radius value for the brush size
brushRadius = 2

function userDraw(x, y)
{
    con.beginPath();
    con.arc(x, y, brushRadius, 0, 2 * Math.PI);
    con.closePath();
    con.fill();
    con.stroke();
}

$(document).ready(function () {
    
    $("#canvas").mousedown(function(event) {

        if (event.which == 1 && !currentlyDrawing)
        {
            x = event.pageX - $(this).offset().left;
            y = event.pageY - $(this).offset().right;
            currentlyDrawing = setInterval(function(){userDraw(x, y);}, 10);
        }

    });

    $(document).mouseup(function(event) {

        if (event.which == 1 && currentlyDrawing)
        {
            clearInterval(currentlyDrawing);
            currentlyDrawing = 0;
        }
    });

}());
