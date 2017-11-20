function gamestatus(tower_max, army_max, group_max){
    this.turn = "A"; // A or B
    this.change_turn = function(){
        if(this.turn=="A"){
            this.turn = "B";
        }
        else{
            this.turn = "A";
        }
    };
    this.change_if_not_complete = function(){
        this.change_turn();
        if(this.path_data[this.turn].vertices.length == dots.length)
            this.change_turn();
    }
    this.another_is_complete = function(){
        this.change_turn();
        var ret = (this.path_data[this.turn].vertices.length == dots.length);
        this.change_turn();
        return ret;
    }
    this.change_turn_and_commands = function(){
        commands[this.turn][0].show = false;
        commands[this.turn][1].show = false;
        this.change_turn();
        commands[this.turn][0].show = true;
        commands[this.turn][0].available = (this.path_data[this.turn].get_army() > 0);
        commands[this.turn][1].show = true;
        commands[this.turn][1].available = (!this.just_attacked[this.turn] && this.path_data[this.turn].can_fight());
    }
    this.timer = new ani_timer('');
    // null : selection time
    // "" : call initial
    // "initial" : animation for initialization
    // "path_const" : animation for path construction
    // "path_dest" : animation for path destroying
    // "tower_const" : animation for tower construction
    // "tower_dest" : animation for tower destroying
    // "phase" : animation for changing phase
    // "end" : animation for finish (forever)
    // ..etc?

    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message below the map
    this.message_index = null;
    this.path_data = {'A': new path(dots[0], 'A'), 'B': new path(dots[dots.length-1], 'B')};
    this.tower_max = tower_max;
    this.army_max = army_max;
    this.group_max = group_max;
    this.just_attacked = {'A': false, 'B': false};
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
                    if(this.get_dots_index(this.path_data[this.turn].vertices[j]) == i){
                        already = true;
                        break;
                    }
                }
                if(!already)
                    this.clickable.push(dots[i]);
            }
            if((dots[last_path].tower == this.turn || (dots[last_path].tower == null && this.path_data[this.turn].get_tower() < this.tower_max)) && dots[last_path].key != this.turn)
                this.clickable.push(dots[last_path]); //tower constructing or destroying

            if(pathlength > 1 && dots[last_path].tower != this.turn && !(this.another_is_complete()))
                this.clickable.push(this.path_data[this.turn].vertices[pathlength-2]); //path destroying
            
        }
    };

    this.set_a_clickable = function(){
        this.clickable = [];
        var _army = this.path_data[this.turn].get_army();
        var _group = this.path_data[this.turn].get_group();
        var _first_army = this.path_data[this.turn].army[0];
        if(_army > 0){
            this.clickable.push(commands[this.turn][0]);
        }
        if(!this.just_attacked[this.turn] && this.path_data[this.turn].can_fight()){
            this.clickable.push(commands[this.turn][1]);
        }
        if(_army < this.army_max && (_group < this.group_max || (_group == this.group_max && _first_army > 0)))
            this.clickable.push(this.path_data[this.turn].vertices[0]);
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
    this.a_action = function(key){
        if(key == this.turn){
            var to_create = Math.min(10, this.army_max - this.path_data[this.turn].get_army());
            this.path_data[this.turn].create_army(to_create);
            this.just_attacked[this.turn] = false;
        }
        else if(key == 'm'){
            this.path_data[this.turn].move_army();
            this.path_data[this.turn].fight_tower(2);
            this.just_attacked[this.turn] = false;
        }
        else if(key == 'a'){
            this.path_data[this.turn].fight_tower(10);
            this.just_attacked[this.turn] = true;
        }
        this.change_turn_and_commands();
        this.set_a_clickable();
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
                this.change_if_not_complete();
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(tm == 'path_dest'){
            if(this.path_data[this.turn].timer.message != 'destroying'){
                this.change_if_not_complete();
                this.message = 'Select vertex';
                this.set_d_clickable();
                this.timer.reset(null);
            }
        }
        else if(tm == 'tower_const'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'building')
                return;
            this.change_if_not_complete();
            this.message = "Select vertex";
            this.set_d_clickable();
            this.timer.reset(null);
        }
        else if(tm == 'tower_dest'){
            var msg = dots[this.message_index].timer.message;
            if(msg == 'destroying')
                return;
            this.change_if_not_complete();
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
                commands[this.turn][0].show = true;
                commands[this.turn][0].available = true;
                commands[this.turn][1].show = true;
                commands[this.turn][1].available = false;
            }
        }
        else{ //null & changing phase
            if(this.phase == 'D' &&
            this.path_data['A'].vertices.length == dots.length &&
            this.path_data['B'].vertices.length == dots.length){
                sounds.phasechangeplay();
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
        context.font = "15px monospace";
        context.textAlign = 'center';
        context.fillStyle = colors['A'];
        context.fillText("Tower " + this.path_data['A'].get_tower() + " / " + this.tower_max, dots[0].x, dots[0].y+dots[0].radius*2);
        context.fillText("Army  " + this.path_data['A'].get_army() +  " / " + this.army_max, dots[0].x, dots[0].y+dots[0].radius*2+20);
        context.fillText("Group " + this.path_data['A'].get_group() + " / " + this.group_max, dots[0].x, dots[0].y+dots[0].radius*2+40);
        context.fillStyle = colors['B'];
        context.fillText("Tower " + this.path_data['B'].get_tower() + " / " + this.tower_max, dots[dots.length-1].x, dots[dots.length-1].y+dots[dots.length-1].radius*2);
        context.fillText("Army  " + this.path_data['B'].get_army() + " / " + this.army_max, dots[dots.length-1].x, dots[dots.length-1].y+dots[dots.length-1].radius*2+20);
        context.fillText("Group " + this.path_data['B'].get_group() + " / " + this.group_max, dots[dots.length-1].x, dots[dots.length-1].y+dots[dots.length-1].radius*2+40);
        
    };
    this.draw_2 = function(){
        this.path_data['A'].draw_army();
        this.path_data['B'].draw_army();
    }
}