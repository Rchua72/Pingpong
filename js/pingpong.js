var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

var pingpong = function () {
    var scoreA = 0;
    var scoreB = 0;
    var Keys = [];
    var ball = {
        speed: 5,
        directionX: 1,
        directionY: 1
    }

    function setPingPongTimer(func) {
        setInterval(func, 30);
    }

    function monitorPingPongKeys() {
        $(document).keydown(function (e) {
            Keys[e.keyCode] = true;
        });
        $(document).keyup(function (e) {
            Keys[e.keyCode] = false;
        });
    }

    function movePingPongBall() {
        // get ball and playground details
        var ballTop = parseInt($("#ball").css("top"));
        var ballLeft = parseInt($("#ball").css("left"));
        var playgroundHeight = parseInt($("#playground").height());
        var playgroundWidth = parseInt($("#playground").width());

        // check playground boundary
        // check bottom
        if (ballTop + ball.speed * ball.directionY > playgroundHeight) {
            ball.directionY = -1;
        }
        // check top
        if (ballTop + ball.speed * ball.directionY < 0) {
            ball.directionY = 1;
        }
        // check right
        if (ballLeft + ball.speed * ball.directionX > playgroundWidth) {
            // player B lost.		
            scoreA++;
            $("#scoreA").html(scoreA);

            // reset the ball;
            $("#ball").css({
                "left": "250px",
                "top": "100px"
            });

            // update ball location details
            ballTop = parseInt($("#ball").css("top"));
            ballLeft = parseInt($("#ball").css("left"));
            ball.directionX = -1;
        }
        // check left
        if (ballLeft + ball.speed * ball.directionX < 0) {
            // player A lost.		
            scoreB++;
            $("#scoreB").html(scoreB);

            // reset the ball;
            $("#ball").css({
                "left": "150px",
                "top": "100px"
            });

            // update the ball location details
            ballTop = parseInt($("#ball").css("top"));
            ballLeft = parseInt($("#ball").css("left"));
            ball.directionX = 1;
        }

        // check left paddle
        var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
        var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
        var paddleAYTop = parseInt($("#paddleA").css("top"));
        if (ballLeft + ball.speed * ball.directionX < paddleAX) {
            if (ballTop + ball.speed * ball.directionY <= paddleAYBottom &&
                ballTop + ball.speed * ball.directionY >= paddleAYTop) {
                ball.directionX = 1;
            }
        }

        // check right paddle
        var paddleBX = parseInt($("#paddleB").css("left"));
        var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
        var paddleBYTop = parseInt($("#paddleB").css("top"));
        if (ballLeft + ball.speed * ball.directionX >= paddleBX) {
            if (ballTop + ball.speed * ball.directionY <= paddleBYBottom &&
                ballTop + ball.speed * ball.directionY >= paddleBYTop) {
                ball.directionX = -1;
            }
        }


        // move the ball with speed and direction
        $("#ball").css({
            "left": ballLeft + ball.speed * ball.directionX,
            "top": ballTop + ball.speed * ball.directionY
        });
    }

    function movePingPongPaddles() {
        // check if a key is pressed. 
        if (Keys[KEY.UP]) // arrow up
        {
            // move the paddle B up 5 pixels
            var top = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top", top - 5);
        }
        if (Keys[KEY.DOWN]) // arrow down
        {
            // move the paddle B down 5 pixels
            var top = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top", top + 5);
        }
        if (Keys[KEY.W]) // w
        {
            // move the paddle A up 5 pixels
            var top = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top", top - 5);
        }
        if (Keys[KEY.S]) // s
        {
            // move the paddle A down 5 pixels
            var top = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top", top + 5);
        }
    }


    return {
        setTimer: setPingPongTimer,
        monitorKeys: monitorPingPongKeys,
        moveBall: movePingPongBall,
        movePaddles: movePingPongPaddles
    }

}();


$(function(){
    // call gameloop every 30 milliseconds
    pingpong.setTimer(gameloop);
	
	// need to remember what key is down and up
    pingpong.monitorKeys();
});

function gameloop()
{
	pingpong.moveBall();
	pingpong.movePaddles();
}
