function gamestatus(tower_max){
    this.turn = "A"; // A or B
    this.change_turn = function(){
        if(this.turn=="A"){
            this.turn = "B";
        }
        else{
            this.turn = "A";
        }
    };
    this.timer = new ani_timer('');
    // null : selection time
    // "" : call initial
    // "initial" : animation for initialization
    // "path_const" : animation for path construction
    // "path_dest" : animation for path destroying
    // "tower_const" : animation for tower construction
    // "tower_dest" : animation for tower destroying
    // "send_army" : animation for sending army
    // "phase" : animation for changing phase
    // "end" : animation for finish (forever)
    // ..etc?

    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message below the map
    this.message_index = null;
    this.path_data = {'A': new path(dots[0], 'A'), 'B': new path(dots[dots.length-1], 'B')};
    this.tower_num = {'A': 1, 'B': 1};
    this.tower_max = tower_max;
    //Variables for global
    this.clickable = [];

    // Variables about time(ms)
    this.intervals = {'phase': 1000, 'end': 1000};
    
    // Function for index
    this.get_dots_index = function(v){
        for(var i = 0 ; i < dots.length ; ++i){
            if(v.key == dots[i].key)
                return i;
        }
        return -1;
    };

    // Set clickable
    this.set_d_clickable = function(){
        this.clickable = [];
        var pathlength = this.path_data[this.turn].vertices.length;
        var last_v = this.path_data[this.turn].vertices[pathlength-1];
        var last_path = this.get_dots_index(last_v);
        for(var i = 0; i < dots.length ; ++i){
            if(edge_info[i][last_path] == 1){
                var already = false;
                for(var j = 0 ; j < pathlength ; ++j){
                    
                    //if(this.path[this.turn][j] == i){
                    if(this.get_dots_index(this.path_data[this.turn].vertices[j]) == i){
                        already = true;
                        break;
                    }
                }
                if(!already)
                    this.clickable.push(dots[i]);
            }
            if((dots[last_path].tower == this.turn || (dots[last_path].tower == null && this.tower_num[this.turn] < this.tower_max)) && dots[last_path].key != this.turn)
                this.clickable.push(dots[last_path]); //tower constructing or destroying

            if(pathlength > 1 && dots[last_path].tower != this.turn)
                this.clickable.push(this.path_data[this.turn].vertices[pathlength-2]); //path destroying
            
        }
    };

    this.set_a_clickable = function(){

    }

    /////

    this.d_action = function(index){
        var pathlength = this.path_data[this.turn].vertices.length;
        if(pathlength > 1 && this.get_dots_index(this.path_data[this.turn].vertices[pathlength-2]) == index){
            //destroy path
            this.path_data[this.turn].destroy_path();
            this.message = "Destroying Path..";
            this.timer.reset('path_dest');
            this.clickable = [];
        }
        else if(this.get_dots_index(this.path_data[this.turn].vertices[pathlength-1]) != index){
            //append path
            this.path_data[this.turn].build_path(dots[index]);
            this.message = "Building Path..";
            this.timer.reset('path_const');
            this.clickable = [];
        }
        else{ //tower
            if(dots[index].tower == null){
                dots[index].build_tower(this.turn); this.tower_num[this.turn]++;
                this.message = "Building Defence Tower..";
                this.message_index = index;
                this.timer.reset('tower_const');
                this.clickable = [];
            }
            else{
                dots[index].destroy_tower(); this.tower_num[this.turn]--;
                this.message = "Destroying Defence Tower..";
                this.message_index = index;
                this.timer.reset('tower_dest');
                this.clickable = [];
            }
        }
    };
    this.a_action = function(key){

    };
    this.action = function(key){
        if(this.phase=="D"){
            var index = 0;
            for(index = 0 ; index < dots.length ; ++index){
                if(dots[index].key == key)
                    break;
            }
            this.d_action(index);
        }
        else this.a_action(key);
    };
    this.update = function(){
        // update for animation and game status
        var tm = this.timer.message;
        if(tm == ''){
            dots[0].build_tower('A', 100);
            dots[dots.length-1].build_tower('B', 100);
            this.timer.reset('initial');
        }
        else if(tm == 'initial'){
            if(dots[0].timer.message != 'building'){
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(tm == 'path_const'){
            if(this.path_data[this.turn].timer.message != 'building'){
                this.change_turn();
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(tm == 'path_dest'){
            if(this.path_data[this.turn].timer.message != 'destroying'){
                this.change_turn();
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(tm == 'tower_const'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'building')
                return;
            this.change_turn();
            this.message = "Select vertex";
            this.set_d_clickable();
            this.timer.reset(null);
        }
        else if(tm == 'tower_dest'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'destroying')
                return;
            this.change_turn();
            this.message = "Select vertex";
            this.set_d_clickable();
            this.timer.reset(null);
        }
        else if(tm == 'phase'){
            if(this.timer.getrate(this.intervals[tm]) >= 1){
                this.turn = 'B';
                this.message = "Select vertex";
                this.set_a_clickable();
                this.timer.reset(null);
            }
        }
        else{ //null & changing phase
            if(this.phase == 'D' &&
            this.path_data['A'].vertices.length == dots.length &&
            this.path_data['B'].vertices.length == dots.length){
                this.phase = 'A';
                this.message = 'Phase Changed!';
                this.timer.reset('phase');
                this.clickable = [];
                this.path_data['A'].create_army(10);
                this.path_data['B'].create_army(10);
            }
            else if(this.phase == 'A'){
                //TODO : determine game over
            }
        }
    };
    this.draw_1 = function(){
        context.beginPath();
        //Message below
        context.font = "30px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        if(this.timer.message != "initial" && this.timer.message != "phase"){
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
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillText(this.phase + ' PHASE', 20, 20, 800);
        context.closePath();

        //Path
        this.path_data['A'].draw_path();
        this.path_data['B'].draw_path();

        //Tower Num
        context.beginPath();
        context.font = "15px Arial";
        context.textAlign = 'center';
        context.fillStyle = colors['A'];
        context.fillText("Tower " + this.tower_num['A'] + " / " + this.tower_max, dots[0].x, dots[0].y+dots[0].radius*2);
        context.fillStyle = colors['B'];
        context.fillText("Tower " + this.tower_num['B'] + " / " + this.tower_max, dots[dots.length-1].x, dots[dots.length-1].y+dots[dots.length-1].radius*2);
    };
    this.draw_2 = function(){
        this.path_data['A'].draw_army();
        this.path_data['B'].draw_army();
    }
}