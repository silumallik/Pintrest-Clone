const scroll = new FeatherScroll({
  smooth: true, // Enable smooth scrolling
  duration: 1.2, // Scroll duration (seconds)
  easing: (t) => 1 - Math.pow(1 - t, 3), // Easing function
  direction: 'vertical', // 'vertical' | 'horizontal'
  gestureDirection: 'both', // Mouse/touch gesture control
  mouseSensitivity: 1, // Sensitivity for wheel scrolling
  touchSensitivity: 2, // Sensitivity for touch scrolling
  infinite: false // Infinite scrolling
});
gsap.to(".vdo", {
  width: 180,
  height: 105,
  scrollTrigger: {
    trigger: ".vdo",
    start: "top 10%",
    end: " -=40%",
    scrub: true,
  }
})
gsap.to("#img", {
  y: -705,
  scrollTrigger: {
    trigger: ".page2",
    start: "top 0%",
    end: "+=200%",
    pin: true,
    scrub: 1,
  }
})

gsap.from(".pageh1 h1",{
  x: -600,
  scrollTrigger:{
    trigger:".pageh1",
    start:"top 80%",
    end:"top 20%",
    scrub:true,
  }
})
gsap.from(".pageh2 h1",{
  x: -600,
  scrollTrigger:{
    trigger:".pageh2",
    start:"top 80%",
    end:"top 20%",
    scrub:true,
  }
})
gsap.from(".pageh3 #mot,#agn",{
  x: -600,
  scrollTrigger:{
    trigger:".pageh2",
    start:"top 40%",
    end:"top 0%",
    scrub:true,
  }
})




