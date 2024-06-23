const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
             </svg>`

const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
              </svg>`

$(document).ready(function () {
    $('body, .circle').addClass(localStorage.getItem('mood'))
    if ($('body').hasClass('dark-mood')) {
        $('.circle').css({ "left": "100%", "transform": "translateX(-100%)" })
    }

})

//* GALLARY SLIDER ------------------> 
$('.owl-carousel.gallary').owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: true,
        }
    }
})

//* TESTMONIALS SLIDER ------------------> 
$('.owl-carousel.testmoials').owlCarousel({
    loop: true,
    margin: 30,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsiveClass: true,
    nav: true,

    responsive: {
        0: {
            items: 1,
            // nav: false
        },
        600: {
            items: 1,
            // nav: false
        },
        1000: {
            items: 2,
            loop: true
        }
    }
})

//* CAMERAS'S FILTER ----------> 
$(".kind-camera").on("click", function () {
    $(".kind-camera").removeClass("active")
    $(this).addClass("active")
    let $that = $(this)
    $(".camera-box").each(function () {
        $(this).removeClass("show-kind")

        if (($that).attr("data-btn-camera-kind") == $(this).attr("data-camera-kind")) {

            $(this).addClass("show-kind")
            $(".camera-box").fadeOut(0)
            setTimeout(() => {
                $(".camera-box.show-kind").fadeIn(600)
                $(".cameras").css("visibility", "visible")

            }, 0);
        }
        if ($($that).attr("data-btn-camera-kind") == "all") {
            $(".camera-box").fadeOut(0)
            setTimeout(() => {
                $(".camera-box").fadeIn(600)
            }, 10);
        }
    })
})

//* SHOW iMAGE ----------> 
let imagesSecArr = []
let imageSrc;
let currentIndex;
$(".gallary .owl-item").on("click", function () {
    imageSrc = $(this).find("img").attr("src")
    $(".display-image").append(`<img src=${imageSrc} />`)
    $(".display-image img").css({ "height": "85%" })

    $("body").css("overflow", "hidden")
    $(".display-image").css("display", "flex")
    $(".display-image img").attr("src", imageSrc)
    $(".gallary .owl-item").find('img').each(function () {
        let imgs = `<img src=${$(this).attr("src")}  />`

        imagesSecArr.push(imgs)
        imagesSecArr.map((el, indx) => {
            if ($(el).attr('src') == imageSrc) {
                currentIndex = indx

            }
        })
    })
})

//* NEXT SLIDE SHOW IMAGE ------------------> 
$(".next").on("click", function () {
    $(".display-image img").css("transform", "translateX(1700px)").fadeOut(900).remove()
    setTimeout(() => {
        $(".display-image img").attr("src", "")
        $(".display-image").append(imagesSecArr[currentIndex])
        $(".display-image img").css({ "height": "85%" })
    }, 300);

    if (imagesSecArr.length != currentIndex + 1) {
        currentIndex++
        $(".next").removeClass("disabled")
        $(".prev").removeClass("disabled")
    } else {
        $(".next").addClass("disabled")
    }
})

//* PREV SLIDE SHOW IMAGE ------------------> 
$(".prev").on("click", function () {
    $(".display-image img").css("transform", "translateX(-1700px)").fadeOut(900).remove()
    setTimeout(() => {
        $(".display-image img").attr("src", "")
        $(".display-image").append(imagesSecArr[currentIndex])
        $(".display-image img").css({ "height": "85%" })
    }, 300);
    if (currentIndex != 1) {
        currentIndex--
        // $(".prev").removeClass("disabled")
        $(".next").removeClass("disabled")
    } else {
        $(".prev").addClass("disabled")
    }
})

//* HIDE iMAGE ----------> 
$(".display-image .close").on("click", function () {
    $("body").css("overflow", "auto")
    $(".display-image").css("display", "none")
    $(".display-image img").remove()
    imagesSecArr = []
    currentIndex = 0
})
//* HIDE iMAGE ----------> 
$(".nav-item").on("click", function () {
    $(".offcanvas").removeClass("fade show").css("visibility", "hidden").attr("aria-hidden", "true").removeAttr("aria-modal role")
    $(".offcanvas-backdrop").removeClass(" show").remove()
    $('.navbar-toggler').click()
})

//* TOGGLE MOOD ----------> 
$(".mood ").on("click", function () {
    if (!$(this).children().hasClass("dark-mood")) {
        $(this).children().addClass("dark-mood").html(moon)
        $("body").addClass("dark-mood")
        $(this).children().css({ "left": "100%", "transform": "translateX(-100%)" })
        localStorage.setItem('mood', 'dark-mood');
    } else {
        localStorage.setItem('mood', 'light-mood');
        $(this).children().css({ "left": "0", "transform": "translateX(0)" })
        !$(this).children().removeClass("dark-mood").html(sun)
        $("body").removeClass("dark-mood")


    }
})