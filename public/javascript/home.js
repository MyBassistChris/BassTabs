var myNav = $(".topnav");
window.onscroll = function () { 
    if (window.pageYOffset >= 200 ) {
        myNav.classList.add("navTransparent");
    } 
    else {
        myNav.classList.remove("navTransparent");
    }
};


//Fucntion returns how far picture animation should move to the right
function animateLength() {
    var width = window.innerWidth;
    var animation_width;
    if (width < 600) {
        animation_width = (.12*$('#aboutimg').parent().width())+'px';
        return [10, animation_width];
    }
    else if (width < 720) {
        animation_width = (.12*$('#aboutimg').parent().width())+'px';
        return [10, animation_width];
    }
    else if (width < 980) {
        animation_width = (.23*$('#aboutimg').parent().width())+'px';
        return [30, animation_width];
    }
    else {
        animation_width = (.20*$('#aboutimg').parent().width())+'px';
        return [160, animation_width];
    }
}

var animate = false;
window.onscroll = function () {
    widthArray = animateLength();
    if (window.pageYOffset >= widthArray[0] && !animate) {
        $("#aboutimg").animate({left: "+=" + widthArray[1]}, 450);
        animate = true;
    }
    else if (window.pageYOffset < widthArray[0] && animate) {
        $("#aboutimg").animate({left: "-=" + widthArray[1]}, 450);
        animate = false;
    }
};
