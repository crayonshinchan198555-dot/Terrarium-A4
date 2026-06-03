
const pickSound = document.getElementById("pickSound");
const dropSound = document.getElementById("dropSound");

const terrarium = document.getElementById("terrarium");
const plants = document.querySelectorAll(".plant");

// ===============================
// ⭐ STORE ORIGINAL POSITIONS (a)
// ===============================
const originalPositions = new Map();

window.addEventListener("load", () => {
    plants.forEach(el => {
        const rect = el.getBoundingClientRect();
        originalPositions.set(el.id, {
            left: el.offsetLeft,
            top: el.offsetTop
        });
    });
});

// ===============================
// ⭐ INIT DRAG + EVENTS
// ===============================
plants.forEach(dragElement);

function dragElement(el) {

    el.style.position = "absolute";

    // ===== restore saved position (e) =====
    const saved = JSON.parse(localStorage.getItem(el.id));

    if (saved) {
        el.style.left = saved.left;
        el.style.top = saved.top;
    }

    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("pointerdown", startDrag);

    // ===============================
    // ⭐ b) bring to front
    // ===============================
    el.addEventListener("dblclick", () => {
        el.style.zIndex = 1000;
    });

    // ===============================
    // ⭐ c) hover glow (CSS class toggle)
    // ===============================
    el.addEventListener("mouseenter", () => {
        el.classList.add("hovered");
    });

    el.addEventListener("mouseleave", () => {
        el.classList.remove("hovered");
    });

    function startDrag(e) {
        e.preventDefault();

        pickSound?.play().catch(() => {});

        const rect = el.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener("pointermove", dragMove);
        document.addEventListener("pointerup", stopDrag);
    }

    function dragMove(e) {

        const jar = terrarium.getBoundingClientRect();

        let x = e.clientX - jar.left - offsetX;
        let y = e.clientY - jar.top - offsetY;

        // ===============================
        // ⭐ d) boundary restriction
        // ===============================
        x = Math.max(0, Math.min(x, jar.width - el.offsetWidth));
        y = Math.max(0, Math.min(y, jar.height - el.offsetHeight));

        el.style.left = x + "px";
        el.style.top = y + "px";
    }

    function stopDrag() {

        dropSound?.play().catch(() => {});

        // ===============================
        // ⭐ e) save position
        // ===============================
        localStorage.setItem(el.id, JSON.stringify({
            left: el.style.left,
            top: el.style.top
        }));

        document.removeEventListener("pointermove", dragMove);
        document.removeEventListener("pointerup", stopDrag);
    }
}

// ===============================
// ⭐ a) RESET WITH ANIMATION
// ===============================
function resetPlants() {

    plants.forEach(el => {

        const original = originalPositions.get(el.id);

        if (!original) return;

        // enable smooth animation
        el.style.transition = "all 1s ease";

        el.style.left = original.left + "px";
        el.style.top = original.top + "px";

        localStorage.removeItem(el.id);

        // remove transition after animation
        setTimeout(() => {
            el.style.transition = "";
        }, 1000);
    });
}