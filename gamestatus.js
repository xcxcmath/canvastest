function gamestatus(dotA, dotB){
    this.turn = "A"; // A or B

    this.animation = "initial"; // Animation between selections
    // null : selection time
    // "initial" : animation for initialization
    // "message" : animation for message
    // "path_const" : animation for path construction
    // "path_dest" : animation for path destroying
    // "tower_const" : animation for tower construction
    // "tower_dest" : animation for tower destroying
    // "send_army" : animation for sending army
    // ..etc?

    this.phase = "D"; // D phase or A phase
    this.message = "Game start"; //Message above the map
    this.a_way = [dotA];
    this.a_tower = [true];
    this.b_way = [dotB];
    this.a_tower = [true];

    // Variables about time(ms)
    this.initial_interval = 1000;
    this.message_interval = 500;
    this.ani_interval = 1000; // sending, constructing, destroying, etc.
    this.end_interval = 1000;


    //
    this.update = function(){
        // update for animation and game status
    };
    this.draw = function(){
        context.beginPath();
        context.fillStyle = forecolor;
        context.font = "30px Arial";
        context.textAlign = "center";
        context.fillText(this.message, canvas.width / 2, 40, 800);
        context.closePath();
    };
}