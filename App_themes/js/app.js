// init function
var isMobile, isTablet, isDesktop;

$(function() {
    /*check device width*/
    bsContainerWidth = $("body").find('.wrapper').outerWidth();
    if (bsContainerWidth < 768) {
        console.log("mobile");
        isMobile = true;
    } else if (bsContainerWidth < 960) {
        console.log("tablet");
        isTablet = true;
    } else {
        console.log("desktop");
        isDesktop = true;
    }

    /*pin header */
    window.onscroll = function() { windowScroll() };

    // fix URL click on bxslider
    if (window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0) {
        $("body").on("mousedown", ".bx-viewport a", function() {
            if ($(this).attr("href") && $(this).attr("href") != "#") {
                window.location = $(this).attr("href");
            }
        });
    }

    /*slider*/
    // index slider
    var highlightSlider = $('.zone--highlight .slider')
    if (highlightSlider.length > 0) {
        highlightSlider.bxSlider({
            auto: 1,
            minSlides: 1,
            maxSlides: 1,
            pager: 0,
            nextText: '',
            prevText: '',
            nextSelector: ".slider-next",
            prevSelector: ".slider-prev"
        });
    }
    // detail slider
    var detailSlider = $('.detail-wrap .bxslider')
    if (detailSlider.length > 0) {
        detailSlider.bxSlider({
            auto: 1,
            minSlides: 1,
            maxSlides: 1,
            pagerType: 'short',
            captions: true,
            controls: 0
        });
    }
    // button click
    $('#site-header .btn-expand').on('click', btnExpandClick);

    // tab zone calendar
    if ($('.zone--calendar').length > 0) {
        $(".zone__nav a").on('click', function() {
            var direction = $(this).attr('aria-controls');
            $('.zone--calendar .zone__title').removeClass('active');
            $('.zone--calendar #' + direction + '-title').addClass('active');
        });
    }
    // swap thumb for vertical story
    if ($('.story--vertical').length > 0 && isMobile) {
        var newSrc = $('.story--vertical').find('.story__thumb img').attr('data-src');
        $('.story--vertical').find('.story__thumb img').attr('src', newSrc);
    }
});

/*customise function*/
// scoll down & pin site header
function windowScroll() {
    var headerHeight = $("#site-header").outerHeight();
    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        $("#site-header").addClass('is-pinned');
    } else {
        $("#site-header").removeClass('is-pinned');
    }
}

function btnExpandClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandNav();
}

function expandNav() {
    $('#site-header .nav').toggle();
    $('.btn-expand .fa-bars').toggle();
    $('.btn-expand .fa-times').toggle();
}