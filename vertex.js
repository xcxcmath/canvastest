function vertex(key, locx, locy, color = forecolor){
    this.key = key;
    this.x = locx;
    this.y = locy;
    this.radius = 20;
    this.color = color;
    this.labelfont = "20px Arial";
    this.labelcolor = backcolor;
    this.draw = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
        context.fillStyle = this.labelcolor;
        context.font = this.labelfont;
        context.textAlign = "center";
        context.textBaseline="middle";
        context.fillText(this.key, this.x, this.y, 100);
        context.closePath();
    };
}