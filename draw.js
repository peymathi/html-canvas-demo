var canvas = $("#canvas")[0];
var con = canvas.getContext("2d");
con.strokeStyle = "red";
con.fillStyle = "red";

// Global bool that keeps the pointer drawing
currentlyDrawing = 0;

function userDraw(event)
{
    x = event.pageX - $(this).offset().left;
    y = event.pageY - $(this).offset().right;
    con.beginPath();
    con.arc(x, y, 2, 0, 2 * Math.PI);
    con.closePath();
    con.fill();
    con.stroke();
}

$(document).ready(function () {
    
    $("#canvas").mousedown(function(event) {

        if (event.which == 1 && !currentlyDrawing)
        {
            currentlyDrawing = setInterval(function(){userDraw(event);}, 10);
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
