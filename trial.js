// JavaScript
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.nav-button');
let currentSlide = 0;
let interval = null;

// Set slider width and height
slider.style.width = `${slides.length * 100}%`;
slider.style.height = '100%';

// Set slide width and height
slides.forEach((slide) => {
  slide.style.width = `${100 / slides.length}%`;
  slide.style.height = '100%';
});

// Add event listeners to navigation buttons
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('prev')) {
      currentSlide--;
    } else {
      currentSlide++;
    }
    updateSlider();
  });
});

// Update slider function
function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  // Reset interval
  clearInterval(interval);
  interval = null;
}

// Auto-slide function
function autoSlide() {
  if (currentSlide === 0) {
    // If current slide is image, slide to video after 3 seconds
    interval = setTimeout(() => {
      currentSlide = 1;
      updateSlider();
    }, 3000);
  } else {
    // If current slide is video, slide back to image after video ends
    const video = slides[1].querySelector('video');
    video.addEventListener('ended', () => {
      currentSlide = 0;
      updateSlider();
    });
  }
}

// Initialize slider and auto-slide
updateSlider();
autoSlide();