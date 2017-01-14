(function($){
    var dist = 0.0;
    var content;
    var time = 0.0;
    var speed = 2.0;

    function ani2() {
        dist = time - 100.0;
        content.style.marginLeft = dist + "vh";
    }

    function loop2(){
        if (time < 95) {
            ani();
            time += speed;
            speed /= 1.05;
            requestAnimationFrame(loop1);
        }
    }
     
    function ani() {
        dist = time - 95.0;
        content.style.marginLeft = dist + "vh";
    }

    function loop1(){
        if (time < 100) {
            ani();
            time += speed;
            speed /= 1.01;
            requestAnimationFrame(loop1);
        } 
    }

    function readyFn(){
        content = document.getElementsByClassName('main-content')[0];
        loop1();
    }
    
    $( document ).ready( readyFn );
    $( window ).load( readyFn );
})(jQuery);