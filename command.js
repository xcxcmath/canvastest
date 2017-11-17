function command(key, locx, locy, whos, show = false, available = true){
    this.key = key;
    this.x = locx;
    this.y = locy;
    this.whos = whos;
    this.radius = 20;
    this.labelfont = '30px Arial';
    this.show = show;
    this.available = available;

    this.draw = function(){
        if(this.show){
            context.beginPath();
            if(this.available)
                context.fillStyle = army_colors[this.whos];
            else
                context.fillStyle = '#444';
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fill();
            context.beginPath();
            context.font = this.labelfont;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(this.key, this.x, this.y, , this.radius*2);
            context.closePath();
        }
    };
}