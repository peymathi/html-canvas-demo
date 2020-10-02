var canvas = $("#canvas")[0];

// Global connection to the canvas
var con = canvas.getContext("2d");
con.strokeStyle = "red";
con.fillStyle = "red";

// Global array that contains the intervals which allow drawing
currentlyDrawing = false;
drawingIntervals = [];

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
            // 4ms is the fastest that setInterval can go. Not fast enough. Using 100 intervals now so that the drawing should be updated much faster.
            currentlyDrawing = true;
            for (var i = 0; i < 100; i++)
            {
                drawingIntervals.push(setInterval(function(){userDraw();}, 4));
            }
        }

    });

    // Stops the current drawing if there is any
    $(document).mouseup(function(event) {

        if (event.which == 1 && currentlyDrawing)
        {
            while(drawingIntervals.length > 0)
            {
                clearInterval(drawingIntervals[0]);
                drawingIntervals.shift();
            }

            currentlyDrawing = false;
        }
    });

    // Updates the mouse position relative to the canvas
    $("#canvas").mousemove(function(event){

        relx = event.pageX - $(this).offset().left;
        rely = event.pageY - $(this).offset().top;
    });

}());
