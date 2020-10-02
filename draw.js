var canvas = $("#canvas")[0];

// Global connection to the canvas
var con = canvas.getContext("2d");
con.strokeStyle = "red";
con.fillStyle = "red";

// Global bool that keeps the pointer drawing
currentlyDrawing = 0;

// Global radius value for the brush size
brushRadius = 2

// Globals that keep track of the mouses current position relative to the canvas object
relx = 0;
rely = 0;

// Draws a single filled circle at the location specified with radius of brushRadius
function userDraw()
{
    con.beginPath();
    con.arc(relx, rely, brushRadius, 0, 2 * Math.PI);
    con.closePath();
    con.fill();
    con.stroke();
}

$(document).ready(function () {
    
    // Event for the mouse button being pressed down. Continuously draws a circle the size of the brush every 10ms until mouse up event
    $("#canvas").mousedown(function(event) {

        if (event.which == 1 && !currentlyDrawing)
        {
            currentlyDrawing = setInterval(function(){userDraw();}, 10);
        }

    });

    // Stops the current drawing if there is any
    $(document).mouseup(function(event) {

        if (event.which == 1 && currentlyDrawing)
        {
            clearInterval(currentlyDrawing);
            currentlyDrawing = 0;
        }
    });

    // Updates the mouse position relative to the canvas 
    $("#canvas").mousemove(function(event){

        relx = event.pageX - $(this).offset().left;
        rely = event.pageY - $(this).offset().top;
    });

}());
