function gamestatus(){
    this.turn = "A"; // A or B
    this.clickable = false;
    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message above the map
    this.draw = function(){
        context.beginPath();
        context.fillStyle = forecolor;
        context.font = "30px san-serif";
        context.textAlign = "center";
        context.fillText(this.message, canvas.width / 2, 40, 800);
        context.closePath();
    };
}