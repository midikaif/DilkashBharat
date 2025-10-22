document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // --- MOUSE FOLLOW EFFECT (GSAP) ---
  const mouseFollowImages = document.querySelectorAll(
    ".floating-image.mouse-follow"
  );

  let mouseX = 0;
  let mouseY = 0;
  let time = 0; // Global time variable for sine wave jiggle

  // Data structure to hold custom, unique properties for each image
  const imageStates = [];

  // 1. Initialization and Setup
  mouseFollowImages.forEach((img, index) => {
    let offsetX, offsetY;

    // Group 1 (Index 0 to 3): Tighter Cluster (range +/- 150px)
    if (index < 4) {
      offsetX = Math.random() * 300 - 150;
      offsetY = Math.random() * 300 - 150;
    }
    // Group 2 (Index 4 to 7): Looser Cluster (range +/- 400px)
    else {
      offsetX = Math.random() * 800 - 400;
      offsetY = Math.random() * 800 - 400;
    }

    const initialRotation = Math.random() * 360;
    const initialSkew = Math.random() * 10 - 5;

    imageStates.push({
      element: img,
      offsetX: offsetX,
      offsetY: offsetY,
      jiggleFreqX: 0.5 + Math.random() * 0.5,
      jiggleFreqY: 0.6 + Math.random() * 0.4,
      jiggleAmp: 25 + Math.random() * 25,
      initialRotation: initialRotation,
      initialSkewX: initialSkew,
      initialSkewY: initialSkew * 0.5,
      transformOrigin: "center center",
    });

    gsap.set(img, {
      x: offsetX,
      y: offsetY,
      rotation: initialRotation,
      skewX: initialSkew,
      skewY: initialSkew * 0.5,
      transformOrigin: "center center",
    });
  });

  // 2. Mouse Event Listener
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 3. Animation Loop using GSAP Ticker
  gsap.ticker.add(() => {
    time += 0.005;

    imageStates.forEach((state) => {
      // Jiggle (Water Current)
      const jiggleX = Math.sin(time * state.jiggleFreqX) * state.jiggleAmp;
      const jiggleY = Math.cos(time * state.jiggleFreqY) * state.jiggleAmp;

      // Target Calculation
      const targetPosX = mouseX + state.offsetX + jiggleX;
      const targetPosY = mouseY + state.offsetY + jiggleY;

      // Rotational Drift
      const rotationDrift = Math.sin(time * 0.1) * 10;
      const skewDrift = Math.cos(time * 0.15) * 2;

      // Animate with GSAP
      gsap.to(state.element, {
        x: targetPosX - state.element.offsetWidth / 2,
        y: targetPosY - state.element.offsetHeight / 2,
        rotation: state.initialRotation + rotationDrift,
        skewX: state.initialSkewX + skewDrift,
        skewY: state.initialSkewY - skewDrift,

        duration: 1.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    });
  });

  // --- AUTO-SCROLL SLIDER LOGIC ---
    // Initialize Lucide Icons
    lucide.createIcons();

    const carouselContainer = document.querySelector(".vertical-carousel-container");
    const sliderWrapper = document.querySelector(".slides-wrapper");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (sliderWrapper && slides.length > 0) {
      let currentIndex = 0;
      const slideCount = slides.length;
      const slideDuration = 4000; // 4 seconds per slide pause
      const transitionSpeed = 0.8; // 0.8 seconds for the slide animation
      let autoScrollInterval;

      // Get the height of one slide from the container's computed style
      // This is crucial for accurate pixel-based movement with GSAP.
      let slideHeight = carouselContainer?.offsetHeight;

      // Function to update the carousel position
      function goToSlide(index) {
        // Normalize the index to wrap around
        if (index < 0) {
          index = slideCount - 1;
        } else if (index >= slideCount) {
          index = 0;
        }
        currentIndex = index;

        // Animate the wrapper along the Y-axis using the calculated pixel height
        console.log(currentIndex*slideHeight);
        gsap.to(sliderWrapper, {
          y: -currentIndex * (slideHeight+10), // Use calculated pixel height
          duration: transitionSpeed,
          ease: "power2.inOut",
        });
      }

      // Function to start or restart the auto-scroll
      function startAutoScroll() {
        // Clear the existing interval before starting a new one
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, slideDuration);
      }

      // --- Button Handlers ---

      function handlePrev() {
        goToSlide(currentIndex - 1);
        startAutoScroll(); // Restart auto-scroll after manual click
      }

      function handleNext() {
        goToSlide(currentIndex + 1);
        startAutoScroll(); // Restart auto-scroll after manual click
      }

      prevBtn.addEventListener("click", handlePrev);
      nextBtn.addEventListener("click", handleNext);

      // Handle window resizing: Recalculate height and snap to the current slide position
      window.addEventListener("resize", () => {
        // Recalculate slide height on resize
        slideHeight = carouselContainer.offsetHeight;

        // Immediately snap to the correct pixel position
        gsap.set(sliderWrapper, {
          y: -currentIndex * slideHeight,
        });
      });

      // Start auto-scroll on load
      startAutoScroll();
    } else {
      console.error(
        "Vertical Carousel failed: Wrapper or slide elements not found."
      );
    }
  });
