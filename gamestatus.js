function gamestatus(){
    this.turn = "A";
    this.clickable = false;
    this.phase = "1st";
    this.message = "게임을 시작합니다";
    this.draw = function(){
        context.beginPath();
        context.fillStyle = forecolor;
        context.font = "30px Arial";
        context.textAlign = "center";
        context.fillText(this.message, canvas.width / 2, 40, 800);
        context.closePath();
    };
}