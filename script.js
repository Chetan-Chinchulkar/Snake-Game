function init()
{
    var canvas = document.getElementById("canvas");
    W = H = canvas.height = canvas.weight = 1000;
    pen = canvas.getContext("2d");
    food = randomFoodGenerator(); //generate food
    gameOver = false;
    score = 0;
    cs = 66;

    snake = {
        init_len: 3,
        color: "red",
        cells: [],
        direction: "right",

        createSnake: function()
        {
            for (var i = this.init_len; i > 0; i--)
            {
                this.cells.push({x: i, y: 0});
            }
        },

        drawSnake: function()
        {
            for (var i = 0; i < this.cells.length; i++)
            {
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs, cs);
            }
        },
    }
}