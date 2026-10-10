/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   DIGITAL MARKETING & BRAND STRATEGY
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SAFE PAGE CHECK
    ====================================================== */

    const page = document.querySelector(".tydmbs-page");

    if (!page) {
        return;
    }


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = page.querySelectorAll(
        ".tydmbs-reveal"
    );

    if (!reducedMotion && "IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    const delay =
                        parseInt(
                            element.dataset.delay || "0",
                            10
                        );

                    setTimeout(function () {

                        element.classList.add(
                            "tydmbs-visible"
                        );

                    }, delay);

                    observerInstance.unobserve(element);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add(
                "tydmbs-visible"
            );
        });

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ====================================================== */

    const stage = page.querySelector(
        ".tydmbs-stage"
    );

    const heroVisual = page.querySelector(
        ".tydmbs-hero-visual"
    );

    if (
        stage &&
        heroVisual &&
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const moveX =
                    (x - 0.5).toFixed(3);

                const moveY =
                    (y - 0.5).toFixed(3);

                stage.style.setProperty(
                    "--mouse-x",
                    moveX
                );

                stage.style.setProperty(
                    "--mouse-y",
                    moveY
                );

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            function () {

                stage.style.setProperty(
                    "--mouse-x",
                    "0"
                );

                stage.style.setProperty(
                    "--mouse-y",
                    "0"
                );

            }
        );

    }


    /* =====================================================
       3D TILT CARDS
    ====================================================== */

    const tiltCards = page.querySelectorAll(
        ".tydmbs-tilt-card"
    );

    if (
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        tiltCards.forEach(function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -4;

                    const rotateY =
                        ((x - centerX) / centerX) * 5;

                    card.style.transform =
                        "perspective(900px) " +
                        "rotateX(" +
                        rotateX +
                        "deg) " +
                        "rotateY(" +
                        rotateY +
                        "deg) " +
                        "translateY(-5px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters = page.querySelectorAll(
        ".tydmbs-counter"
    );

    function animateCounter(counter) {

        if (counter.dataset.animated === "true") {
            return;
        }

        counter.dataset.animated = "true";

        const target =
            parseFloat(
                counter.dataset.target || "0"
            );

        const suffix =
            counter.dataset.suffix || "";

        const duration = 1400;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                target * eased;

            if (Number.isInteger(target)) {

                counter.textContent =
                    Math.round(value) +
                    suffix;

            } else {

                counter.textContent =
                    value.toFixed(1) +
                    suffix;

            }


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target + suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: .6
                }
            );


        counters.forEach(function (counter) {

            if (reducedMotion) {

                const target =
                    counter.dataset.target || "0";

                const suffix =
                    counter.dataset.suffix || "";

                counter.textContent =
                    target + suffix;

            } else {

                counterObserver.observe(
                    counter
                );

            }

        });

    } else {

        counters.forEach(function (counter) {

            const target =
                counter.dataset.target || "0";

            const suffix =
                counter.dataset.suffix || "";

            counter.textContent =
                target + suffix;

        });

    }


    /* =====================================================
       FAQ — CLOSE OTHER ITEMS
    ====================================================== */

    const faqItems =
        page.querySelectorAll(
            ".tydmbs-faq-item"
        );

    faqItems.forEach(function (item) {

        item.addEventListener(
            "toggle",
            function () {

                if (!item.open) {
                    return;
                }

                faqItems.forEach(
                    function (otherItem) {

                        if (
                            otherItem !== item
                        ) {
                            otherItem.open =
                                false;
                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        page.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href.length < 2
                ) {
                    return;
                }

                const target =
                    page.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       MOBILE TOUCH SAFETY
    ====================================================== */

    if (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    ) {

        tiltCards.forEach(function (card) {

            card.addEventListener(
                "touchstart",
                function () {

                    card.style.transform =
                        "translateY(-3px)";

                },
                {
                    passive: true
                }
            );

            card.addEventListener(
                "touchend",
                function () {

                    setTimeout(
                        function () {

                            card.style.transform =
                                "";

                        },
                        180
                    );

                },
                {
                    passive: true
                }
            );

        });

    }


    /* =====================================================
       PREVENT BROKEN HASH LINKS
    ====================================================== */

    page.querySelectorAll(
        'a[href="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
            }
        );

    });


    /* =====================================================
       INITIALIZE
    ====================================================== */

    page.classList.add(
        "tydmbs-initialized"
    );


})();