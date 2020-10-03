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

// Global that tracks the color select button that is the currently selected color
var colorButton;

// Draws a line between two points - The first old position and new position
function userDraw()
{
    con.beginPath();
    con.lineCap = "round";
    con.lineJoin = "round";
    con.lineWidth = brushRadius * 4;
    con.moveTo(oldx, oldy);
    con.lineTo(newx, newy);
    con.closePath();
    con.fill();
    con.stroke();
}

$(document).ready(function () {
    
    // Causes the canvas to fill to the parent div size
    $("#canvas")[0].width = $(".canvasContainer")[0].offsetWidth - 50;
    $("#canvas")[0].height = $(".canvasContainer")[0].offsetHeight -15;

    // Event for the mouse button being pressed down. Continuously draws a circle the size of the brush every 10ms until mouse up event
    $("#canvas").mousedown(function(event) {

        if (event.which == 1) 
        {
            mouseDown = true;
            
            // this allows for dots. not just lines
            userDraw();
        }
        

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

    // Clicking one of the color selects
    $(".colorSelect").click(function(event){


    });

}());
