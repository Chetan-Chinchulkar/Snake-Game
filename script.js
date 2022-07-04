cs = 66;
foodImg = new Image();
foodImg.src = "assets/food.png";
trophyImg = new Image();
trophyImg.src = "assets/trophy.png";

function init()
{
    var canvas = document.getElementById("myCanvas");
    W = H = canvas.height = canvas.weight = 800;
    pen = canvas.getContext("2d");
    food = randomFoodGenerator(); //generate food
    gameOver = false;
    score = 0;

    snake = {
        init_len: 3,
        color: "black",
        cells: [],
        direction: "down",

        createSnake: function()
        {
            for (var i = this.init_len; i >= 0; i--)
            {
                this.cells.push({x: i, y: 0});
            }
        },

        drawSnake: function()
        {
            for (var i = 0; i < this.cells.length; i++)
            {
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs-2, cs-2);
            }
        },

        updateSnake: function()
        {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if (headX == food.x && headY == food.y)
            {
                food = randomFoodGenerator();
                score++;
            }
            else
            {
                this.cells.pop();
            }
            
            var newHead = {x: headX, y: headY};
            switch (this.direction)
            {
                case "right":
                    newHead.x++;
                    break;
                case "left":
                    newHead.x--;
                    break;
                case "up":
                    newHead.y--;
                    break;
                case "down":
                    newHead.y++;
                    break;
            }
            this.cells.unshift(newHead);
            // this.cells.pop();

            // Game Over Condition
            if (this.cells[0].x < 0 || this.cells[0].x > W/cs || this.cells[0].y < 0 || this.cells[0].y > H/cs)
            {
                gameOver = true;
            }
            // Game over condition when snake touches itself
            for (var i = 1; i < this.cells.length; i++)
            {
                if (this.cells[0].x == this.cells[i].x && this.cells[0].y == this.cells[i].y)
                {
                    gameOver = true;
                }
            }

        }
    };

    function keyPressed(e)
    {
        if ( (e.keyCode == "37"||e.key == "ArrowLeft") && this.direction != "right")
        {
            snake.direction = "left";
        }
        else if ( (e.keyCode == "38"||e.key == "ArrowUp") && snake.direction != "down")
        {
            snake.direction = "up";
        }
        else if ( (e.keyCode == "39"||e.key == "ArrowRight") && snake.direction != "left")
        {
            snake.direction = "right";
        }
        else if ((e.keyCode == "40"||e.key == "ArrowDown") && snake.direction != "up")
        {
            snake.direction = "down";
        }
    }

    document.addEventListener('keydown', keyPressed);
    snake.createSnake();
}

function randomFoodGenerator()
{
    var food = {
        x: Math.round(Math.random() * (W - cs) / cs),
        y: Math.round(Math.random() * (H - cs) / cs),
        color: "red"
    };
    return food;
}

function update()
{
    snake.updateSnake();
}

function draw()
{
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = pen.color;
    pen.drawImage(foodImg, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(trophyImg,18,20,2.5*cs,2.5*cs);
    pen.fillStyle = "red";
    pen.font = "20px Roboto";
    pen.fillText(score, 1.5*cs-3, 1.5*cs-15);

}

function gameloop()
{
    
    if(gameOver)
    {
        clearInterval(f);
        alert("Game Over! Your score is " + score);
    }
    draw();
    update();
    
}


init();

var f = setInterval(gameloop,100);