/* =====================================================
   MENÚ CELULAR
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


menuBtn.addEventListener("click", () => {

    nav.classList.toggle("abierto");

});



/* CERRAR MENÚ AL TOCAR UN ENLACE */

const enlacesMenu =
    nav.querySelectorAll("a");


enlacesMenu.forEach(enlace => {

    enlace.addEventListener("click", () => {

        nav.classList.remove("abierto");

    });

});



/* =====================================================
   CARRUSEL
===================================================== */

const track =
    document.getElementById("track");

const viewport =
    document.getElementById("viewport");

const anterior =
    document.getElementById("anterior");

const siguiente =
    document.getElementById("siguiente");

const profesores =
    document.querySelectorAll(".profesor");

const indicadores =
    document.getElementById("indicadores");


let posicion = 0;

const total =
    profesores.length;



/* =====================================================
   INDICADORES
===================================================== */

for (let i = 0; i < total; i++) {

    const punto =
        document.createElement("span");

    punto.classList.add("indicador");


    if (i === 0) {

        punto.classList.add("activo");

    }


    punto.addEventListener("click", () => {

        posicion = i;

        actualizarCarrusel();

    });


    indicadores.appendChild(punto);

}



/* =====================================================
   ACTUALIZAR
===================================================== */

function actualizarCarrusel() {

    track.style.transform =
        `translateX(-${posicion * 100}%)`;


    const puntos =
        document.querySelectorAll(
            ".indicador"
        );


    puntos.forEach((punto, index) => {

        punto.classList.toggle(
            "activo",
            index === posicion
        );

    });

}



/* =====================================================
   ANTERIOR
===================================================== */

anterior.addEventListener("click", () => {

    posicion--;

    if (posicion < 0) {

        posicion = total - 1;

    }

    actualizarCarrusel();

});



/* =====================================================
   SIGUIENTE
===================================================== */

siguiente.addEventListener("click", () => {

    posicion++;

    if (posicion >= total) {

        posicion = 0;

    }

    actualizarCarrusel();

});



/* =====================================================
   DESLIZAMIENTO CELULAR
===================================================== */

let inicioX = 0;

let diferenciaX = 0;

let tocando = false;


viewport.addEventListener(
    "touchstart",
    (evento) => {

        inicioX =
            evento.touches[0].clientX;

        diferenciaX = 0;

        tocando = true;

    },
    {
        passive: true
    }
);



viewport.addEventListener(
    "touchmove",
    (evento) => {

        if (!tocando) return;


        diferenciaX =
            evento.touches[0].clientX -
            inicioX;

    },
    {
        passive: true
    }
);



viewport.addEventListener(
    "touchend",
    () => {

        if (!tocando) return;


        tocando = false;


        if (
            Math.abs(diferenciaX) > 50
        ) {


            if (diferenciaX < 0) {

                posicion++;

                if (
                    posicion >= total
                ) {

                    posicion = 0;

                }

            }

            else {

                posicion--;

                if (
                    posicion < 0
                ) {

                    posicion =
                        total - 1;

                }

            }


            actualizarCarrusel();

        }


        diferenciaX = 0;

    }
);



/* =====================================================
   MODAL
===================================================== */

const modal =
    document.getElementById("modal");

const cerrarModal =
    document.getElementById(
        "cerrarModal"
    );

const modalImagen =
    document.getElementById(
        "modalImagen"
    );

const modalNombre =
    document.getElementById(
        "modalNombre"
    );

const modalAsignatura =
    document.getElementById(
        "modalAsignatura"
    );

const modalTelefono =
    document.getElementById(
        "modalTelefono"
    );



/* =====================================================
   ABRIR INFORMACIÓN
===================================================== */

profesores.forEach(profesor => {

    profesor.addEventListener(
        "click",
        () => {


            const imagen =
                profesor.querySelector(
                    "img"
                );


            const nombre =
                profesor.querySelector(
                    "h3"
                );


            const asignatura =
                profesor.querySelector(
                    ".asignatura"
                );


            const telefono =
                profesor.querySelector(
                    ".telefono span"
                );


            modalImagen.src =
                imagen.src;


            modalImagen.alt =
                imagen.alt;


            modalNombre.textContent =
                nombre.textContent;


            modalAsignatura.textContent =
                asignatura.textContent;


            modalTelefono.textContent =
                telefono.textContent;


            modal.classList.add(
                "activo"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});



/* =====================================================
   CERRAR MODAL
===================================================== */

function cerrarProfesor() {

    modal.classList.remove(
        "activo"
    );


    document.body.style.overflow =
        "";

}


cerrarModal.addEventListener(
    "click",
    cerrarProfesor
);



/* CERRAR AL TOCAR FUERA */

modal.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target === modal
        ) {

            cerrarProfesor();

        }

    }
);



/* CERRAR CON ESC */

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape"
        ) {

            cerrarProfesor();

        }

    }
);



/* =====================================================
   INICIAR
===================================================== */

actualizarCarrusel();


/*
=========================================================
IMPORTANTE:

NO existe setInterval()
NO existe setTimeout()

Por eso el carrusel NO es automático.

PC:
    ← →

CELULAR:
    Deslizar con el dedo

=========================================================
*/