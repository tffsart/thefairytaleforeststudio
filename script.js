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

const invitation =
    document.querySelector(
        ".forest-invitation"
    );
       

if (livingLight) {

    let visible = false;

    

    let t = 0;

    let fairyWorldY = 0;

    let initialized = false;
    let lastScrollY = window.scrollY;
    let rememberedTargetY = 0;
    let currentZigzagAmplitude = 80;
    let zigzagOffset = 0;
    let fairyVelocityY = 0;
    
    let returningHome = false;
    let guideMode = false;
    let guideReaction = 0;
    let previousGuideMode = false;
    let guidePause = 0;
    
    function animateLight() {

        if (visible) {

            

            t += 0.02;

            if (guideReaction > 0) {

    guideReaction--;
}

if (guidePause > 0) {

    guidePause--;
}

            if (!initialized) {

                fairyWorldY =
                    window.scrollY +
                    window.innerHeight * 0.35;

                    rememberedTargetY =
                    fairyWorldY;
                    

                initialized = true;
            }
            

            let targetWorldY;

if (returningHome) {

    targetWorldY =
        window.innerHeight * 0.35;

} else if (
    guideMode &&
    guidePause <= 0
) {

    const invitationRect =
        invitation.getBoundingClientRect();

    targetWorldY =
    window.scrollY +
    invitationRect.top;

} else {

    targetWorldY =
        window.scrollY +
        window.innerHeight * 0.45;

}
                const fairyAcceleration = 0.04;
                const fairyMaxSpeed = 8;
                const fairyFriction = 0.96;

                

            

            const reactionDistance = 500;

const distanceToTarget =
    Math.abs(
        targetWorldY -
        rememberedTargetY
    );

if (returningHome) {

    rememberedTargetY =
        targetWorldY;

} else if (

    distanceToTarget >
    reactionDistance

) {

    rememberedTargetY =
        targetWorldY;

    if (Math.random() < 0.2) {

        currentZigzagAmplitude =
            120 + Math.random() * 100;

    } else {

        currentZigzagAmplitude =
            60 + Math.random() * 60;

    }

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

    if (
    returningHome &&
    Math.abs(
        fairyWorldY -
        targetWorldY
    ) < 40
) {

    livingLight.style.opacity = "0";

    visible = false;

    returningHome = false;

    initialized = false;

}

            if (

    Math.abs(fairyVelocityY) > 1

) {

    zigzagOffset =

        Math.sin(t * 3) *
        currentZigzagAmplitude;

} else {

    zigzagOffset *= 0.9;

}

const idleOffsetX =

    Math.sin(t * 0.4) * 25;

    let guideOffsetX = 0;

if (guideMode) {

    const invitationRect =
        invitation.getBoundingClientRect();

    const invitationCenterX =
        invitationRect.left +
        invitationRect.width * 0.5;

    guideOffsetX =
    (
        invitationCenterX -
        window.innerWidth * 0.5
    ) * 0.9;
}


const reactionOffset =

    guideReaction > 0

    ?

    Math.sin(t * 25) * 20

    :

    0;

const x =

    window.innerWidth * 0.5 +
    zigzagOffset +
    idleOffsetX +
    guideOffsetX +
    reactionOffset;

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

            if (

    Math.abs(
        fairyVelocityY
    ) > 1

    &&

    Math.random() < 0.08

) {

    const trail =
        document.createElement("div");

    trail.className =
        "light-trail";

    trail.style.left =
        `${x + 16}px`;

    trail.style.top =
        `${fairyWorldY + (y - screenY) + 16}px`;

    document.body.appendChild(
        trail
    );

    setTimeout(() => {

        trail.remove();

    }, 1200);

}

if (Math.random() < 0.15) {

    const dust =
        document.createElement("div");

    dust.className =
        "fairy-dust";

    dust.style.left =
        `${x + (Math.random() * 20 - 10)}px`;

    dust.style.top =
`${fairyWorldY + 10}px`;

    document.body.appendChild(
        dust
    );

    setTimeout(() => {

        dust.remove();

    }, 3000);
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

        if (visible) {

            returningHome = true;

        }

    }

    if (invitation) {

        const rect =
            invitation.getBoundingClientRect();

        const newGuideMode =

    rect.top <
    window.innerHeight * 0.6

    &&

    rect.bottom >
    window.innerHeight * 0.4;

if (
    !previousGuideMode &&
    newGuideMode
) {

    guideReaction = 50;
guidePause = 40;

rememberedTargetY = -99999;
}

guideMode =
    newGuideMode;

previousGuideMode =
    newGuideMode;
    }

});

}