function gamestatus(){
    this.turn = "A"; // A or B

    this.animation = "initial"; // Animation between selections
    // null : selection time
    // "initial" : animation for initialization
    // "path_const" : animation for path construction
    // "path_dest" : animation for path destroying
    // "tower_const" : animation for tower construction
    // "tower_dest" : animation for tower destroying
    // "send_army" : animation for sending army
    // "end" : animation for finish (forever)
    // ..etc?

    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message above the map
    this.a_path = [0];
    this.a_tower = [0];
    this.a_plus = dots[0];
    this.b_path = [dots.length-1];
    this.b_tower = [0];
    this.b_plus = dots[dots.length-1];

    //Variables for global
    this.clickable = [];

    // Variables about time(ms)
    this.pivot_time = performance.now();

    this.initial_interval = 1600;
    this.message_interval = 500;
    this.ani_interval = 1000; // sending, constructing, destroying, etc.
    this.end_interval = 1000;

    // Functions about time(ms)
    this.time_from_pivot = function(){
        return performance.now() - this.pivot_time;
    }
    this.reset_pivot = function(){
        this.pivot_time = performance.now();
    }
    this.pivot_rate = function(i){
        return this.time_from_pivot() / i;
    }
    
    // TODO : Map
    this.set_d_clickable = function(){
        this.clickable = [];
        if(this.turn == "A"){
            for(var i = 0 ;i < dots.length ; ++i){
                if(edge_info[i][this.a_path[this.a_path.length-1]] == 1){
                    var already = false;
                    for(var j = 0 ; j < this.a_path.length ; ++j){
                        if(this.a_path[j] == i){
                            already = true;
                            break;
                        }
                    }
                    if(!already)
                        this.clickable.push(dots[i]);
                }
            }
        }
        else{
            for(var i = 0 ;i < dots.length ; ++i){
                if(edge_info[i][this.b_path[this.b_path.length-1]] == 1){
                    var already = false;
                    for(var j = 0 ; j < this.b_path.length ; ++j){
                        if(this.b_path[j] == i){
                            already = true;
                            break;
                        }
                    }
                    if(!already)
                        this.clickable.push(dots[i]);
                }
            }
        }
    }

    /////

    this.d_action = function(index){
        if(this.turn=="A"){
            this.a_path.push(index);
            this.turn = "B";
        }
        else{
            this.b_path.push(index);
            this.turn = "A";
        }
        this.message = "Select new vertex";
        this.set_d_clickable();
        this.reset_pivot();
    };
    this.a_action = function(index){

    };
    this.action = function(key){
        var index = 0;
        for(index = 0 ; index < dots.length ; ++index){
            if(dots[index].key == key)
                break;
        }
        if(this.phase=="D") this.d_action(index);
        else this.a_action(index);
    };
    this.update = function(){
        // update for animation and game status
    };
    this.draw = function(){
        context.beginPath();
        //Message above
        context.font = "30px Arial";
        context.textAlign = "center";
        if(this.animation != "initial"){
            if(this.turn == "A"){
                context.fillStyle = acolor;
            }
            else{
                context.fillStyle = bcolor;
            }
            context.fillText(this.message, canvas.width / 2, 560 + 20 * Math.exp(-0.001 * this.time_from_pivot()), 800);
        }
        else{
            context.fillStyle = forecolor;
            context.fillText(this.message, canvas.width / 2, 560, 800);
        }
        context.closePath();

        //Phase
        context.beginPath();
        context.fillStyle = forecolor;
        context.font = "30px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.phase, 20, 20, 800);
        context.closePath();
        //Path
        for(var i = 1 ; i < this.a_path.length ; ++i){
            context.beginPath();
            context.strokeStyle = acolor;
            context.lineWidth = 5;
            context.moveTo(dots[this.a_path[i-1]].x-11, dots[this.a_path[i-1]].y-6);
            context.lineTo(dots[this.a_path[i]].x+4, dots[this.a_path[i]].y -8);
            context.stroke();
        }
        for(var i = 1 ; i < this.b_path.length ; ++i){
            context.beginPath();
            context.strokeStyle = bcolor;
            context.lineWidth = 5;
            context.moveTo(dots[this.b_path[i-1]].x-11, dots[this.b_path[i-1]].y-6);
            context.lineTo(dots[this.b_path[i]].x+4, dots[this.b_path[i]].y -8);
            context.stroke();
        }
        //Path animation

        //Tower
        for(var i = 0 ; i < this.a_path.length ; ++i)
        {
            var this_a = dots[this.a_path[i]];
            if(this.a_tower[i] > 0){
               context.beginPath();
               context.fillStyle = acolor;
               context.moveTo(this_a.x - this_a.radius, this_a.y);
               context.lineTo(this_a.x + this_a.radius, this_a.y);
               context.lineTo(this_a.x, this_a.y - this_a.radius*3);
               context.closePath();
               context.fill();
               context.fillStyle = acolor;
               context.font = towerfont;
               context.textAlign = "center";
               context.textBaseline="middle";
               context.fillText(this.a_tower[i].toString(), this_a.x, this_a.y - this_a.radius*3.5, 800);
               context.closePath();
            }
        }
        for(var i = 0 ; i < this.b_path.length ; ++i)
        {
            var this_b = dots[this.b_path[i]];
            if(this.b_tower[i] > 0){
                context.beginPath();
                context.fillStyle = bcolor;
                context.moveTo(this_b.x - this_b.radius, this_b.y);
                context.lineTo(this_b.x + this_b.radius, this_b.y);
                context.lineTo(this_b.x, this_b.y - this_b.radius*3);
                context.closePath();
                context.fill();
                context.fillStyle = bcolor;
                context.font = towerfont;
                context.textAlign = "center";
                context.textBaseline="middle";
                context.fillText(this.b_tower[i].toString(), this_b.x, this_b.y - this_b.radius*3.5, 800);
                context.closePath();
            }
        }
        //Tower animation
        if(this.animation == "initial"){
            if(this.pivot_rate(this.initial_interval) >= 1){
                sounds.towerconstplay();
                this.a_tower[0] = 100;
                this.b_tower[0] = 100;
                this.animation = null;
                this.message = "Select new vertex";
                this.set_d_clickable();
                this.reset_pivot();
            }
            else{
                context.beginPath();
                context.fillStyle = acolor;
                var new_x = this.a_plus.x;
                var new_y = this.a_plus.y - canvas.height * Math.pow((1-this.pivot_rate(this.initial_interval)), 0.5);
                context.moveTo(new_x - this.a_plus.radius, new_y);
                context.lineTo(new_x + this.a_plus.radius, new_y);
                context.lineTo(new_x, new_y - this.a_plus.radius*3);
                context.closePath();
                context.fill();

                context.beginPath();
                context.fillStyle = bcolor;
                new_x = this.b_plus.x;
                new_y = this.b_plus.y - canvas.height * Math.pow((1-this.pivot_rate(this.initial_interval)), 0.5);
                context.moveTo(new_x - this.b_plus.radius, new_y);
                context.lineTo(new_x + this.b_plus.radius, new_y);
                context.lineTo(new_x, new_y - this.b_plus.radius*3);
                context.closePath();
                context.fill();
            }
        }
        else if(this.animation == "tower_const"){

        }
        else if(this.animation == "tower_dest"){

        }
        //Army

        //Army animation

    };
}