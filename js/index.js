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