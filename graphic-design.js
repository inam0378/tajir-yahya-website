/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   PREMIUM GRAPHIC DESIGN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".tygd-reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "tygd-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
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

                    let current = 0;

                    const duration = 1600;

                    const startTime =
                        performance.now();


                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                4
                            );


                        current =
                            Math.floor(
                                target * eased
                            );


                        counter.textContent =
                            current;


                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       HERO 3D MOUSE PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(".tygd-hero");

    const scene =
        document.querySelector(".tygd-3d-scene");


    if (hero && scene) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width;


                const y =
                    (event.clientY - rect.top) /
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
       SERVICE CARD 3D TILT
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tygd-tilt-card"
        );


    tiltCards.forEach((card) => {

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
                        centerY) *
                    -5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    5;


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

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       PORTFOLIO 3D EFFECT
    ====================================================== */

    const projectCards =
        document.querySelectorAll(
            ".tygd-project"
        );


    projectCards.forEach((project) => {

        project.addEventListener(
            "mousemove",
            (event) => {

                const art =
                    project.querySelector(
                        ".tygd-project-art"
                    );


                if (!art) {
                    return;
                }


                const rect =
                    project.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;


                const rotateX =
                    (y - 0.5) * -4;


                const rotateY =
                    (x - 0.5) * 5;


                art.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(0.985)
                    `;
            }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                const art =
                    project.querySelector(
                        ".tygd-project-art"
                    );


                if (art) {
                    art.style.transform =
                        "";
                }

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".tygd-btn"
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
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )
                    `;
            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            '.tygd-page a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

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
       PARALLAX BACKGROUND
    ====================================================== */

    const heroGrid =
        document.querySelector(
            ".tygd-hero-grid"
        );


    if (heroGrid) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (scroll < window.innerHeight) {

                    heroGrid.style.transform =
                        `
                        translateY(
                            ${scroll * 0.12}px
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
       STAGGERED SERVICE ANIMATION
    ====================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".tygd-service-card"
        );


    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        }
    );


    /* =====================================================
       STAGGER PROCESS ITEMS
    ====================================================== */

    const processItems =
        document.querySelectorAll(
            ".tygd-process-item"
        );


    processItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 100}ms`;

        }
    );


    /* =====================================================
       CONSOLE BRAND MESSAGE
    ====================================================== */

    console.log(
        "%cTajir Yahya Creative & Co.",
        "font-size:20px;font-weight:bold;color:#3978ff;"
    );

    console.log(
        "%cCreative design. Built to stand out.",
        "font-size:12px;color:#7a8296;"
    );

});