function ani_timer(init_message = null){
    this.pivot = performance.now();
    this.message = init_message;
    
    this.getms = function(){
        return performance.now() - this.pivot;
    }
    this.reset = function(message){
        this.pivot = performance.now();
        this.message = message;
    }
    this.getrate = function(i){
        return this.getms() / i;
    }
}