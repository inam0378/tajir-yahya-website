/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   SOCIAL MEDIA MARKETING JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".tysmm-reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "tysmm-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.dataset.count,
                            10
                        );

                    const duration = 1600;

                    const start =
                        performance.now();


                    function animate(time) {

                        const progress =
                            Math.min(
                                (time - start) /
                                duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                4
                            );


                        counter.textContent =
                            Math.floor(
                                target * eased
                            );


                        if (progress < 1) {

                            requestAnimationFrame(
                                animate
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        animate
                    );

                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.65
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       HERO 3D MOUSE MOVEMENT
    ====================================================== */

    const hero =
        document.querySelector(
            ".tysmm-hero"
        );

    const scene =
        document.querySelector(
            ".tysmm-social-scene"
        );


    if (hero && scene) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;


                const rotateY =
                    (x - 0.5) * 14;


                const rotateX =
                    (y - 0.5) * -10;


                scene.style.transform =
                    `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                scene.style.transform =
                    "rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* =====================================================
       SERVICE CARD TILT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".tysmm-tilt"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -5;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 5;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       PRICING CARD EFFECT
    ====================================================== */

    const pricingCards =
        document.querySelectorAll(
            ".tysmm-price-card"
        );


    pricingCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y -
                        rect.height / 2) /
                        rect.height) * -3;


                const rotateY =
                    ((x -
                        rect.width / 2) /
                        rect.width) * 3;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       BUTTON MAGNETIC EFFECT
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".tysmm-btn"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * .08}px,
                        ${y * .08}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const anchors =
        document.querySelectorAll(
            '.tysmm-page a[href^="#"]'
        );


    anchors.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");


                const target =
                    document.querySelector(id);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       STAGGER SERVICES
    ====================================================== */

    document
        .querySelectorAll(
            ".tysmm-service-card"
        )
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });


    /* =====================================================
       STAGGER PRICING
    ====================================================== */

    document
        .querySelectorAll(
            ".tysmm-price-card"
        )
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        });


    /* =====================================================
       HERO PARALLAX GRID
    ====================================================== */

    const grid =
        document.querySelector(
            ".tysmm-grid-bg"
        );


    if (grid) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (
                    scroll <
                    window.innerHeight
                ) {

                    grid.style.transform =
                        `
                        translateY(
                            ${scroll * .12}px
                        )
                        `;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       CONSOLE
    ====================================================== */

    console.log(
        "%cTajir Yahya Creative & Co.",
        "font-size:20px;font-weight:bold;color:#3978ff;"
    );

    console.log(
        "%cSocial Media Marketing — Strategy. Content. Growth.",
        "font-size:12px;color:#7a8296;"
    );

});