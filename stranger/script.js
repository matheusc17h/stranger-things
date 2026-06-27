gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
});

// animaçoes da hero 

gsap.from(".inicio-bg", {
  y: -100,
  duration: 3,
  opacity: 0,
  duration: 2,
})

gsap.from(".inicio-img", {
  y: 200,
  opacity: 0,
  duration: 2,
  ease: "power3.out",
  immediateRender: false
});

// animaçoes cards section 2 

gsap.from(".tickets-cards", {


  opacity: 0,
  stagger: 1,
  filter: "blur(20px)",
  scrollTrigger: {
    trigger: ".tickets-cards",
    markers: false,
    start: "0% 80%",
    end: "100% 70%",
    scrub: true,
  }

});


gsap.from(".cidades ul li", {

  opacity: 0,
  stagger: .3,
  filter: "blur(20px)",
  scrollTrigger: {
    trigger: ".cidades ul li",
    markers: false,
    start: "0% 80%",
    end: "100% 70%",
    scrub: true,
  }

});

//letras animadas

const splitText = SplitText.create(".subtitle h3", {
  type: "words , chars"
});

gsap.from(splitText.chars, {
  y: 40,
  stagger: 0.05,
  duration: .5,
  opacity: 0,
  scrollTrigger: {
    trigger: ".subtitle h3",  
  }
});
