function vertex(key, locx, locy, color = forecolor){
    this.key = key;
    this.x = locx;
    this.y = locy;
    this.radius = 20;
    this.color = color;
    this.labelfont = "15px Arial";

    this.tower = null; // A, B, null, init
    this.past_tower = null;
    this.towerHP = 0;
    this.animation_interval = 1000;
    this.timer = new ani_timer();

    this.build_tower = function(whos, hp = 50){
        this.tower = whos;
        this.towerHP = hp;
        this.timer.reset('building');
    };

    this.destroy_tower = function(){
        //TODO : tower destroying sounds..
        sounds.towerconstplay();
        this.towerHP = 0;
        this.past_tower = this.tower;
        this.tower = null;
        this.timer.reset('destroying');
    };

    this.draw_dust = function(rate, density = 10){
        for(var i = 0 ; i < density ; ++i){
            var x = this.x - this.radius * 3 + Math.random() * this.radius * 6;
            var y = this.y - this.radius + Math.random() * this.radius * 2;
            var r = Math.random() * 5;
            var a = Math.exp(-rate * 5);
            context.beginPath();
            context.fillStyle = plus_alpha('#fff', a);
            context.arc(x, y, r, 0, Math.PI*2);
            context.fill();
        }
    };

    this.draw = function(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
        context.fillStyle = backcolor;
        context.font = this.labelfont;
        context.textAlign = "center";
        context.textBaseline="middle";
        context.fillText(this.key, this.x, this.y+10, 100);
        context.closePath();

        var r = this.timer.getrate(this.animation_interval);
        if(this.timer.message == 'building'){
            if(r >= 1){
                sounds.towerconstplay();
                this.timer.reset('built');
            }
            else{
                var delta = canvas.height * Math.sqrt(1-r) / 2;
                context.beginPath();
                context.fillStyle = plus_alpha(colors[this.tower], r);
                context.fillRect(this.x-this.radius, this.y-this.radius*3-delta, this.radius*2, this.radius*3);
                context.font = this.labelfont;
                context.fillStyle = plus_alpha(backcolor, r);
                context.textAlign = "center";
                context.textBaseline = "top";
                context.fillText(this.towerHP.toString(), this.x, this.y-this.radius*3-delta, this.radius*2);
                context.closePath();
            }
        }
        else if(this.timer.message == 'destroying'){
            if(r >= 1){
                this.timer.reset(null);
            }
            else{
                var delta = this.radius * 3 * Math.sqrt(r);
                context.beginPath();
                context.fillStyle = colors[this.past_tower];
                context.fillRect(this.x-this.radius, this.y-this.radius*3 + delta, this.radius*2, this.radius*3 - delta);
                context.font = this.labelfont;
                context.fillStyle = backcolor;
                context.closePath();
                this.draw_dust(r);
            }
        }
        // DO NOT USE ELSEIF : if timer is reset above then draw it in this statements
        r = this.timer.getrate(this.animation_interval);
        if(this.timer.message == 'built'){
            if(r >= 1){
                this.timer.reset(null);
            }
            this.draw_dust(r);
        }
        if(this.tower != null && (this.timer.message == null || this.timer.message == 'built')){
            context.beginPath();
            context.fillStyle = colors[this.tower];
            context.fillRect(this.x-this.radius, this.y-this.radius*3, this.radius*2, this.radius*3);
            context.font = this.labelfont;
            context.fillStyle = backcolor;
            context.textAlign = "center";
            context.textBaseline = "top";
            context.fillText(this.towerHP.toString(), this.x, this.y-this.radius*3, this.radius*2);
            context.closePath();
        }
    };
}