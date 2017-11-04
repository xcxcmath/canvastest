function cursormanager(){
    this.x = 0;
    this.y = 0;
    this.delta = 0;
    this.onCanvas = function(){
        return (this.x >= 0 && this.y >= 0 && this.x <= canvas.width && this.y <= canvas.height);
    };
    this.updateCursor = function(evt){
        var rect = canvas.getBoundingClientRect();
        this.x = evt.clientX - rect.left;
        this.y = evt.clientY - rect.top;
        //this.x = evt.pageX;
        //this.y = evt.pageY;
    };
    this.update = function(){
        this.delta += 0.05;
        if(this.delta > Math.PI*2)
            this.delta -= Math.PI*2;
    };
    this.draw = function(vertexgroup){
        var catched = false;
        for(var i = 0 ; i < vertexgroup.length ; ++i)
        {
            var vx = vertexgroup[i].x;
            var vy = vertexgroup[i].y;
            var vr = vertexgroup[i].radius;
            var sq_dist = Math.pow(vx - this.x, 2) + Math.pow(vy - this.y, 2);
            if(sq_dist < Math.pow(vr * 1.5, 2)){
                context.beginPath();
                context.strokeStyle = forecolor;
                context.lineWidth = 3;
                context.arc(vx, vy, vr*1.4, this.delta, this.delta+5/3*Math.PI);
                context.stroke();
                catched = true;
            }
        }
        if(catched && this.onCanvas()){
            document.body.style.cursor = 'pointer';
        }
        else{
            document.body.style.cursor = 'default';
        }
    };
}