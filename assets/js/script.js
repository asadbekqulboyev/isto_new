$(document).ready(function () {
  document.addEventListener("submit", function (e) {
    if (e.target.closest("form")) {
      e.preventDefault();
      alert("Thank you! Your message has been sent (Demo mode).");
    }
  });

  // Offline fallback for animations and lazy loading
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
const showPoint = header.outerHeight(); // qachondan fixed bo'lsin

$(window).on("scroll", function () {
  let currentScroll = $(this).scrollTop();

  // Tepada bo'lsa hammasini reset qilamiz
  if (currentScroll <= 0) {
    header.removeClass("fixed hide");
    lastScroll = 0;
    return;
  }

  // Pastga scroll qilsa -> header yo'qoladi
  if (currentScroll > lastScroll) {
    header.addClass("hide");
  }
  // Tepaga scroll qilsa -> fixed bo'lib chiqadi
  else {
    if (currentScroll > showPoint) {
      header.addClass("fixed").removeClass("hide");
    }
  }

  // Scroll bir oz bo'lsa ham fixed bo'lib qolmasligi uchun
  if (currentScroll <= showPoint) {
    header.removeClass("fixed");
  }

  lastScroll = currentScroll;
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

$(".mobile_phones_icon").click(function () {
  $(".mobile_phones_content").toggleClass("active");
});
