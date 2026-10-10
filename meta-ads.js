/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   META ADS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".tyma-reveal"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "tyma-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            ".tyma-counter"
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
                        parseFloat(
                            counter.dataset.target
                        );

                    const isDecimal =
                        !Number.isInteger(target);

                    const duration =
                        1600;

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

                        const value =
                            target * eased;


                        counter.textContent =
                            isDecimal
                                ? value.toFixed(1)
                                : Math.floor(value);


                        if (progress < 1) {

                            requestAnimationFrame(
                                animate
                            );

                        } else {

                            counter.textContent =
                                isDecimal
                                    ? target.toFixed(1)
                                    : target;

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
                threshold: 0.6
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(
            counter
        );

    });


    /* =====================================================
       3D TILT CARDS
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tyma-tilt"
        );


    tiltCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 850) {
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
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(8px)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(
            ".tyma-hero"
        );

    const heroVisual =
        document.querySelector(
            ".tyma-hero-visual"
        );


    if (hero && heroVisual) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                        rect.width -
                        0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                        rect.height -
                        0.5;


                heroVisual.style.transform =
                    `
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       PRICING TOGGLE
    ====================================================== */

    const pricingButtons =
        document.querySelectorAll(
            ".tyma-pricing-toggle button"
        );


    const prices =
        document.querySelectorAll(
            ".tyma-price-value"
        );


    pricingButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {


                pricingButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const period =
                    button.dataset.period;


                prices.forEach((price) => {

                    const newValue =
                        price.dataset[
                            period
                        ];


                    if (!newValue) {
                        return;
                    }


                    price.style.opacity =
                        "0";

                    price.style.transform =
                        "translateY(8px)";


                    setTimeout(() => {

                        price.textContent =
                            `PKR ${newValue}`;

                        price.style.opacity =
                            "1";

                        price.style.transform =
                            "translateY(0)";

                    }, 180);

                });

            }
        );

    });


    /* =====================================================
       INTERNAL SMOOTH SCROLL
    ====================================================== */

    const links =
        document.querySelectorAll(
            '.tyma-page a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute(
                        "href"
                    );


                if (!id || id === "#") {
                    return;
                }


                const target =
                    document.querySelector(
                        id
                    );


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
       MOBILE RESET
    ====================================================== */

    function mobileReset() {

        if (window.innerWidth < 700) {

            document
                .querySelectorAll(
                    ".tyma-tilt"
                )
                .forEach((card) => {

                    card.style.transform =
                        "";

                });

        }

    }


    window.addEventListener(
        "resize",
        mobileReset
    );


    mobileReset();

});