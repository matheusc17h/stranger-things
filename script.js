gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const mm = gsap.matchMedia();

mm.add(
  {
    motion: "(prefers-reduced-motion: no-preference)",
    reduce: "(prefers-reduced-motion: reduce)",
    touch: "(hover: none) and (pointer: coarse)",
  },
  (context) => {
    const { reduce, touch } = context.conditions;
    if (reduce) return; // sem animações: conteúdo já está visível pelo CSS

    // create the scrollSmoother before your scrollTriggers
    // no touch fica o scroll nativo: mais fluido e economiza bateria
    if (!touch) {
      ScrollSmoother.create({
        smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
      });
    }

    // animaçoes da hero

    gsap.from(".inicio-bg img", {
      y: -100,
      opacity: 0,
      duration: 2,
    });

    gsap.from(".inicio-img img", {
      y: 200,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    });

    // animaçoes cards section 2
    // blur com scrub é caro: no touch usa só opacidade/deslocamento

    gsap.from(".tickets-cards", {
      opacity: 0,
      y: touch ? 30 : 0,
      stagger: touch ? 0.15 : 1,
      filter: touch ? "none" : "blur(20px)",
      scrollTrigger: {
        trigger: ".cards",
        start: "0% 80%",
        end: "100% 70%",
        scrub: true,
      },
    });

    gsap.from(".cidades ul li", {
      opacity: 0,
      stagger: 0.3,
      filter: touch ? "none" : "blur(20px)",
      scrollTrigger: {
        trigger: ".cidades ul",
        start: "0% 80%",
        end: "100% 70%",
        scrub: true,
      },
    });

    //letras animadas

    const split = SplitText.create(".subtitle h2", {
      type: "words, chars",
      aria: "auto",
    });

    gsap.from(split.chars, {
      y: 40,
      stagger: 0.05,
      duration: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: ".subtitle h2",
      },
    });

    return () => split.revert();
  }
);

// links internos (#ingressos, #cidades): passam pelo smoother quando ele existe
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
  link.addEventListener("click", (e) => {
    const smoother = ScrollSmoother.get();
    const target = document.querySelector(link.getAttribute("href"));
    if (!smoother || !target) return;
    e.preventDefault();
    smoother.scrollTo(target, true, "top top");
  });
});

// recalcula posições quando fontes e imagens terminam de carregar
window.addEventListener("load", () => ScrollTrigger.refresh());
