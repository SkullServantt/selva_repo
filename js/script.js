// ======================================================
// ESPECTRO CINZA
// SCRIPT PRINCIPAL
// ======================================================


// ======================================================
// CONFIGURAÇÃO EDITÁVEL
// ======================================================
// Troque apenas os links abaixo.
//
// IMPORTANTE:
// Os links dos cursos serão abertos em uma NOVA ABA.
// As redes sociais também serão abertas em uma NOVA ABA.
// ======================================================

const LINKS = {

  courses: {

    l1:
      "https://hotmart.com/pt-br/marketplace/produtos/politica-baseada-em-evidencias/V101152435G",

    l2:
      "https://hotmart.com/pt-br/marketplace/produtos/tecnicas-de-estudo-baseadas-em-evidencia/O92083615P",

    l3:
      "https://hotmart.com/pt-br/marketplace/produtos/argumente-como-um-filosofo-introducao-a-argumentacao/T67226360Y",

    l4:
      "https://hotmart.com/pt-br/marketplace/produtos/como-politicos-enganam-voce/X95002076S",

    l5:
      "https://hotmart.com/pt-br/marketplace/produtos/pense-como-um-filosofo-metodos-e-ferramentas/I93558649J"

  },

  social: {

    discord:
      "https://discord.com/",

    x:
      "https://x.com/espectrocinza",

    youtube:
      "https://www.youtube.com/@espectrocinza",

    instagram:
      "https://www.instagram.com/espectrocinza/?hl=pt-br"

  }

};


// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  configurarLinks();

  configurarHeader();

  configurarMenuMobile();

  configurarReveal();

  configurarCursorGlow();

  configurarCarrossel();

  configurarVoltarTopo();

  configurarAno();

});


// ======================================================
// LINKS
// ======================================================

function configurarLinks() {


  // --------------------------------------------------
  // LINKS DOS CURSOS
  // --------------------------------------------------

  const courseLinks =
    document.querySelectorAll(".course-link");


  courseLinks.forEach(link => {

    const key =
      link.dataset.course;

    const url =
      LINKS.courses[key];


    // Não fazer nada se não houver URL válida
    if (!url || url === "#") {
      return;
    }


    // Define o endereço do link
    link.href = url;


    // Abrir em nova aba
    link.target = "_blank";


    // Segurança
    link.rel = "noopener noreferrer";


    // ------------------------------------------------
    // Clique
    // ------------------------------------------------

    link.addEventListener("click", event => {

      // Impede o comportamento padrão do navegador
      event.preventDefault();

      // Impede que o clique seja tratado pelo carrossel
      event.stopPropagation();


      // Abre o curso em uma nova aba
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  });


  // --------------------------------------------------
  // LINKS DAS REDES SOCIAIS
  // --------------------------------------------------

  const socialLinks =
    document.querySelectorAll(".social-card");


  socialLinks.forEach(link => {

    const key =
      link.dataset.social;

    const url =
      LINKS.social[key];


    // Ignora links ainda não configurados
    if (!url || url === "#") {
      return;
    }


    // Define URL
    link.href = url;


    // Nova aba
    link.target = "_blank";


    // Segurança
    link.rel = "noopener noreferrer";


    // Clique
    link.addEventListener("click", event => {

      event.preventDefault();

      event.stopPropagation();


      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  });

}


// ======================================================
// STICKY HEADER
// ======================================================

function configurarHeader() {

  const header =
    document.getElementById("site-header");

  const backTop =
    document.getElementById("back-top");


  // Se algum elemento não existir,
  // simplesmente não executa esta função.
  if (!header || !backTop) {
    return;
  }


  function updateHeader() {

    const scrolled =
      window.scrollY > 25;


    // Header
    header.classList.toggle(
      "scrolled",
      scrolled
    );


    // Botão voltar ao topo
    if (window.scrollY > 450) {

      backTop.style.opacity = "1";

      backTop.style.pointerEvents =
        "auto";

    } else {

      backTop.style.opacity = ".35";

      backTop.style.pointerEvents =
        "none";

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();

}


// ======================================================
// MENU MOBILE
// ======================================================

function configurarMenuMobile() {

  const menuToggle =
    document.getElementById("menu-toggle");

  const navLinks =
    document.getElementById("nav-links");


  if (!menuToggle || !navLinks) {
    return;
  }


  // --------------------------------------------------
  // Abrir / fechar menu
  // --------------------------------------------------

  menuToggle.addEventListener(
    "click",
    () => {

      const open =
        navLinks.classList.toggle("open");


      menuToggle.classList.toggle(
        "active",
        open
      );


      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );


      document.body.classList.toggle(
        "menu-open",
        open
      );

    }
  );


  // --------------------------------------------------
  // Fechar menu ao clicar em um link
  // --------------------------------------------------

  navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "open"
          );


          menuToggle.classList.remove(
            "active"
          );


          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );


          document.body.classList.remove(
            "menu-open"
          );

        }
      );

    });

}


// ======================================================
// REVEAL ON SCROLL
// ======================================================

function configurarReveal() {

  const revealItems =
    document.querySelectorAll(".reveal");


  // Nenhum elemento
  if (!revealItems.length) {
    return;
  }


  // Navegadores modernos
  if ("IntersectionObserver" in window) {


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(element => {

      observer.observe(element);

    });


  } else {


    // Fallback
    revealItems.forEach(element => {

      element.classList.add(
        "visible"
      );

    });

  }

}


// ======================================================
// CURSOR GLOW
// ======================================================

function configurarCursorGlow() {

  const glow =
    document.querySelector(".cursor-glow");


  if (!glow) {
    return;
  }


  // Só executa em desktop
  const pointerFine =
    window.matchMedia(
      "(pointer:fine)"
    ).matches;


  // Respeita redução de movimento
  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    !pointerFine ||
    reducedMotion
  ) {

    glow.style.display = "none";

    return;

  }


  let gx =
    window.innerWidth / 2;

  let gy =
    window.innerHeight / 2;


  let tx = gx;
  let ty = gy;


  // --------------------------------------------------
  // Movimento do mouse
  // --------------------------------------------------

  window.addEventListener(
    "mousemove",
    event => {

      tx = event.clientX;

      ty = event.clientY;

      glow.style.opacity = "1";

    },
    {
      passive: true
    }
  );


  // --------------------------------------------------
  // Mouse saiu da janela
  // --------------------------------------------------

  window.addEventListener(
    "mouseleave",
    () => {

      glow.style.opacity = "0";

    }
  );


  // --------------------------------------------------
  // Animação
  // --------------------------------------------------

  function moveGlow() {

    gx +=
      (tx - gx) * 0.12;

    gy +=
      (ty - gy) * 0.12;


    glow.style.left =
      gx + "px";

    glow.style.top =
      gy + "px";


    requestAnimationFrame(
      moveGlow
    );

  }


  moveGlow();

}


// ======================================================
// CARROSSEL
// ======================================================

function configurarCarrossel() {

  const track =
    document.getElementById(
      "course-track"
    );

  const dots =
    document.getElementById(
      "dots"
    );

  const previous =
    document.getElementById(
      "prev"
    );

  const next =
    document.getElementById(
      "next"
    );


  // --------------------------------------------------
  // Verificação
  // --------------------------------------------------

  if (!track) {
    return;
  }


  const cards =
    [
      ...track.querySelectorAll(
        ".course-card"
      )
    ];


  if (!cards.length) {
    return;
  }


  let activeIndex = 0;


  // ==================================================
  // DOTS
  // ==================================================

  if (dots) {

    // Evita duplicação dos dots
    dots.innerHTML = "";


    cards.forEach(
      (_, index) => {

        const dot =
          document.createElement(
            "button"
          );


        dot.type = "button";


        dot.setAttribute(
          "aria-label",
          `Ir para curso ${index + 1}`
        );


        dot.addEventListener(
          "click",
          () => {

            scrollToCard(index);

          }
        );


        dots.appendChild(dot);

      }
    );

  }


  // ==================================================
  // TAMANHO DO CARD
  // ==================================================

  function cardStep() {

    const card =
      cards[0];


    if (!card) {
      return 0;
    }


    const styles =
      getComputedStyle(track);


    const gap =
      parseFloat(
        styles.columnGap ||
        styles.gap ||
        "18"
      );


    return (
      card.getBoundingClientRect()
        .width
      + gap
    );

  }


  // ==================================================
  // IR PARA CARD
  // ==================================================

  function scrollToCard(index) {

    activeIndex =
      Math.max(
        0,
        Math.min(
          index,
          cards.length - 1
        )
      );


    const card =
      cards[activeIndex];


    if (!card) {
      return;
    }


    track.scrollTo({

      left:
        card.offsetLeft - 2,

      behavior:
        "smooth"

    });


    updateDots();

  }


  // ==================================================
  // ATUALIZAR DOTS
  // ==================================================

  function updateDots() {

    if (!dots) {
      return;
    }


    [
      ...dots.children
    ].forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === activeIndex
        );

      }
    );

  }


  // ==================================================
  // BOTÃO ANTERIOR
  // ==================================================

  if (previous) {

    previous.addEventListener(
      "click",
      () => {

        scrollToCard(
          activeIndex - 1
        );

      }
    );

  }


  // ==================================================
  // BOTÃO PRÓXIMO
  // ==================================================

  if (next) {

    next.addEventListener(
      "click",
      () => {

        scrollToCard(
          activeIndex + 1
        );

      }
    );

  }


  // ==================================================
  // SCROLL DO CARROSSEL
  // ==================================================

  track.addEventListener(
    "scroll",
    () => {

      const step =
        cardStep();


      if (!step) {
        return;
      }


      const index =
        Math.round(
          track.scrollLeft / step
        );


      if (
        index !== activeIndex
      ) {

        activeIndex =
          Math.max(
            0,
            Math.min(
              index,
              cards.length - 1
            )
          );


        updateDots();

      }

    },
    {
      passive: true
    }
  );


  // Inicializa dots
  updateDots();


  // ==================================================
  // DRAG / TOUCH
  // ==================================================

  let dragging = false;

  let startX = 0;

  let startScroll = 0;

  let dragged = false;


  // --------------------------------------------------
  // COMEÇAR DRAG
  // --------------------------------------------------

  track.addEventListener(
    "pointerdown",
    event => {


      // ==============================================
      // IMPORTANTE:
      // Se clicou em um link, NÃO iniciar o drag.
      // Isso permite que os botões funcionem.
      // ==============================================

      if (
        event.target.closest(
          "a"
        )
      ) {

        return;

      }


      dragging = true;

      dragged = false;


      startX =
        event.clientX;


      startScroll =
        track.scrollLeft;


      try {

        track.setPointerCapture(
          event.pointerId
        );

      } catch (error) {

        // Alguns dispositivos podem
        // não permitir pointer capture.

      }


      track.style.cursor =
        "grabbing";

    }
  );


  // --------------------------------------------------
  // MOVER DRAG
  // --------------------------------------------------

  track.addEventListener(
    "pointermove",
    event => {


      if (!dragging) {
        return;
      }


      const distance =
        event.clientX - startX;


      // Considera drag somente depois
      // de mover alguns pixels.

      if (
        Math.abs(distance) > 5
      ) {

        dragged = true;

      }


      track.scrollLeft =
        startScroll -
        distance;

    }
  );


  // --------------------------------------------------
  // FINALIZAR DRAG
  // --------------------------------------------------

  [
    "pointerup",
    "pointercancel",
    "pointerleave"
  ].forEach(type => {

    track.addEventListener(
      type,
      () => {

        dragging = false;

        track.style.cursor =
          "";

      }
    );

  });


  // ==================================================
  // IMPEDIR CLIQUE ACIDENTAL APÓS ARRASTE
  // ==================================================

  track.addEventListener(
    "click",
    event => {

      if (!dragged) {
        return;
      }


      // Se realmente houve drag,
      // impede o clique acidental.

      if (
        event.target.closest("a")
      ) {

        event.preventDefault();

        event.stopPropagation();

      }


      dragged = false;

    },
    true
  );

}


// ======================================================
// VOLTAR AO TOPO
// ======================================================

function configurarVoltarTopo() {

  const backTop =
    document.getElementById(
      "back-top"
    );


  if (!backTop) {
    return;
  }


  backTop.addEventListener(
    "click",
    event => {

      event.preventDefault();


      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


// ======================================================
// ANO AUTOMÁTICO
// ======================================================

function configurarAno() {

  const year =
    document.getElementById(
      "year"
    );


  if (!year) {
    return;
  }


  year.textContent =
    new Date().getFullYear();

}