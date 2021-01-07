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
    $('#site-header .btn-search-mobile').on('click', btnSearchClick);
    $('#site-header .site-header__tools .fa-times').on('click', btnCloseClick);
    $('#site-header .nav-search > .nav-link').on('click', btnToggleSearchDesktop);

    // site mask click
    $('.site-mask').on('click', siteMaskClick);

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

    // add class for story has gif image
    $('.story__thumb img[src$=".gif"]').parents('.story').addClass('story--gif');
});

/*customise function*/
// scoll down & pin site header
function windowScroll() {
    var headerHeight = $("#site-header").outerHeight();
    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        $("#site-header").addClass('is-pinned');
        $('#gotop').fadeIn();
    } else {
        $("#site-header").removeClass('is-pinned');
        $('#gotop').fadeOut();
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
    // hide search
    $('.btn-search-mobile .fa-search').show();
    $('.btn-search-mobile .fa-times').hide();
    $('#site-header .input-wrap-mobile').hide();
    $('body').addClass('is-expanded')
}

function btnSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandSearch();
    $('#searchInput-mobile').focus();
}

function btnCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    siteMaskClick();
}

function btnToggleSearchDesktop(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleSearchDesktop();
}

function expandSearch() {
    $('#site-header .input-wrap-mobile').toggle();
    $('.btn-search-mobile .fa-search').toggle();
    $('.btn-search-mobile .fa-times').toggle();
    // hide nav
    $('.btn-expand .fa-bars').show();
    $('.btn-expand .fa-times').hide();
    $('#site-header .nav').hide();
    $('body').addClass('is-expanded')
}

function siteMaskClick() {
    // e.preventDefault();
    // e.stopPropagation();
    $('#site-header .nav').hide();
    $('.btn-expand .fa-bars').show();
    $('.btn-expand .fa-times').hide();
    $('.btn-search-mobile .fa-search').show();
    $('.btn-search-mobile .fa-times').hide();
    $('#site-header .input-wrap-mobile').hide();
    $('body').removeClass('is-expanded');
}

function toggleSearchDesktop() {
    $('.nav-search > .nav-link').toggleClass('is-active');
    $('.nav-search .search-wrap').toggleClass('is-active');
}