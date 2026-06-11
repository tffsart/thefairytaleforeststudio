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

    let fairyWorldY = 0;

    let initialized = false;
    let lastScrollY = window.scrollY;
    let rememberedTargetY = 0;
    let fairyVelocityY = 0;
    function animateLight() {

        if (visible) {

            t += 0.02;

            if (!initialized) {

                fairyWorldY =
                    window.scrollY +
                    window.innerHeight * 0.35;

                    rememberedTargetY =
                    fairyWorldY;

                initialized = true;
            }

            const targetWorldY =
                window.scrollY +
                window.innerHeight * 0.5;
                const fairyAcceleration = 0.08;
                const fairyMaxSpeed = 18;
                const fairyFriction = 0.94;

                

            

            const reactionDistance = 600;

const distanceToTarget =
    Math.abs(
        targetWorldY -
        rememberedTargetY
    );

if (
    distanceToTarget >
    reactionDistance
) {

    rememberedTargetY =
        targetWorldY;

}

const direction =

    rememberedTargetY -
    fairyWorldY;

fairyVelocityY +=

    direction *
    fairyAcceleration *
    0.01;

if (

    fairyVelocityY >
    fairyMaxSpeed

) {

    fairyVelocityY =
        fairyMaxSpeed;
}

if (

    fairyVelocityY <
    -fairyMaxSpeed

) {

    fairyVelocityY =
        -fairyMaxSpeed;
}

fairyVelocityY *=

    fairyFriction;

fairyWorldY +=

    fairyVelocityY;

            const x =
                window.innerWidth * 0.5 +
                Math.sin(t * 0.8) * 120 +
                Math.cos(t * 0.4) * 50;
                const fairyWorldX = x;

            const screenY =
                fairyWorldY -
                window.scrollY;

            const y =
                screenY +
                Math.cos(t * 1.1) * 30 +
                Math.sin(t * 0.5) * 15;

            livingLight.style.left =
                `${x}px`;

            livingLight.style.top =
                `${y}px`;

            if (true) {

    const trail =
        document.createElement("div");

    trail.className =
        "light-trail";

    trail.style.left =
    `${x + 5}px`;

trail.style.top =
    `${fairyWorldY + (y - screenY) + 5}px`;

    document.body.appendChild(
        trail
    );

    setTimeout(() => {

        trail.remove();

    }, 1200);

}
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

            initialized = false;
        }

    });

}