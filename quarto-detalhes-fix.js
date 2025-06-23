document.addEventListener('DOMContentLoaded', function() {
  // Function to get URL query parameters
  function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('#mobile-menu .menu-link');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when any menu link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Only close menu if href is not empty and not just '#'
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.endsWith('/')) {
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  });

  // Reservation button redirect with parameters
  const params = getQueryParams();
  const btnReservar = document.getElementById('btn-reservar');
  if (btnReservar) {
    btnReservar.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('btn-reservar clicked');
      console.log('Params:', params);
      try {
        if (params.checkin && params.checkout && params.hospedes) {
          const url = new URL('Reserva.html', window.location.origin);
          url.searchParams.set('checkin', params.checkin);
          url.searchParams.set('checkout', params.checkout);
          url.searchParams.set('hospedes', params.hospedes);
          console.log('Redirecting to:', url.toString());
          window.location.assign(url.toString());
        } else {
          console.log('Missing reservation data, cannot redirect');
          alert('Dados de reserva incompletos. Por favor, selecione as datas e o número de hóspedes.');
        }
      } catch (error) {
        console.error('Error during redirect:', error);
        alert('Ocorreu um erro ao tentar redirecionar para a página de reserva.');
      }
    });
  }
});
function initCarousel(carouselContainer) {
  const images = carouselContainer.querySelectorAll('.carousel-image');
  const prevBtn = carouselContainer.querySelector('.prev-btn');
  const nextBtn = carouselContainer.querySelector('.next-btn');
  let currentIndex = 0;
  let autoSlideInterval;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    resetAutoSlide();
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(goToNext, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);

  showImage(currentIndex);
  startAutoSlide();

  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');
  if (carousels.length === 0) {
    console.log('Nenhum carrossel encontrado.');
  } else {
    carousels.forEach((carousel, index) => {
      console.log(`Inicializando carrossel ${index + 1}`);
      initCarousel(carousel);
    });
  }
});
