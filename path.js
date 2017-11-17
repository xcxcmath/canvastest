var xydelta = {
    'A':[-11, -6, 4, -8],
    'B':[7, 0, -9, 2]
};

function path(start_vertex, key){
    this.vertices = [start_vertex];
    this.key = key;

    this.army = [0];
    this.animation_interval = 800;
    this.timer = new ani_timer();

    //TODO: Path build/destroy sound..
    this.build_path = function(v){
        this.vertices.push(v);
        this.army.push(0);
        this.timer.reset('building');
    };

    this.destroy_path = function(){
        this.timer.reset('destroying');
    };

    //

    this.create_army = function(n){
        this.army[0] += n;
    }

    this.move_army = function(){
        for(var i = this.vertices.length - 2 ; i >= 0 ; --i){
            this.army[i+1] += this.army[i];
            this.army[i] = 0;
        }
    }

    this.get_tower = function(){
        var ret = 0;
        for(var i = 0 ; i < this.vertices.length ; ++i){
            ret += (this.vertices[i].tower == this.key);
        }
        return ret;
    }

    this.get_army = function(){
        var ret = 0;
        for(var i = 0 ; i < this.vertices.length ; ++i){
            ret += this.army[i];
        }
        return ret;
    }

    this.get_group = function(){
        var ret = 0;
        for(var i = 0 ; i < this.vertices.length ; ++i){
            ret += (this.army[i] > 0);
        }
        return ret;
    }

    //

    this.draw_path = function(){
        //line
        var l = this.vertices.length;
        context.strokeStyle = colors[this.key];
        context.lineWidth = 5;
        for(var i = 1 ; i < l-1 ; ++i){
            var this_v = this.vertices[i];
            var prev_v = this.vertices[i-1];
            context.beginPath();
            context.moveTo(prev_v.x+xydelta[this.key][0], prev_v.y+xydelta[this.key][1]);
            context.lineTo(this_v.x+xydelta[this.key][2], this_v.y+xydelta[this.key][3]);
            context.stroke();
        }
        if(l > 1){
            var r = this.timer.getrate(this.animation_interval);
            var last_v = this.vertices[l-1]; var lvx = last_v.x + xydelta[this.key][2], lvy = last_v.y + xydelta[this.key][3];
            var prev_v = this.vertices[l-2]; var pvx = prev_v.x + xydelta[this.key][0], pvy = prev_v.y + xydelta[this.key][1];
            var x = lvx, y = lvy;
            if(this.timer.message == 'building'){
                if(r > 1){
                    this.timer.reset(null);
                }
                else{
                    x = pvx + (lvx - pvx) * Math.sqrt(r);
                    y = pvy + (lvy - pvy) * Math.sqrt(r);
                }
            }
            else if(this.timer.message == 'destroying')
            {
                if(r>1){
                    this.vertices.pop();
                    this.army.pop();
                    this.timer.reset(null);
                    x = pvx;
                    y = pvy;
                }
                else{
                    x = pvx + (lvx - pvx) * Math.pow(1-r, 2);
                    y = pvy + (lvy - pvy) * Math.pow(1-r, 2);
                }
            }
            context.beginPath();
            context.moveTo(pvx, pvy);
            context.lineTo(x, y);
            context.stroke();
        }
    };

    this.draw_army = function(){
        //army
        context.font = '15px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        for(var i = 0; i < this.vertices.length ; ++i){
            if(this.army[i] != 0){
                var x = this.vertices[i].x;
                var y = this.vertices[i].y - this.vertices[i].radius / 2;
                var r = this.vertices[i].radius / 2;
                context.beginPath();
                context.strokeStyle = backcolor;
                context.lineWidth = 2;
                context.arc(x, y, r, 0, Math.PI*2);
                context.stroke();
                context.beginPath();
                context.fillStyle = army_colors[this.key];
                context.fillText(this.army[i], x, y, r);
            }
        }
    }
}