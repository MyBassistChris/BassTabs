$(document).ready(function() {
    videoWidth();
    if($("#tuning").length > 0) {
        document.querySelector("#tuning").innerHTML = document.querySelector(".tuning").innerHTML;
        document.querySelector(".tuning").innerHTML = "";
    } 
});

function videoWidth {
    if($(".videoUrl").length > 0) { //If tab is associated with video
        var videoUrl = document.querySelector(".videoUrl").innerHTML;
        document.querySelector(".videoUrl").remove;
        var containerWidth = $(".tab-container").width();
        var tabWidth = $(".tab").width();
        console.log(containerWidth + " " + tabWidth);
        var widthDiff = containerWidth - tabWidth;
        if(widthDiff < 400) {
            document.querySelector("#video").innerHTML = "<iframe width=\"425\" height=\"260\" src=\"https://www.youtube.com/embed/" + videoUrl + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        }
        else {
            document.querySelector("#video").innerHTML = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/" + videoUrl + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        }
    }
}