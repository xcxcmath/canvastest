function soundmanager(){
    this.bgsound = new Audio('assets/bgsound.ogg');
    this.mouseon = new Audio('assets/mouseon.mp3');
    this.mousedown = new Audio('assets/mousedown.mp3');
    this.towerconst = new Audio('assets/towerconst.mp3');
    this.phasechange = new Audio('assets/phasechange.mp3');
   
    this.mouseon.volume = 0.3;
    this.bgsound.currentTime = 0;
    this.bgsound.addEventListener('ended', function(e){
        this.currentTime = 48.6;
        this.play();
    });
    this.bgsound.addEventListener('timeupdate', function(){
        var buffer = .30;
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 48.6;
            this.play();
        }
    }, false);
    this.bgsound.volume = 0.6;
    this.bgsound.play();

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
    this.phasechangeplay = function(){
        this.phasechange.pause();
        this.phasechange.currentTime = 0;
        this.phasechange.play();
    }
}