function enviarReserva() {
  alert("Reserva enviada com sucesso! Entraremos em contato em breve.");
  return false; // impede envio real por enquanto
}

// Função para inicializar cada carrossel
function initCarousel(carouselContainer) {
  console.log('initCarousel called');
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

  // Event listeners
  prevBtn.addEventListener('click', goToPrev);
  nextBtn.addEventListener('click', goToNext);

  // Inicialização
  showImage(currentIndex);
  startAutoSlide();

  // Pausa auto-slide quando o mouse está sobre o carrossel
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  return {
    goToPrev,
    goToNext
  };
}

// WhatsApp floating button
function createWhatsAppButton() {
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/5581997362639';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.className = 'whatsapp-float';
  whatsappBtn.setAttribute('aria-label', 'Contato via WhatsApp');
  whatsappBtn.innerHTML = '<img src="Img/whatsapp.png" alt="WhatsApp" />';
  document.body.appendChild(whatsappBtn);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  // Inicializar todos os carrosséis
  const carousels = document.querySelectorAll('.quarto-carousel');
  if (carousels.length === 0) {
    console.log('No carousels found on this page.');
  } else {
    console.log(`Found ${carousels.length} carousel(s), initializing...`);
    carousels.forEach((carousel, index) => {
      console.log(`Initializing carousel #${index + 1}`);
      initCarousel(carousel);
    });
  }

  // Formulário de reserva
  const form = document.querySelector('.reserva-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      enviarReserva();
    });
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      console.log('Hamburger clicked');
      const isOpen = mobileMenu.classList.toggle('open');
      console.log('Menu open state:', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.classList.toggle('open', isOpen);
    });
  }
});
