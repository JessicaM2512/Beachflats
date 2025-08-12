// Função simplificada para buscar apartamentos
function searchApartments() {
  const guestFilter = document.getElementById('filtro-hospedes');
  const guests = parseInt(guestFilter.value);
  
  // Seleciona todos os cards de apartamentos
  const apartmentCards = document.querySelectorAll('.quarto-card');
  
  apartmentCards.forEach(card => {
    const maxGuests = parseInt(card.getAttribute('data-hospedes'));
    
    // Mostra ou esconde baseado no filtro
    if (guests === 0 || maxGuests >= guests) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Inicializa a busca quando o botão é clicado
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('btnVerificar');
  if (searchButton) {
    searchButton.addEventListener('click', searchApartments);
  }
  
  // Adiciona atributos data-hospedes aos cards se não existirem
  const cards = document.querySelectorAll('.quarto-card');
  cards.forEach((card, index) => {
    if (!card.hasAttribute('data-hospedes')) {
      // Removido o uso da variável 'apartments' que não está definida
      const guests = card.querySelector('[data-hospedes]')?.getAttribute('data-hospedes') || 
                    card.querySelector('.quarto-detalhes p:last-child')?.textContent?.match(/\d+/)?.[0] || 
                    0;
      card.setAttribute('data-hospedes', guests);
    }
  });
});
