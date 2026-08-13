/* =====================================================
   CARRUSEL DE PROFESORES
===================================================== */

const carousel =
    document.getElementById("carousel");

const teachers =
    document.querySelectorAll(".teacher");

const prev =
    document.getElementById("prev");

const next =
    document.getElementById("next");

const current =
    document.getElementById("current");

const progress =
    document.getElementById("progress");

const dotsContainer =
    document.getElementById("dots");


let index = 0;

const total = teachers.length;


/* =====================================================
   CREAR PUNTOS
===================================================== */

teachers.forEach((teacher, i) => {

    const dot =
        document.createElement("span");

    dot.classList.add("dot");

    if (i === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

        goTo(i);

    });

    dotsContainer.appendChild(dot);

});


const dots =
    document.querySelectorAll(".dot");


/* =====================================================
   CAMBIAR PROFESOR
===================================================== */

function goTo(newIndex) {

    if (newIndex < 0) {

        newIndex = total - 1;

    }

    if (newIndex >= total) {

        newIndex = 0;

    }

    index = newIndex;


    carousel.scrollTo({

        left:
            carousel.clientWidth * index,

        behavior: "smooth"

    });


    updateControls();

}


/* =====================================================
   ACTUALIZAR CONTROLES
===================================================== */

function updateControls() {

    current.textContent =
        String(index + 1).padStart(2, "0");


    progress.style.width =
        ((index + 1) / total * 100) + "%";


    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


/* =====================================================
   BOTONES
===================================================== */

next.addEventListener("click", () => {

    goTo(index + 1);

});


prev.addEventListener("click", () => {

    goTo(index - 1);

});


/* =====================================================
   DESLIZAR CON DEDO
===================================================== */

let startX = 0;

let endX = 0;


carousel.addEventListener(
    "touchstart",
    event => {

        startX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


carousel.addEventListener(
    "touchend",
    event => {

        endX =
            event.changedTouches[0].clientX;


        const distance =
            endX - startX;


        if (Math.abs(distance) > 50) {

            if (distance < 0) {

                goTo(index + 1);

            } else {

                goTo(index - 1);

            }

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   ARRASTRAR CON MOUSE
===================================================== */

let mouseStart = 0;

let dragging = false;


carousel.addEventListener(
    "mousedown",
    event => {

        dragging = true;

        mouseStart =
            event.clientX;

    }
);


carousel.addEventListener(
    "mouseup",
    event => {

        if (!dragging) return;

        dragging = false;


        const distance =
            event.clientX - mouseStart;


        if (Math.abs(distance) > 60) {

            if (distance < 0) {

                goTo(index + 1);

            } else {

                goTo(index - 1);

            }

        }

    }
);


carousel.addEventListener(
    "mouseleave",
    () => {

        dragging = false;

    }
);


/* =====================================================
   EVITAR SELECCIÓN DE IMÁGENES AL ARRASTRAR
===================================================== */

carousel.addEventListener(
    "dragstart",
    event => {

        event.preventDefault();

    }
);


/* =====================================================
   INICIAR
===================================================== */

updateControls();