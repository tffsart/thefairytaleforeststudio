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



const transitionQuote =
    document.querySelector(
        ".transition-quote"
    );

  
       

if (livingLight) {

    let visible = false;
    let transitionPlayed = false;
    

    let t = 0;

    let fairyWorldY =
    window.innerHeight * 0.35;

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
    let guideFreeze = 0;
    let guideState = "idle";
    let princessMode = false;
    let princessTransition = 0;

    let princessOrbit = 0;
    let princessBaseOffsetX = 0;
    let princessDirection = 1;
    let princessTargetOffset = 260;
    let princessWait = 0;
    let princessPoint = 0;

    let returnTransform = false;
    let princessActive = false;
    
    function animateLight() {

        if (initialized || visible) {

            

            t += 0.02;
            if (

    princessTransition >= 1

) {

    const princessTargets = [

        -260,

        0,

        260

    ];

    const targetOrbit =

        princessTargets[
            princessPoint
        ];

    if (

        princessWait > 0

    ) {

        princessWait--;

    } else {

        const orbitDirection =

            Math.sign(
                targetOrbit -
                princessOrbit
            );

        princessOrbit +=

            orbitDirection * 4;

        if (

            Math.abs(
                princessOrbit -
                targetOrbit
            ) < 8

        ) {

            princessOrbit =
                targetOrbit;

            if (
                princessPoint === 2
            ) {

                princessWait = 80;

            } else {

                princessWait = 40;
            }

            princessPoint++;

            if (
                princessPoint > 2
            ) {

                princessPoint = 0;
            }
        }
    }
}
            

if (guideState === "freeze") {

    guideFreeze--;

    if (guideFreeze <= 0) {

        guideState = "react";

        guideReaction = 50;
    }
}

if (guideState === "react") {

    guideReaction--;

    if (guideReaction <= 0) {

        guideState = "pause";

        guidePause = 100;
    }
}

if (guideState === "pause") {

    guidePause--;

    if (guidePause <= 0) {

        guideState = "fly";
    }
}



            if (!initialized) {

    rememberedTargetY =
        fairyWorldY;

    initialized = true;
}
            

            let targetWorldY;

if (returningHome) {

    targetWorldY =
        window.innerHeight * 0.35;

} else if (

    guideMode

    &&

    guideState === "fly"

) {

    const invitationRect =
        invitation.getBoundingClientRect();

    targetWorldY =
        window.scrollY +
        invitationRect.top +

        (
            princessTransition > 0.95
            ?
            Math.sin(
                princessOrbit * 0.03
            ) * 18
            :
            0
        );

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

} else if (guideMode) {

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

if (

    guideState !== "freeze"

    &&

    guideState !== "react"

    &&

    guideState !== "pause"

) {

    fairyWorldY +=
        fairyVelocityY;
}

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

    guideState === "freeze"
    ||
    guideState === "react"
    ||
    guideState === "pause"

    ?

    0

    :

    Math.sin(t * 0.4) * 25;

    let guideOffsetX = 0;

if (

    guideMode

    ||

    princessActive

) {

    const invitationRect =
        invitation.getBoundingClientRect();

    const invitationCenterX =
        invitationRect.left +
        invitationRect.width * 0.5;

    const normalOffset =

    (
        invitationCenterX -
        window.innerWidth * 0.5
    ) * 0.9;

const princessOffset =

    princessBaseOffsetX +
    princessOrbit;

guideOffsetX =

    normalOffset *

    (1 - princessTransition)

    +

    princessOffset *

    princessTransition;
}


const reactionOffset =

    guideState === "react"

    ?

    Math.sin(t * 60) * 6

    :

    0;

const x =

    window.innerWidth * 0.5 +
    zigzagOffset +
    idleOffsetX +
    guideOffsetX +
    reactionOffset;

                const fairyWorldX = x;

                if (

    guideMode
    &&
    guideState === "fly"

) {

    princessActive = true;

    const invitationRect =
        invitation.getBoundingClientRect();

    princessBaseOffsetX =

        (
            invitationRect.left +
            invitationRect.width * 0.5
        )

        -

        window.innerWidth * 0.5;

    princessTransition += 0.015;

    if (
        princessTransition > 1
    ) {

        princessTransition = 1;
    }

}

else if (

    returnTransform
    &&

    Math.abs(fairyVelocityY) > 1

) {

    princessActive = false;

    princessTransition -= 0.015;

    if (
        princessTransition <= 0
    ) {

        princessTransition = 0;

        returnTransform = false;
    }
}

princessMode =
    princessTransition > 0.5;
            
                const screenY =
                fairyWorldY -
                window.scrollY;

            const y =
                screenY +
                Math.cos(t * 1.1) * 30 +
                Math.sin(t * 0.5) * 15;

            livingLight.style.backgroundImage =

    princessTransition > 0.5

    ?

    'url("assets/tinyprincess1.png")'

    :

    'url("assets/tinysnowflake1.png")';

    livingLight.style.transform =

`scale(${
    1 +
    princessTransition * 0.65 +
    Math.sin(
        princessTransition * Math.PI
    ) * 0.35
})`;

livingLight.style.filter =

`brightness(${1 + princessTransition * 2.2})
 drop-shadow(0 0 ${20 + princessTransition * 100}px rgba(245,213,139,.95))
 drop-shadow(0 0 ${40 + princessTransition * 200}px rgba(245,213,139,.8))
 drop-shadow(0 0 ${80 + princessTransition * 300}px rgba(245,213,139,.6))`;
            
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

if (

    Math.random() <

    (
        0.15 +
        princessTransition * 1.5
    )

) {

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
    forestTransition &&
    
    transitionQuote &&
    !transitionPlayed
) {

    const rect =
        forestTransition.getBoundingClientRect();

    const center =
        window.innerHeight * 0.5;

    if (
        rect.top < center &&
        rect.bottom > center
    ) {

        transitionPlayed = true;

        

      

setTimeout(() => {

    transitionQuote.classList.add(
        "active"
    );

}, 1800);
    }
}

    if (
    window.scrollY >
    window.innerHeight * 0.5
) {

    visible = true;

    livingLight.style.opacity = "1";

}

if (
    window.scrollY <
    window.innerHeight * 0.1
) {

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

    guideState = "freeze";

guideReaction = 0;
guidePause = 0;
guideFreeze = 30;

rememberedTargetY = -99999;
}

if (

    previousGuideMode
    &&

    !newGuideMode

) {

    returnTransform = true;
}

guideMode =
    newGuideMode;

previousGuideMode =
    newGuideMode;
    }

});

}




