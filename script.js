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
const hero =
    document.querySelector(".hero");

const forestTransition =
    document.querySelector(".forest-transition");

const forestPath =
    document.querySelector(".forest-path");

const forestGate =
    document.querySelector(".forest-gate");   

if (livingLight) {

    let visible = false;

    let t = 0;

    let currentX = 0;
    let currentY = 0;


    let targetX = 0;
    let targetY = 0;

    let initialized = false;

    let roamTargetX = 0;
    let roamTargetY = 0;

    let currentZone = 0;
    let targetZone = 0;

    let cameraTargetX = 0;
    let cameraTargetY = 0;

    function animateLight() {

        if (visible) {

            t += 0.02;
            const viewportMiddle =
    window.innerHeight * 0.5;

targetZone = 0;

if (
    forestTransition &&
    forestTransition.getBoundingClientRect().top <
        viewportMiddle
) {
    targetZone = 1;
}

if (
    forestPath &&
    forestPath.getBoundingClientRect().top <
        viewportMiddle
) {
    targetZone = 2;
}

if (
    forestGate &&
    forestGate.getBoundingClientRect().top <
        viewportMiddle
) {
    targetZone = 3;
}

currentZone +=
    (targetZone - currentZone) *
    0.02;

            

        



let journeyTargetX =
    window.innerWidth * 0.5;

let journeyTargetY =
    window.innerHeight * 0.75;

if (currentZone >= 0.5) {

    journeyTargetX =
        window.innerWidth * 0.35;

    journeyTargetY =
        window.innerHeight * 0.45;
}

if (currentZone >= 1.5) {

    journeyTargetX =
        window.innerWidth * 0.70;

    journeyTargetY =
        window.innerHeight * 0.60;
}

if (currentZone >= 2.5) {

    journeyTargetX =
        window.innerWidth * 0.50;

    journeyTargetY =
        window.innerHeight * 0.80;
}


    if (!initialized) {

    currentX =
        window.innerWidth * 0.78;

    currentY =
        window.innerHeight * 0.25;
    

    roamTargetX = currentX;
    roamTargetY = currentY;

    initialized = true;

}
    



let zoneCenterX =
    window.innerWidth * 0.5;

if (currentZone >= 0.5) {

    zoneCenterX =
        window.innerWidth * 0.35;
}

if (currentZone >= 1.5) {

    zoneCenterX =
        window.innerWidth * 0.70;
}

if (currentZone >= 2.5) {

    zoneCenterX =
        window.innerWidth * 0.50;
}


let zoneCenterY =
    window.innerHeight * 0.35;

if (currentZone >= 0.5) {

    zoneCenterY =
        window.innerHeight * 0.45;
}

if (currentZone >= 1.5) {

    zoneCenterY =
        window.innerHeight * 0.60;
}

if (currentZone >= 2.5) {

    zoneCenterY =
        window.innerHeight * 0.80;
}
if (
    Math.abs(
        currentX - roamTargetX
    ) < 20
) {

    roamTargetX =
        cameraTargetX +
        (
            Math.random() * 300
            - 150
        );
}
if (
    Math.abs(
        currentY - roamTargetY
    ) < 20
) {

    roamTargetY =
        cameraTargetY +
        (
            Math.random() * 160
            - 80
        );
}

currentX +=
    (roamTargetX - currentX) *
    0.004;

currentY +=
    (roamTargetY - currentY) *
    0.004;

const x =
    currentX +
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