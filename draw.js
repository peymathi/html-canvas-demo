var canvas = $("#canvas")[0];

// Global connection to the canvas
var con = canvas.getContext("2d");
con.strokeStyle = "black";
con.fillStyle = "black";

// Global to tell if the mouse is down
mouseDown = false;

// Global radius value for the brush size
brushRadius = 5

// Global to remember if RGB mode is selected (custom color)
rgbActive = 0;

// Globals that keep track of the mouses current and last position relative to the canvas object
oldx = 0;
oldy = 0;

newx = 0;
newy = 0;

// Global that tracks the color select button that is the currently selected color
var colorButton = $("#black");

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

        // Change the prev selected border and set the new border
        colorButton.removeClass("selected");
        colorButton = $(this);
        colorButton.addClass("selected");
        
        if (rgbActive) rgbActive = false;

        // Change the brush color
        con.strokeStyle = $(this).attr('id');
        con.fillStyle = $(this).attr('id');

        $("#warning").hide();

    });

    // Clicking the custom color change
    $(".customColor").click(function(event){

        // Get data
        rgbActive = true;
        let rval = parseInt($("#customR").val());
        let gval = parseInt($("#customG").val());
        let bval = parseInt($("#customB").val());

        if (!(rval < 0 || rval > 255 || gval < 0 || gval > 255 || bval < 0 || bval > 255))
        {
            // Update brush
            con.strokeStyle = `rgb(${rval}, ${gval}, ${bval})`;
            con.fillStyle = `rgb(${rval}, ${gval}, ${bval})`;

            // Change colorButton
            colorButton.removeClass("selected");
            colorButton = $(this);
            colorButton.addClass("selected");

            $("#warning").hide();
        }

        else
        {
            $("#warning").show();
        }
    });

    // Changing the value of one of the custom color inputs
    $(".customInput").change(function(event){

        let rval = parseInt($("#customR").val());
        let gval = parseInt($("#customG").val());
        let bval = parseInt($("#customB").val());

        if (!(rval < 0 || rval > 255 || gval < 0 || gval > 255 || bval < 0 || bval > 255))
        {
            if (rgbActive)
            {
                con.strokeStyle = `rgb(${rval}, ${gval}, ${bval})`;
                con.fillStyle = `rgb(${rval}, ${gval}, ${bval})`;
            }

            $(".customColor").css('background-color', `rgb(${rval}, ${gval}, ${bval})`);
            $("#warning").hide();
        }

        else
        {
            $("#warning").show();
        }

    });

    // Clicking the image will reset the canvas
    $("#reset").click(function(event) {

        var color = con.fillStyle;
        con.fillStyle = "white";
        con.fillRect(0, 0, $("#canvas")[0].width, $("#canvas")[0].height);
        con.fillStyle = color;
    });

});
