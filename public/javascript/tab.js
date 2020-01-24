var videoUrl;

$(document).ready(function() {
    addVideoAndTuning();
});

$(window).resize(function() {
    videoWidth();
});

function addVideoAndTuning() {
    if($(".videoUrl").length > 0) { //If tab is associated with video
        videoUrl = document.querySelector(".videoUrl").innerHTML;
        document.querySelector(".videoUrl").remove();
        videoWidth();
    }
    if($("#tuning").length > 0) { //If tuning is not standard then add custom tuning
        document.querySelector("#tuning").innerHTML = document.querySelector(".tuning").innerHTML;
        document.querySelector(".tuning").remove();
    } 
}

function videoWidth() {
    if(videoUrl.length > 0) {
        var containerWidth = $(".tab-container").width();
        var tabWidth = $(".tab").width();
        var widthDiff = containerWidth - tabWidth;
        if(widthDiff < 400) {
            document.querySelector("#video").innerHTML = "<iframe width=\"425\" height=\"260\" src=\"https://www.youtube.com/embed/" + videoUrl + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        }
        else {
            document.querySelector("#video").innerHTML = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + videoUrl + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        }
    }
}