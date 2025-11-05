document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("partnerSliderTrack");
  const slides = document.querySelectorAll(".partner-slide");
  const totalSlides = slides.length;
  const slideInterval = 3000;
  let index = 0;

  // Duplicate slides for smooth looping
  track.innerHTML += track.innerHTML;

  // Create dots
  const dotsContainer = document.getElementById("partnerDots");
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("partner-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".partner-dot");

  function slidesPerView() {
    return window.innerWidth <= 768 ? 1 : 4;
  }

  function updateSlider() {
    const spv = slidesPerView();
    const shiftPercent = 100 / spv;
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * shiftPercent}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index % totalSlides].classList.add("active");
  }

  function nextSlide() {
    index++;
    updateSlider();
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

  window.addEventListener("resize", updateSlider);
});
