/* =========================================================
   Tajir Yahya Creative & Co. — SHARED SCRIPT (every page)
   Edit SITE settings once here: WhatsApp number, email.
   ========================================================= */
window.TY_SITE = window.TY_SITE || {
  whatsapp: "923100007049",            // country code + number, no "+" or spaces
  whatsappText: "Hi Tajir Yahya Creative & Co., I'd like to discuss a project.",
  email: "tajiryahyacreativeco@gmail.com",
  formEndpoint: ""                     // optional: Formspree / backend URL for the contact form
};

(function () {
  function init() {
    var S = window.TY_SITE;
    var header = document.getElementById("tyhHeader");
    var toggle = document.getElementById("tyhMenuToggle");
    var nav = document.getElementById("tyhNav");
    var backTop = document.getElementById("tyhBackTop");

    // WhatsApp links
    document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
      var txt = a.getAttribute("data-whatsapp") || S.whatsappText;
      a.href = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(txt);
      a.target = "_blank"; a.rel = "noopener";
    });

    if (header && nav) {
      var closeMenu = function () {
        nav.classList.remove("open");
        if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰"; }
      };
      if (toggle) toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
        toggle.textContent = open ? "✕" : "☰";
      });
      nav.querySelectorAll(".tyh-dropdown > button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (window.innerWidth <= 960) btn.parentElement.classList.toggle("open");
        });
      });
      nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    }

    var wa = document.querySelector(".tyh-wa"), lastY = window.scrollY;
    var small = window.matchMedia("(max-width: 960px)");
    function onScroll() {
      var y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 20);
      if (backTop) backTop.classList.toggle("show", y > 600);
      // phones/tablets: tuck the WhatsApp button away while reading downwards
      if (wa) {
        if (small.matches && y > 240 && y > lastY + 6) wa.classList.add("tyh-hide");
        else if (y < lastY - 6 || y <= 240) wa.classList.remove("tyh-hide");
        if (y + window.innerHeight >= document.documentElement.scrollHeight - 40) wa.classList.remove("tyh-hide");
        if (Math.abs(y - lastY) > 6) lastY = y;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (backTop) backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // Active page highlight (<body data-page="...">)
    var page = document.body.getAttribute("data-page");
    if (page) document.querySelectorAll('[data-nav="' + page + '"]').forEach(function (el) {
      el.classList.add("is-active");
      var dd = el.closest(".tyh-dropdown"); if (dd) dd.classList.add("is-active");
    });

    // Generic 3D tilt for any [data-tilt] element
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll("[data-tilt]").forEach(function (el) {
        var max = parseFloat(el.getAttribute("data-tilt")) || 8;
        el.addEventListener("mouseenter", function () { el.style.transition = "transform .15s ease-out"; });
        el.addEventListener("mousemove", function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          el.style.transform = "perspective(900px) rotateX(" + (-y * max) + "deg) rotateY(" + (x * max) + "deg) translateY(-4px)";
        });
        el.addEventListener("mouseleave", function () { el.style.transition = "transform .45s ease"; el.style.transform = ""; });
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
