function edge(vertex1, vertex2){
    this.v1 = vertex1;
    this.v2 = vertex2;
    this.color = midcolor;
    this.width = 60;
    this.draw = function(){
        context.beginPath();
        context.moveTo(this.v1.x, this.v1.y);
        context.lineTo(this.v2.x, this.v2.y);
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.stroke();
        context.closePath();
        context.fillStyle = this.color;
        context.arc(this.v1.x, this.v1.y, this.width/2, 0, Math.PI*2);
        context.fill();
        context.closePath();
        context.arc(this.v2.x, this.v2.y, this.width/2, 0, Math.PI*2);
        context.fill();
        context.closePath();
    };
}