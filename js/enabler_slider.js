const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const slidesPerView = 4;
  const slideInterval = 3000; // 3 seconds
  let index = 0;

  // Duplicate all slides for smooth infinite loop
  track.innerHTML += track.innerHTML;

  // Create dots
  const dotsContainer = document.getElementById("dotsContainer");
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * 25}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index % totalSlides].classList.add("active");
  }

  function nextSlide() {
    index++;
    updateSlider();
    // When we reach the cloned set, reset smoothly
    if (index >= totalSlides) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0)`;
      }, 800);
    }
  }

  function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
  }

  let autoSlide = setInterval(nextSlide, slideInterval);