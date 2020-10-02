
$(document).ready(function () {

    var canvas = $("#canvas")[0];
    var con = canvas.getContext("2d");

    con.strokeStyle = "red";

    // Global bool that keeps the pointer drawing
    keepDrawing = true;
    
    $("#canvas").mousedown(function(){

        keepDrawing = true;
        while (keepDrawing)
        {   
            var randx = Math.random() * 800
            var randy = Math.random() * 600
            con.beginPath()
            con.moveTo(randx, randy);
            con.lineTo(randx, randy);
            con.stroke();
        }

    });

    $(document).mouseup(function(){keepDrawing = false;});

}());
