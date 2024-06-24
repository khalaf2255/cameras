// import { lang } from './../js/translate.js'
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
        $('.mood').children().addClass("dark-mood").html(moon)
    } else {
        $('.mood').children().addClass("dark-mood").html(sun)
    }

    $('body').attr("lang", localStorage.getItem('lang')).addClass(`${localStorage.getItem('lang')}-direction`).removeClass("isLoading")
    $('.loader').fadeOut()
    $(".lang-text").each(function () {
        let key = $(this).attr("key")
        let htmlElement = lang[$("body").attr("lang")][key]
        $(this).html(htmlElement)
    })
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
    }, 100);

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
    }, 100);
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

//* TOGGLE MOOD ----------> 
$(".mood").on("click", function () {
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



//* TRANSLATE PAGE ----------> 
const lang = {
    en: {
        loading: "Loading...",
        tit: "The camera",
        desc: "Let's steal a moment from life",
        home: "Home",
        gallary: "Gallary",
        cameras: "Cameras",
        testmonials: "Testmonials",
        translate: "Langauge",
        langBtn: "العربية",
        whatCanDoTitle: "What Can camera does?",
        btnHero: "Call now",
        capturePhotos: "Capture Photos",
        takeStillImage: "Take still images",
        recordVideos: "Record Videos",
        captureImage: "Capture moving images with sound",
        zoomInOut: "Zoom In/Out",
        adjustLens: "Adjust the lens to focus on distant or close subjects",
        adjustFocus: "Adjust Focus",
        automaticManual: "Automatically or manually focus on subjects",
        changeExposure: "Change Exposure",
        adjustAmount: "Adjust the amount of light entering the camera",
        changeISO: "Change ISO Settings",
        controlCamera: "Control the camera’s sensitivity to light",
        applyFilters: "Apply Filters",
        addartistic: "Add artistic effects to photos and videos",
        shootBurstMode: "Shoot in Burst Mode",
        captureSeveralPhotos: "Capture several photos in quick succession",
        captureSeveralPhotos: "",
        gallaryHead: "gallary",
        cameraKind: "Kind of cameras",
        testmoials: "testmoials",
        contacts: "Contact us",
        all: "All",
        canon: "Canon",
        nikon: "Nikon",
        sony: "Sony",
        descCamera: "Canon Inc. is a Japanese multinational corporation known for its imaging and optical products, including cameras, camcorders, printers, and medical",
        descCamList1: "Headquarters: Ota, Tokyo, Japan",
        descCamList2: "Development: Initially focused on manufacturing 35mm cameras, Canon expanded",
        closeBtn: "Close",
        showDetails: "Show details",
        testmonialsParagraphX: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae iure assumenda non itaque labore repellat recusandae consequuntur et voluptatem quo, provident dignissimos placeat odio accusantium aut aliquam! Deleniti, quia.",
        clientName: "Client name",
        username: "Username",
        email: "Email",
        subject: "Subject",
        message: "Message",
        addressTitle: "Address",
        callUs: "Call us",
        emailUs: "Email us",
        address: "A108 Adam Street, New York, NY 535022",
        submit: "Send message",

    },
    ar: {
        loading: "جاري التحميل...",
        tit: "الكاميرا",
        desc: "هيا لنسرق من الحياة لحظة",
        home: "الرئيسية",
        gallary: "معرض الصور",
        cameras: "الكاميرات",
        testmonials: "أراء العملاء",
        contacts: "تواصل معنا",
        translate: "اللغة",
        langBtn: "English",
        whatCanDoTitle: "ماذا تستطيع أن تفعل الكاميرا؟",
        btnHero: "إتصل الآن",
        capturePhotos: "إلتقاط الصور",
        takeStillImage: "إلتقاط الصور الثابتة",
        recordVideos: "تسجيل فيدوهات",
        captureImage: "التقاط الصور المتحركة بالصوت",
        zoomInOut: "تكبير وتصغير",
        adjustLens: "اضبط العدسة للتركيز على الأهداف البعيدة أو القريبة",
        adjustFocus: "ضبط التركيز",
        automaticManual: "التركيز تلقائيًا أو يدويًا على الموضوعات",
        changeExposure: "تغيير التعرض",
        adjustAmount: "ضبط كمية الضوء الداخلة إلى الكاميرا",
        changeISO: "تغيير إعدادات ISO",
        controlCamera: "التحكم في حساسية الكاميرا للضوء",
        addartistic: "إضافة تأثيرات فنية على الصور ومقاطع الفيديو",
        shootBurstMode: "تبادل لاطلاق النار في وضع الاندفاع",
        applyFilters: "تطبيق التأثيرات المخلفتة",
        captureSeveralPhotos: "التقاط عدة صور في تتابع سريع",
        gallaryHead: "معرض الصور",
        cameraKind: "أنواع الكاميرات",
        testmoials: "أراء عملائنا",
        all: "الجميع",
        canon: "كانون",
        nikon: "نيكون",
        sony: "سوني",
        descCamera: "شركة كانون هي شركة يابانية متعددة الجنسيات معروفة بصناعتها للتصوير والتصوير  المنتجات البصرية، بما في ذلك الكاميرات وكاميرات الفيديو والطابعات والطبية",
        descCamList1: "المقر الرئيسي: أوتا، طوكيو، اليابان",
        descCamList2: "التطوير: ركزت شركة كانون في البداية على تصنيع كاميرات 35 ملم موسع",
        closeBtn: "إغلاق",
        showDetails: "التفاصيل",
        testmonialsParagraphX: "لقد اشتريت مؤخرًا جهاز القهوة الجديد، وأنا معجب جدًا به. يتميز الجهاز بتصميم أنيق وعصري يضفي جمالية على مطبخي. بالإضافة إلى ذلك، فإن الأداء الممتاز للجهاز يجعل تحضير القهوة أمرًا سريعًا وسهلًا، مع نكهة غنية ومثالية في كل مرة. بالتأكيد، أصبح هذا الجهاز جزءًا لا غنى عنه في روتيني اليومي.",
        clientName: "اسم العميل",
        username: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        addressTitle: "العنوان",
        callUs: "اتصل بنا",
        emailUs: "راسلنا",
        address: "A108 شارع آدم، نيويورك، نيويورك 535022",
        submit: "إرسال الرسالة"

    }
}
let langAttr = $("body").attr("lang")
$(".lang-btn").on("click", function () {

    //* CHANGE BODY ATTR LANG ---------------->
    if ($("body").attr("lang") == "en" && !$("body").hasClass("ar-direction")) {
        $("body").attr("lang", "ar").addClass('ar-direction').removeClass('en-direction')
        //  $(".lang-btn.en").html('إنجليزي')

    } else {
        console.log("en");
        //  $(".lang-btn").html('En')
        $("body").attr("lang", "en").addClass('en-direction').removeClass('ar-direction')
    }

    localStorage.setItem('lang', $("body").attr("lang"));



    //* CHANGE HTML ELEMENTS ---------------->
    $(".lang-text").each(function () {
        let key = $(this).attr("key")
        let htmlElement = lang[$("body").attr("lang")][key]
        $(this).html(htmlElement)
    })
})
