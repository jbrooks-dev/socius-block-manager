/**
 * Hero Carousel Frontend JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".hero-carousel");

  carousels.forEach((carousel) => {
    const imagesData = carousel.getAttribute("data-carousel-images");

    if (!imagesData) return;

    let images = [];
    try {
      images = JSON.parse(imagesData);
    } catch (e) {
      console.error("Failed to parse carousel images:", e);
      return;
    }

    if (images.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;

    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const indicators = carousel.querySelectorAll(".carousel-indicator");

    function updateCarousel(index) {
      currentIndex = index;

      // Update background image
      carousel.style.backgroundImage = `url(${images[currentIndex].url})`;

      // Update indicators
      indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel(currentIndex);
    }

    function prevSlide() {
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateCarousel(currentIndex);
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Indicator buttons
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        updateCarousel(index);
        resetAutoplay();
      });
    });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Initialize first image and start autoplay
    updateCarousel(0);
    startAutoplay();

    // Pause autoplay on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
      startAutoplay();
    });
  });
});
