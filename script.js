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

  // Adicionar event listener para o botão "Procurar"
  const btnProcurar = document.getElementById('btnVerificar');
  if (btnProcurar) {
    btnProcurar.addEventListener('click', () => {
      filterApartments();
    });
  }

  // Auto slide for reviews carousel
  const reviewsCarousel = document.querySelector('.airbnb-reviews-carousel');
  if (reviewsCarousel) {
    let scrollAmount = 0;
    const scrollStep = 2; // pixels per interval
    const maxScroll = reviewsCarousel.scrollWidth - reviewsCarousel.clientWidth;

    function autoScroll() {
      scrollAmount += scrollStep;
      if (scrollAmount > maxScroll) {
        scrollAmount = 0;
      }
      reviewsCarousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }

    let autoScrollInterval = setInterval(autoScroll, 50);

    reviewsCarousel.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });

    reviewsCarousel.addEventListener('mouseleave', () => {
      autoScrollInterval = setInterval(autoScroll, 50);
    });
  }

  // Formulário de reserva
    const form = document.querySelector('#reservas');
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

// Validação de datas
  function isValidDateRange() {
  const dateInput = document.querySelector('#checkin-checkout');
  if (!dateInput) return false;

  const value = dateInput.value.trim();
  const dates = value.split(/ a | até | to | - /);
  if (dates.length !== 2) return false;

  const [start, end] = dates.map(d => d.trim());

  // Parse dates in DD/MM/YYYY format
  function parseDateDMY(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  }

  const startDate = parseDateDMY(start);
  const endDate = parseDateDMY(end);

  if (!startDate || isNaN(startDate) || !endDate || isNaN(endDate)) return false;

  const diffTime = endDate - startDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays >= 2;
}

// Notificação de validação
  function showValidationNotification(message) {
    let notification = document.getElementById('validationNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'validationNotification';
      notification.className = 'validation-notification';
      notification.setAttribute('role', 'alert');
      notification.setAttribute('aria-live', 'assertive');
      notification.setAttribute('aria-atomic', 'true');
      document.body.appendChild(notification);
    }
    notification.innerHTML = '<strong>Datas obrigatórias</strong><br>' + message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 4000);
  }


  // Filtro de apartamentos
  function filterApartments() {
  if (!isValidDateRange()) {
    showValidationNotification('Por favor, selecione um período válido de no mínimo 2 diárias');
    return;
  }

  const dateInput = document.querySelector('#checkin-checkout');
  const filtroHospedes = document.getElementById('filtro-hospedes');

  if (!filtroHospedes || !dateInput) {
    showValidationNotification('Por favor, selecione as informações corretamente.');
    return;
  }

  const valorSelecionado = parseInt(filtroHospedes.value);
  const value = dateInput.value.trim();
  const [start, end] = value.split(/ a | até | to | - /).map(d => d.trim());

  // Simulação de dados mock para teste sem backend
  const mockData = [
    {
      id: 1,
      nome: "Apartamento Teste 1",
      descricao: "Apartamento confortável e bem localizado.",
      quartos: 3,
      camas: 4,
      banheiros: 2,
      capacidade: 6,
      preco: 350,
      imagem: "Img/FullSizeRender.JPG"
    },
    {
      id: 2,
      nome: "Apartamento Teste 2",
      descricao: "Apartamento moderno com vista para o mar.",
      quartos: 2,
      camas: 3,
      banheiros: 1,
      capacidade: 4,
      preco: 280,
      imagem: "Img/QUARTO1.avif"
    }
  ];

  const container = document.querySelector('#resultados');
  if (!container) return;

  container.innerHTML = ''; // limpa resultados anteriores

  // Filtra mockData conforme capacidade selecionada
  const filteredData = mockData.filter(ap => valorSelecionado === 0 || ap.capacidade >= valorSelecionado);

  if (filteredData.length === 0) {
    container.innerHTML = '<p>Nenhum apartamento disponível para os critérios informados.</p>';
    return;
  }

  filteredData.forEach(ap => {
    const div = document.createElement('div');
    div.className = 'card-dinamico';  // Usando o estilo CSS aprimorado
    div.innerHTML = `
      <div class="quarto-carousel">
        <div class="carousel-images">
          <img src="${ap.imagem}" alt="${ap.nome}" class="carousel-image active">
        </div>
      </div>
      <div class="info-container">
        <h3>${ap.nome}</h3>
        <p>${ap.descricao || 'Apartamento confortável e bem localizado.'}</p>
        <div class="quarto-detalhes">
          <p><i class="fas fa-bed"></i> ${ap.quartos || 'N/A'} quartos</p>
          <p><i class="fas fa-bed"></i> ${ap.camas || 'N/A'} camas</p>
          <p><i class="fas fa-bath"></i> ${ap.banheiros || 'N/A'} banheiros</p>
          <p><i class="fas fa-user"></i> Até ${ap.capacidade} pessoas</p>
        </div>
        <p class="preco">A partir de R$${ap.preco}</p>
        <a href="quarto-detalhes.html?id=${ap.id}" class="btn btn-detalhes">Ver Detalhes</a>
      </div>
    `;
    container.appendChild(div);
  });
}
});
