/* =====================================
   SCENE LIBRARY SYSTEM
===================================== */

async function loadScenes() {

    const container = document.getElementById("scene-list");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("data/scenes.json");

        const scenes = await response.json();

        scenes.sort((a, b) => {
            return Number(a.id) - Number(b.id);
        });

        container.innerHTML = "";

        scenes.forEach(scene => {

            const card = document.createElement("div");

            card.className = "scene-card";

            card.innerHTML = `
                <h2>${scene.title}</h2>

                <p>Scene ID: ${scene.id}</p>

                <p>Status: ${scene.status}</p>

                <p>Mediums: ${scene.mediums.join(", ")}</p>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p>Unable to load Scene Library.</p>
        `;

    }

}

loadScenes();

/* =====================================
   HOMEPAGE REVEAL SYSTEM
===================================== */

const revealElements = document.querySelectorAll(
    ".forest-transition, .forest-path, .forest-gate"
);

if (revealElements.length > 0) {

    revealElements.forEach(section => {
        section.classList.add("reveal");
    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach(section => {
        observer.observe(section);
    });

}

/* =====================================
   OPTIONAL FLOATING STARS
   (CHỈ CHẠY TRANG CHỦ)
===================================== */

const stars = document.querySelectorAll(".star");

if (stars.length > 0) {

    stars.forEach(star => {

        const randomDuration =
            4 + Math.random() * 6;

        star.style.animationDuration =
            `${randomDuration}s`;

    });

}

/* =====================================
   FOREST LIGHT PARALLAX
===================================== */

const floatingLights =
    document.querySelectorAll(".floating-light");

if (floatingLights.length > 0) {

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        floatingLights.forEach((light, index) => {

            const speed =
                (index + 1) * 0.02;

            light.style.transform =
                `translateY(${scrollY * speed}px)`;

        });

    });

}
/* =====================================
   WINDOW PARALLAX
===================================== */

const sky = document.querySelector(".sky");

if (sky) {

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        sky.style.transform =
            `translateY(${scrollY * 0.015}px)`;

    });

}

/* =====================================
   LIVING LIGHT - PHASE 1
===================================== */

/* =====================================
   LIVING LIGHT - PHASE 2
===================================== */

const livingLight =
    document.getElementById("living-light");

    const windowElement =
    document.querySelector(".window");   

if (livingLight) {

    let visible = false;

    let t = 0;

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let initialized = false;

    function animateLight() {

        if (visible) {

            t += 0.02;

            let baseX = 120;
let baseY = 180;

if (windowElement) {

    const rect =
        windowElement.getBoundingClientRect();

    baseX =
        rect.left +
        rect.width * 0.78;

    baseY =
        rect.top +
        rect.height * 0.25;
}

const maxScroll =
    document.body.scrollHeight -
    window.innerHeight;

const journeyProgress =
    Math.min(
        window.scrollY / maxScroll,
        1
    );

const journeyTargetX =
    window.innerWidth * 0.5;

const journeyTargetY =
    window.innerHeight * 0.75;

const journeyX =
    baseX +
    (journeyTargetX - baseX) *
    journeyProgress;

const journeyY =
    baseY +
    (journeyTargetY - baseY) *
    journeyProgress;

    if (!initialized) {

    currentX = journeyX;
    currentY = journeyY;

    targetX = journeyX;
    targetY = journeyY;

    initialized = true;
    targetY = journeyY;
}

targetY = journeyY;

currentX += (targetX - currentX) * 0.02;
currentY += (targetY - currentY) * 0.02;

currentY +=
    (targetY - currentY) * 0.03;

const x =
    journeyX +
    Math.sin(t * 1.2) * 40 +
    Math.cos(t * 0.7) * 25;

const y =
    currentY +
    Math.cos(t * 1.1) * 30 +
    Math.sin(t * 0.5) * 15;

            livingLight.style.left =
                `${x}px`;

            livingLight.style.top =
                `${y}px`;
                const trail =
    document.createElement("div");

trail.className =
    "light-trail";

trail.style.left =
    `${x + 5}px`;

trail.style.top =
    `${y + 5}px`;

document.body.appendChild(
    trail
);

setTimeout(() => {

    trail.remove();

}, 1200);
        }

        requestAnimationFrame(
            animateLight
        );
    }

    animateLight();

    window.addEventListener("scroll", () => {

        if (
            window.scrollY > 50
        ) {

            visible = true;

            livingLight.style.opacity = "1";

        } else {

            visible = false;

            livingLight.style.opacity = "0";
        }

    });

}