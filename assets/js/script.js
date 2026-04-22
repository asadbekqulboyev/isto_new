$(document).ready(function () {
  document.addEventListener("submit", function (e) {
    if (e.target.closest("form")) {
      e.preventDefault();
      alert("Thank you! Your message has been sent (Demo mode).");
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Trigger animations for sections
    var animateItems = document.querySelectorAll(
      ".js-animate, .b-section, .b-about__people-item, .b-main-footer__title",
    );
    animateItems.forEach(function (el) {
      el.classList.add("animated");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.visibility = "visible";
    });

    // Force load lazy images
    var lazyImages = document.querySelectorAll("img[data-lazy-src]");
    lazyImages.forEach(function (img) {
      var lazySrc = img.getAttribute("data-lazy-src");
      if (lazySrc && img.src !== lazySrc) {
        img.src = lazySrc;
      }
    });
  });
});

let lastScroll = 0;
const header = $(".header");
const showPoint = header.outerHeight();
$(window).on("scroll", function () {
  let currentScroll = $(this).scrollTop();
  if (currentScroll <= 0) {
    header.removeClass("fixed hide");
    lastScroll = 0;
    return;
  }
  if (currentScroll > lastScroll) {
    header.addClass("hide");
  } else {
    if (currentScroll > showPoint) {
      header.addClass("fixed").removeClass("hide");
    }
  }
  if (currentScroll <= showPoint) {
    header.removeClass("fixed");
  }
  lastScroll = currentScroll;

  $(".content_block , .content_block_picture").each(function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      $(this).addClass("animated");
    }
  });
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  // know section
  if ($(".know").length) {
    var knowTop = $(".know").offset().top;
    var knowHeight = $(".know").outerHeight();

    if (
      scrollTop + windowHeight > knowTop + 100 &&
      scrollTop < knowTop + knowHeight
    ) {
      $(".know-door").addClass("active");
    } else {
      $(".know-door").removeClass("active");
    }
  }

  // projects section
  $(".projects_bg").css({ transform: `translateY(${scrollY / 20}px)` });
});
$(".burger_button").click(function () {
  $(this).toggleClass("active");
  $("body").toggleClass("lock");
  $(".burger_menu__overlay").toggleClass("open");
});
$(".hero_slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  fade: true,
  cssEase: "linear",
  autoplay: true,
  autoplaySpeed: 4000,
  customPaging: function (slider, i) {
    return '<span class="custom-dot"></span>';
  },

  appendDots: $(".hero"),
});
$(".logo__item.last").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 600,
  responsive: [
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
});
$(".mobile_phones_icon").click(function () {
  $(".mobile_phones_content").toggleClass("active");
});
var input = document.querySelector("#phone");

if (input) {
  var iti = window.intlTelInput(input, {
    initialCountry: "auto",
    separateDialCode: true,
    geoIpLookup: function (success, failure) {
      $.get("https://ipapi.co/json/", function () {}, "json").always(
        function (resp) {
          var countryCode =
            resp && resp.country_code ? resp.country_code : "uz";
          success(countryCode.toLowerCase());
        },
      );
    },
  });

  $("#phone").on("blur", function () {
    console.log(iti.getNumber());
  });
}

$(".select__input").on("click", function (e) {
  e.stopPropagation();
  $(this).toggleClass("active");
});

$(".select__input .option").on("click", function (e) {
  e.stopPropagation();
  let parent = $(this).closest(".select__input");
  parent.find("input").val($(this).text());

  parent.removeClass("active");
  parent.find(".options").slideUp(200);
});

$(document).on("click", function () {
  $(".select__input").removeClass("active");
  $(".options").slideUp(200);
});
$(".team_slider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
$(".prev_btn").click(function () {
  $(".team_slider").slick("slickPrev");
});

$(".next_btn").click(function () {
  $(".team_slider").slick("slickNext");
});

$(".vacancy_cat")
  .removeClass("active")
  .first()
  .addClass("active")
  .find(".vacancy_item")
  .first()
  .addClass("open");

// Category (tab)
$(".vacancy_cat_title").on("click", function () {
  const cat = $(this).parent();

  $(".vacancy_cat").removeClass("active");
  cat.addClass("active");
});

// Item toggle
$(".vacancy_more_btn").on("click", function () {
  $(this).closest(".vacancy_item").toggleClass("open");
});
$(".vacancy_right .button").click(function () {
  $(".modal.architec").fadeIn();
});
$(".modal_close").click(function () {
  $(".modal.architec").fadeOut();
});
$(".vacancy_left .button").click(function () {
  $(".modal.join").fadeIn();
});
$(".modal_close").click(function () {
  $(".modal.join").fadeOut();
});

const items = [];

$(".gallery img").each(function () {
  let imgSrc = $(this).attr("data-lazy-src") || $(this).attr("src");
  items.push({ href: imgSrc, type: "image" });
});

const lightbox = GLightbox({
  elements: items,
});

$(".gallery img").on("click", function () {
  let index = $(".gallery img").index(this);
  lightbox.openAt(index);
});

$(".gallery img").css("cursor", "pointer");