var slideWidth = 500;
var sliderTimer;
var offTimer;
$(".slider_wrap").width($(".slider_wrap").children().length * slideWidth);
$(".next_slide").click(AutoSliderNext);
$(".prev_slide").click(AutoSliderPrev);
var $index = $(".index");
sliderTimer = setInterval(nextSlideAuto,2000);

function AutoSliderNext() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(nextSlideAuto,2000);
}
function AutoSliderPrev() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(prevSlide,2000);
}

function nextSlide() {
    var currentSlide = parseInt($(".slider_wrap").data("current"));
    currentSlide++;
    if (currentSlide >= $(".slider_wrap").children().length) {
        currentSlide =0;
    }
    $index.text(currentSlide + 1);
    $(".slider_wrap").animate({
        left: -currentSlide * slideWidth
    }, 1000).data("current", currentSlide);
}// доб функци для смены автоматического слайдера на обычный


function nextSlideAuto() {
    var currentSlide = parseInt($(".slider_wrap").data("current"));
    currentSlide++;
    if(currentSlide>=$(".slider_wrap").children().length)
    {

        currentSlide=0;
    }
        $(".slider_wrap").animate({
            left: -currentSlide * slideWidth
        }, 1000).data("current", currentSlide);   
    $index.text(currentSlide+1);

}       

function prevSlide() {
    var currentSlide = parseInt($(".slider_wrap").data("current"));
    currentSlide--;
    if(currentSlide<0)
    {

        currentSlide=$(".slider_wrap").children().length-1;
    }
        $(".slider_wrap").animate({
            left: -currentSlide * slideWidth
        }, 1000).data("current", currentSlide);   
    $index.text(currentSlide+1);
} // доб функци для смены автоматического слайдера на обычный

function prevSlideAuto() {
    var currentSlide = 4;
    for (currentSlide; currentSlide >= 0; currentSlide--) {
        ($(".slider_wrap").animate({
            left: -currentSlide * slideWidth
        }, 1000).data("current", currentSlide)).delay(10000);
    }
}