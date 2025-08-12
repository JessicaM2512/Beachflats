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

  // Fetch blocked dates from backend and initialize flatpickr datepicker
  fetch('php/blocked_dates.php')
    .then(response => response.json())
    .then(blockedDates => {
      const disabledDates = blockedDates.map(dateStr => dateStr);

      // Initialize flatpickr on #dateRange input with range mode and 2 months display
      flatpickr("#dateRange", {
        mode: "range",
        dateFormat: "d/m/Y",
        disable: disabledDates,
        minDate: "today",
        locale: "pt",
        showMonths: 2,
        onChange: function(selectedDates, dateStr, instance) {
          if (selectedDates.length === 2) {
            // Set hidden inputs for checkin and checkout in Y-m-d format for backend
            document.getElementById('checkin').value = instance.formatDate(selectedDates[0], "Y-m-d");
            document.getElementById('checkout').value = instance.formatDate(selectedDates[1], "Y-m-d");
            // Set visible input value as "DD/MM/YYYY a DD/MM/YYYY"
            document.getElementById('dateRange').value = instance.formatDate(selectedDates[0], "d/m/Y") + " a " + instance.formatDate(selectedDates[1], "d/m/Y");
          } else {
            document.getElementById('checkin').value = "";
            document.getElementById('checkout').value = "";
            document.getElementById('dateRange').value = "";
          }
        }
      });
    })
    .catch(error => {
      console.error('Error fetching blocked dates:', error);
    });

  // Preencher campos com dados salvos da reserva
  const savedReservation = localStorage.getItem('beachFlatsReservation');
  if (savedReservation) {
    try {
      const reservationData = JSON.parse(savedReservation);
      if (reservationData.checkin) {
        const checkinInput = document.getElementById('checkin');
        if (checkinInput) checkinInput.value = reservationData.checkin;
      }
      if (reservationData.checkout) {
        const checkoutInput = document.getElementById('checkout');
        if (checkoutInput) checkoutInput.value = reservationData.checkout;
      }
      if (reservationData.guests) {
        const guestsSelect = document.getElementById('hospedes');
        if (guestsSelect) guestsSelect.value = reservationData.guests;
      }
      // Preencher o input dateRange com o período formatado
      if (reservationData.checkin && reservationData.checkout) {
        const dateRangeInput = document.getElementById('dateRange');
        if (dateRangeInput) {
          // Função para criar data sem problema de timezone
          function parseDate(dateStr) {
            const parts = dateStr.split('-');
            return new Date(parts[0], parts[1] - 1, parts[2]);
          }
          const checkinDate = parseDate(reservationData.checkin);
          const checkoutDate = parseDate(reservationData.checkout);
          // Formatar para DD/MM/YYYY com zero à esquerda
          const pad = (n) => n.toString().padStart(2, '0');
          const formattedCheckin = `${pad(checkinDate.getDate())}/${pad(checkinDate.getMonth() + 1)}/${checkinDate.getFullYear()}`;
          const formattedCheckout = `${pad(checkoutDate.getDate())}/${pad(checkoutDate.getMonth() + 1)}/${checkoutDate.getFullYear()}`;
          dateRangeInput.value = `${formattedCheckin} a ${formattedCheckout}`;
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados da reserva:', e);
    }
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
