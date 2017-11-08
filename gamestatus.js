function gamestatus(){
    this.turn = "A"; // A or B
    this.change_turn = function(){
        if(this.turn=="A"){
            this.turn = "B";
        }
        else{
            this.turn = "A";
        }
    }
    this.timer = new ani_timer('');
    // null : selection time
    // "" : call initial
    // "initial" : animation for initialization
    // "path_const" : animation for path construction
    // "path_dest" : animation for path destroying
    // "tower_const" : animation for tower construction
    // "tower_dest" : animation for tower destroying
    // "send_army" : animation for sending army
    // "end" : animation for finish (forever)
    // ..etc?

    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message below the map
    this.message_index = null;
    this.path = {'A' : [0], 'B' : [dots.length-1]};

    //Variables for global
    this.clickable = [];

    // Variables about time(ms)
    this.intervals = {'end': 1000};
    
    // TODO : Map
    this.set_d_clickable = function(){
        this.clickable = [];
        var pathlength = this.path[this.turn].length;
        var last_path = this.path[this.turn][pathlength-1];
        for(var i = 0; i < dots.length ; ++i){
            if(edge_info[i][last_path] == 1){
                var already = false;
                for(var j = 0 ; j < pathlength ; ++j){
                    if(this.path[this.turn][j] == i){
                        already = true;
                        break;
                    }
                }
                if(!already)
                    this.clickable.push(dots[i]);
            }
            if(dots[last_path].tower == this.turn || dots[last_path].tower == null)
                this.clickable.push(dots[last_path]);

            if(pathlength > 1 && dots[last_path].tower != this.turn)
                this.clickable.push(dots[this.path[this.turn][pathlength-2]]);
            
        }
    }

    /////

    this.d_action = function(index){
        var pathlength = this.path[this.turn].length;
        if(pathlength > 1 && this.path[this.turn][pathlength-2] == index){
            this.path[this.turn].pop(); //append path
            this.change_turn();
            this.set_d_clickable();
        }
        else if(this.path[this.turn][pathlength-1] != index){
            this.path[this.turn].push(index); //destroy path
            this.change_turn();
            this.set_d_clickable();
        }
        else{ //tower
            if(dots[index].tower == null){
                dots[index].build_tower(this.turn);
                this.message = "Building Defence Tower..";
                this.message_index = index;
                this.timer.reset('tower_const');
                this.clickable = [];
            }
            else{
                dots[index].destroy_tower();
                this.message = "Destroying Defence Tower..";
                this.message_index = index;
                this.timer.reset('tower_dest');
                this.clickable = [];
            }
        }
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
        if(this.timer.message == ''){
            dots[this.path['A'][0]].build_tower('A', 100);
            dots[this.path['B'][0]].build_tower('B', 100);
            this.timer.reset('initial');
        }
        else if(this.timer.message == 'initial'){
            if(dots[this.path['A'][0]].timer.message != 'building'){
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(this.timer.message == 'tower_const'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'building')
                return;
            this.change_turn();
            this.message = "Select vertex";
            this.set_d_clickable();
            this.timer.reset(null);
        }
        else if(this.timer.message == 'tower_dest'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'destroying')
                return;
            this.change_turn();
            this.message = "Select vertex";
            this.set_d_clickable();
            this.timer.reset(null);
        }
    };
    this.draw = function(){
        context.beginPath();
        //Message below
        context.font = "30px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        if(this.timer.message != "initial"){
            context.fillStyle = colors[this.turn];
            context.fillText(this.message, canvas.width / 2, 560 + 20 * Math.exp(-0.001 * this.timer.getms()), 800);
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
        for(var i = 1 ; i < this.path['A'].length ; ++i){
            context.beginPath();
            context.strokeStyle = colors['A'];
            context.lineWidth = 5;
            context.moveTo(dots[this.path['A'][i-1]].x-11, dots[this.path['A'][i-1]].y-6);
            context.lineTo(dots[this.path['A'][i]].x+4, dots[this.path['A'][i]].y-8);
            context.stroke();
        }
        for(var i = 1 ; i < this.path['B'].length ; ++i){
            context.beginPath();
            context.strokeStyle = colors['B'];
            context.lineWidth = 5;
            context.moveTo(dots[this.path['B'][i-1]].x+7, dots[this.path['B'][i-1]].y);
            context.lineTo(dots[this.path['B'][i]].x-9, dots[this.path['B'][i]].y+2);
            context.stroke();
        }
        //Path animation

        //Tower animation
        //Army

        //Army animation

    };
}