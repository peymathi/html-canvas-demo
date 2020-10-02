var canvas = $("#canvas")[0];

// Global connection to the canvas
var con = canvas.getContext("2d");
con.strokeStyle = "red";
con.fillStyle = "red";

// Global to tell if the mouse is down
mouseDown = false;

// Global radius value for the brush size
brushRadius = 5

// Globals that keep track of the mouses current and last position relative to the canvas object
oldx = 0;
oldy = 0;

newx = 0;
newy = 0;

// Draws a single filled circle at the location specified with radius of brushRadius. Draws a line from that circle to the next location
function userDraw()
{
    con.beginPath();
    con.lineCap = "round";
    con.lineJoin = "round";
    con.lineWidth = brushRadius;
    con.moveTo(oldx, oldy);
    con.lineTo(newx, newy);
    con.arc(newx, newy, brushRadius, 0, 2 * Math.PI);
    con.closePath();
    con.fill();
    con.stroke();
}

$(document).ready(function () {
    
    // Event for the mouse button being pressed down. Continuously draws a circle the size of the brush every 10ms until mouse up event
    $("#canvas").mousedown(function(event) {

        if (event.which == 1) mouseDown = true;

    });

    // Stops the current drawing if there is any
    $(document).mouseup(function(event) {

        if (event.which == 1) mouseDown = false;
        
    });

    // Updates the mouse position relative to the canvas and will attempt to draw if the mouse is down
    $("#canvas").mousemove(function(event){

        oldx = newx;
        oldy = newy;
        newx = event.pageX - $(this).offset().left;
        newy = event.pageY - $(this).offset().top;
        if (mouseDown) userDraw();
    });

}());
