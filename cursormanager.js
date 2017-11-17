function cursormanager(){
    this.x = 0;
    this.y = 0;
    this.key = null;
    this.delta = 0;
    this.onCanvas = function(){
        return (this.x >= 0 && this.y >= 0 && this.x <= canvas.width && this.y <= canvas.height);
    };
    this.updateCursor = function(evt){
        var rect = canvas.getBoundingClientRect();
        this.x = evt.clientX - rect.left;
        this.y = evt.clientY - rect.top;
    };
    this.onClick = function(evt){
        if(this.key != null){
            sounds.mousedownplay();
            stat.action(this.key);
        }
    }
    this.update = function(){
        this.delta += 0.025;
        if(this.delta > Math.PI*2)
            this.delta -= Math.PI*2;
    };
    this.draw = function(buttongroup){ //Upper: vertex // Lower: command
        var catched = false;
        for(var i = 0 ; i < buttongroup.length ; ++i)
        {
            var vx = buttongroup[i].x;
            var vy = buttongroup[i].y;
            var vr = buttongroup[i].radius;
            var sq_dist = Math.pow(vx - this.x, 2) + Math.pow(vy - this.y, 2);
            if(sq_dist < Math.pow(vr * 1.5, 2)){
                context.beginPath();
                context.strokeStyle = forecolor;
                context.lineWidth = 3;
                context.arc(vx, vy, vr*1.4, this.delta, this.delta+5/3*Math.PI);
                context.stroke();
                catched = true;
                if(this.key != buttongroup[i].key){
                    this.key = buttongroup[i].key;
                    sounds.mouseonplay();
                }
            }
        }
        if(catched && this.onCanvas()){
            document.body.style.cursor = 'pointer';
        }
        else{
            this.key = null;
            document.body.style.cursor = 'default';
        }
    };
}