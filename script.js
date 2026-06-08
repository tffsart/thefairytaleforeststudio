async function loadScenes() {

```
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
```

}

loadScenes();

/* =====================================
HOMEPAGE REVEAL SYSTEM
===================================== */

const revealElements = document.querySelectorAll(
".forest-transition, .forest-path, .forest-gate"
);

if (revealElements.length > 0) {

```
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
```

}
