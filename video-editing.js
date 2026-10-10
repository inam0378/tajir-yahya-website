/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   VIDEO EDITING + CONTENT CREATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".tyvc-reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "tyvc-visible"
                    );

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(".tyvc-counter");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.target);

                    let current = 0;

                    const duration = 1500;

                    const startTime =
                        performance.now();


                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) / duration,
                                1
                            );

                        const eased =
                            1 - Math.pow(
                                1 - progress,
                                4
                            );

                        current =
                            Math.floor(
                                target * eased
                            );

                        counter.textContent =
                            current.toLocaleString();


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );

                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       3D TILT CARDS
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(".tyvc-tilt");


    tiltCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 850) return;

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
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;


            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(8px)
                `;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "";

        });

    });


    /* =====================================================
       HERO MOUSE PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(".tyvc-hero");

    const heroVisual =
        document.querySelector(".tyvc-hero-visual");


    if (hero && heroVisual) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900) return;

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
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
            ".tyvc-pricing-toggle button"
        );

    const priceValues =
        document.querySelectorAll(
            ".tyvc-price-value"
        );


    pricingButtons.forEach((button) => {

        button.addEventListener("click", () => {

            pricingButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const period =
                button.dataset.period;


            priceValues.forEach((price) => {

                const value =
                    price.dataset[period];

                if (!value) return;


                price.style.opacity = "0";
                price.style.transform =
                    "translateY(8px)";


                setTimeout(() => {

                    price.textContent =
                        `PKR ${value}`;

                    price.style.opacity = "1";
                    price.style.transform =
                        "translateY(0)";

                }, 180);

            });

        });

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            '.tyvc-page a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       MOBILE SAFETY
    ====================================================== */

    function checkMobile() {

        if (window.innerWidth < 700) {

            document
                .querySelectorAll(".tyvc-tilt")
                .forEach((card) => {

                    card.style.transform = "";

                });

        }

    }


    window.addEventListener(
        "resize",
        checkMobile
    );


    checkMobile();

});