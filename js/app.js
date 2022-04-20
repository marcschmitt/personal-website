// --------------------------------WORKAROUND TO GET SCROLLTRIGGER POSITION WORKING
["visibilitychange", "DOMContentLoaded", "load", "resize"].forEach((e) => {
  window.addEventListener(e, () => ScrollTrigger.refresh());
});

// --------------------------------JUMP TO TOP OF PAGE ON RELOAD
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();
};

// --------------------------------CUSTOM CURSOR
// --------------------------------CURSOR

const customCursor = document.querySelector(".custom-cursor");

const moveCursor = (event) => {
  customCursor.style.opacity = 1;
  // used to set start to removeCursor
  start = window.pageYOffset;
  customCursor.style.top = event.clientY + "px";
  customCursor.style.left = event.clientX + "px";
};

window.addEventListener("mousemove", moveCursor);

// --------------------------------REMOVE CURSOR ON SCROLLING
let start, currentPositon;
let lastScrollStop = 0;

function removeCursor() {
  // sets start value
  if (!start) {
    start = window.pageYOffset;
  }

  // get continously the current position
  currentPositon = window.pageYOffset;

  // if scroll down or scroll up more than 500px
  if (start - currentPositon < -500 || currentPositon - lastScrollStop < -500) {
    // change opacity
    customCursor.style.opacity = 0;

    // reset the variables
    start = null;
    currentPositon = null;
    lastScrollStop = null;
  }

  // set lastScrollStop to register scrolling up
  if (currentPositon > lastScrollStop) {
    lastScrollStop = currentPositon;
  }
}

window.addEventListener("scroll", removeCursor);

// --------------------------------COLOR ANIMATION FOR CURSOR

const projectSection = document.querySelector(".projects");

function changeMouseColor() {
  customCursor.style.backgroundColor = "white";
}

function rechangeMouseColor() {
  customCursor.style.backgroundColor = "#e0e0e0";
}

projectSection.addEventListener("mouseenter", changeMouseColor);
projectSection.addEventListener("mouseleave", rechangeMouseColor);

// --------------------------------JS WORKAROUND FOR SITENAVIGATION INSTEAD ANCHOR HOOKS
// --------------------------------DEFINE MAIN SECTIONS

const intro = document.querySelector("#intro");
const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const contact = document.querySelector("#contact");

// --------------------------------QUERY NAVIGATION LINKS

const navIntro = document.querySelector(".nav-intro");
const navAbout = document.querySelector(".nav-about");
const navProjects = document.querySelector(".nav-projects");
const navContact = document.querySelector(".nav-contact");
const navScroll = document.querySelector(".nav-scroll");

// --------------------------------SITENAVIGATION VIA SCROLLINTOVIEW

navIntro.addEventListener("click", () => {
  intro.scrollIntoView({ block: "start", behavior: "smooth" });
});
navAbout.addEventListener("click", () => {
  about.scrollIntoView({ block: "start", behavior: "smooth" });
});
navProjects.addEventListener("click", () => {
  projects.scrollIntoView({ block: "start", behavior: "smooth" });
});
navContact.addEventListener("click", () => {
  contact.scrollIntoView({ block: "start", behavior: "smooth" });
});
navScroll.addEventListener("click", () => {
  intro.scrollIntoView({ block: "start", behavior: "smooth" });
});

// --------------------------------INTRO TEXT ANIMATION WITH MEDIA QUERY
const mediaQuery = window.matchMedia("(min-width: 768px)");
let tlIntroText = gsap.timeline();

function handleMobileChange(e) {
  if (e.matches) {
    tlIntroText
      .from(".intro-title-span, .intro-title-span-secondary", {
        y: "70vh",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1,
      })
      .to(
        ".intro-title-span, .intro-title-span-secondary",
        {
          fontVariationSettings: "'wght' " + 600,
        },
        "=-0.1"
      )
      .from(".scroll-nav, .nav", {
        opacity: 0,
      });
  } else {
    tlIntroText
      .from(".intro-title-span, .intro-title-span-secondary", {
        y: "50vh",
        lineHeight: "6rem",
        duration: 2.8,
        ease: "power2.out",
      })
      .to(
        ".intro-title-span, .intro-title-span-secondary",

        {
          fontVariationSettings: "'wght' " + 600,
        }
      );
  }
}

mediaQuery.addEventListener("change", handleMobileChange);

handleMobileChange(mediaQuery);

// --------------------------------SCROLLTRIGGER MATCH MEDIA

ScrollTrigger.matchMedia({
  // TABLET
  "(min-width: 768px)": function () {
    // TWO COLUMN DIV SCROLLING

    ScrollTrigger.create({
      trigger: ".about-introduction-short",
      start: "top center-=25%",
      endTrigger: ".breaker",
      end: "bottom bottom-=15%",
      pin: true,
      scrub: true,
      // markers: true,
    });

    ScrollTrigger.create({
      trigger: ".knowhow-short",
      start: "top top+=15%",
      end: "bottom bottom-=10%",
      pin: true,
      scrub: true,
      // markers: true,
    });
  },
});

// --------------------------------COLOR CHANGE ANIMATION ABOUT FROM DARK TO LIGHT

let tlAboutSection = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "bottom center+=30%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

tlAboutSection
  .to("#intro", {
    backgroundColor: "#fff",
    duration: 1.2,
    ease: "power1.inOut",
  })
  .from(
    "#about",
    {
      backgroundColor: "#000",
      duration: 1.2,
      ease: "power1.inOut",
    },
    0
  )
  .to(
    ".intro-title-span",
    {
      color: "#d3d3d3",
      duration: 1.2,
      ease: "power1.inOut",
    },
    0.2
  )
  .to(
    ".nav-intro",
    {
      color: "#000",
      duration: 0.9,
      ease: "power1.inOut",
    },
    0
  )
  .from(
    ".nav-list-item",
    {
      paddingTop: "-12rem",
      ease: "power2.out",
      stagger: 0.1,
    },
    "-=0.5"
  )
  .to(
    [".nav-about", ".nav-projects", ".nav-contact"],
    {
      color: "#000",
      opacity: 1,
      ease: "power1.inOut",
    },
    "-=0.5"
  );

// --------------------------------CHANGE SCROLL NAVIGATION COLOR & ANIMATION

let tlScrollNav = gsap.timeline({
  scrollTrigger: {
    trigger: "#about",
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

tlScrollNav
  .to(".nav-scroll", {
    color: "#000",
    pointerEvents: "all",
    cursor: "pointer",
    ease: "power4.inOut",
    duration: 0.1,
  })
  .to(".scroll-nav-line-bg", {
    backgroundColor: "#000",
    ease: "power4.inOut",
    duration: 0.1,
  });

// --------------------------------UNDERLINE NAVIGATION LINKS
// --------------------------------UNDERLINE ABOUT

gsap.to(".nav-about", {
  scrollTrigger: {
    trigger: "#about",
    start: "top-=5% center",
    end: "bottom center",
    toggleActions: "play reverse play reverse",
    // markers: true,
  },
  borderBottom: "1px solid #000",
  paddingBottom: "0.25rem",
  ease: "power4.inOut",
  duration: 0.1,
});
// --------------------------------UNDERLINE PROJECTS

gsap.to(".nav-projects", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top+=5% center",
    end: "bottom center+=5%",
    toggleActions: "play reverse play reverse",
    // markers: true,
  },
  borderBottom: "1px solid #000",
  paddingBottom: "0.25rem",
  ease: "power4.inOut",
  duration: 0.1,
});

// --------------------------------UNDERLINE CONTACT

let tlNavContact = gsap.timeline({
  scrollTrigger: {
    trigger: "#contact",
    start: "top+=15% center",
    end: "bottom center+=5%",
    toggleActions: "play reverse play reverse",
    // markers: true,
  },
});

tlNavContact
  .to(".nav-contact", {
    borderBottom: "1px solid #000",
    paddingBottom: "0.25rem",
    ease: "power4.inOut",
    duration: 0.1,
  })
  .to(".nav-scroll", {
    innerText: "to top",
  });

// --------------------------------LINE ANIMATION ABOUT

let tlAboutLine = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-introduction",
    start: "top bottom-=10%",
    end: "bottom center",
    toggleActions: "play none none none",
    // markers: true,
  },
});

tlAboutLine
  .from(".about-introduction-short-line-bg", {
    xPercent: -100,
    ease: "power3.out",
    duration: 1.5,
  })
  .from(
    ".about-introduction-short-headline, .about-introduction-short p",
    {
      opacity: 0,
      y: "10vh",
      stagger: 0.1,
    },
    0.4
  );

// --------------------------------LINE ANIMATION KNOWHOW

let tlKnowhowLine = gsap.timeline({
  scrollTrigger: {
    trigger: ".knowhow-short-title-line",
    start: "top-=10% bottom-=10%",
    end: "bottom center",
    toggleActions: "play none none none",
    // markers: true,
  },
});

tlKnowhowLine
  .from(".knowhow-short-title-line-bg", {
    xPercent: -100,
    ease: "power3.out",
    duration: 1.5,
  })
  .from(
    ".knowhow-short-title, .knowhow-short-description",
    {
      opacity: 0,
      y: "10vh",
      stagger: 0.1,
    },
    0.4
  )
  .from(
    ".stack-list-item",
    {
      opacity: 0,
      y: "30vh",
      ease: "power2.out",
      stagger: 0.2,
    },
    "=-0.5"
  );

// --------------------------------STACK LIST ITEMS SCROLL ANIMATION

gsap.to([".item1"], {
  scrollTrigger: {
    trigger: [".item1"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item2"], {
  scrollTrigger: {
    trigger: [".item2"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item3"], {
  scrollTrigger: {
    trigger: [".item3"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item4"], {
  scrollTrigger: {
    trigger: [".item4"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item5"], {
  scrollTrigger: {
    trigger: [".item5"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item6"], {
  scrollTrigger: {
    trigger: [".item6"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

gsap.to([".item7"], {
  scrollTrigger: {
    trigger: [".item7"],
    start: "top center+=10%",
    end: "top center",
    toggleActions: "play reverse play reverse",
  },
  color: "rgba(0, 0, 0, 0.2)",
  duration: 0.1,
  ease: "power4.inOut",
});

// --------------------------------LINE ANIMATION - PROJECTS

let tlProject = gsap.timeline({
  scrollTrigger: {
    trigger: ".project-title",
    start: "top bottom-=10%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

tlProject
  .from(".project-short-line-bg", {
    xPercent: -100,
    ease: "power3.out",
    duration: 1.5,
  })
  .from(
    ".project-title",
    {
      opacity: 0,
      y: "1vh",
      ease: "power2.out",
    },
    0.4
  )
  .from(
    ".project-list-item",
    {
      opacity: 0,
      y: "10vh",
      ease: "power2.out",
      duration: 1.4,
      // stagger: 0.1,
    },
    0.3
  )
  .from(
    ".project-short-description p",
    {
      opacity: 0,
      y: "10vh",
      ease: "power2.out",
    },
    "=-1.2"
  );

// --------------------------------QUOTE BACKGROUND DROPDOWN

let tlQuote = gsap.timeline({
  scrollTrigger: {
    trigger: ".quote",
    start: "top bottom-=20%",
    end: "bottom bottom-=20%",
    toggleActions: "play none none none",
    // markers: true,
  },
});

tlQuote
  .from(".quote-inner", {
    ease: "power1.in",
    duration: 0.8,
    yPercent: -100,
  })
  .from(
    ".quote-text, .quote-name",
    {
      opacity: 0,
      y: "10vh",
    },
    "=-0.2"
  );

// --------------------------------PAPER PLANE ANIMATION
// --------------------------------MAILTO VIA JS WITH DELAY

const cta = document.querySelector(".contact-cta-mail");
function email() {
  setTimeout(function () {
    document.location.href = "mailto:marcschmitt@outlook.com";
  }, 1500);
}

cta.addEventListener("click", () => {
  gsap.fromTo(
    ".paper-plane",
    { opacity: 1 },

    {
      duration: 4.5,
      ease: "power4.out",
      transformOrigin: "top left",
      motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: true,
      },
    }
  );
});
