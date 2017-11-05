function soundmanager(){
    this.mouseon = new Audio('assets/mouseon.mp3');
    this.mousedown = new Audio('assets/mousedown.mp3');
    this.towerconst = new Audio('assets/towerconst.mp3');
   
    this.mouseon.volume = 0.3;

    this.mouseonplay = function(){
        this.mouseon.pause();
        this.mouseon.currentTime = 0;
        this.mouseon.play();
    };
    this.mousedownplay = function(){
        this.mousedown.pause();
        this.mousedown.currentTime = 0;
        this.mousedown.play();
    };
    this.towerconstplay = function(){
        this.towerconst.pause();
        this.towerconst.currentTime = 0;
        this.towerconst.play();
    }
}