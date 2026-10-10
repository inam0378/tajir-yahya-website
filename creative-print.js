/* =========================================================
   TAJIR YAHYA CREATIVE & CO.
   CREATIVE PRINT & ADVERTISING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".typrint-page");

    if (!page) return;


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems = page.querySelectorAll(".typrint-reveal");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach((item) => {
            item.classList.add("is-visible");
        });

    }


    /* =====================================================
       NUMBER COUNTERS
    ===================================================== */

    const counters = page.querySelectorAll("[data-count]");

    const animateCounter = (element) => {

        const target = Number(element.dataset.count);

        if (!Number.isFinite(target)) return;

        const duration = 1500;
        const start = performance.now();

        const update = (now) => {

            const progress = Math.min(
                (now - start) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            element.textContent =
                Math.floor(target * eased).toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent =
                    target.toLocaleString();
            }
        };

        requestAnimationFrame(update);
    };


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.6
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach((counter) => {
            counter.textContent =
                Number(counter.dataset.count).toLocaleString();
        });

    }


    /* =====================================================
       3D TILT CARDS
    ===================================================== */

    if (!prefersReducedMotion) {

        const tiltCards =
            page.querySelectorAll(".typrint-tilt");

        tiltCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                if (window.innerWidth < 800) return;

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
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        page.querySelector(".typrint-hero");

    const stage =
        page.querySelector(".typrint-stage");

    if (
        hero &&
        stage &&
        !prefersReducedMotion
    ) {

        hero.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 900) return;

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - .5;

            const y =
                (event.clientY - rect.top) /
                rect.height - .5;

            const rotateY = x * 8;
            const rotateX = y * -6;

            stage.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });


        hero.addEventListener("mouseleave", () => {

            stage.style.transform =
                "rotateX(0deg) rotateY(0deg)";

        });

    }


    /* =====================================================
       LOCAL SMOOTH SCROLL
    ===================================================== */

    const localLinks =
        page.querySelectorAll('a[href^="#"]');

    localLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                page.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       FAQ - CLOSE OTHER QUESTIONS
    ===================================================== */

    const faqItems =
        page.querySelectorAll(".typrint-faq-item");

    faqItems.forEach((item) => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach((other) => {

                if (other !== item) {
                    other.removeAttribute("open");
                }

            });

        });

    });


    /* =====================================================
       3D POSTER LIGHT RESPONSE
    ===================================================== */

    const adScene =
        page.querySelector(".typrint-ad-scene");

    if (
        adScene &&
        !prefersReducedMotion
    ) {

        adScene.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 900) return;

            const rect =
                adScene.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - .5;

            const y =
                (event.clientY - rect.top) /
                rect.height - .5;

            adScene.style.transform =
                `perspective(1000px)
                 rotateX(${y * -4}deg)
                 rotateY(${x * 5}deg)`;
        });


        adScene.addEventListener("mouseleave", () => {

            adScene.style.transform = "";

        });

    }

});