// Script comum para captura e preenchimento dos parâmetros da URL em páginas quarto-detalhes*.html

document.addEventListener('DOMContentLoaded', function() {
  // Função para capturar parâmetros da URL
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    return params;
  }

  // Preencher campos do formulário com os parâmetros capturados
  const params = getQueryParams();

  if (params.checkin) {
    const checkinInput = document.getElementById('checkin');
    if (checkinInput) checkinInput.value = params.checkin;
  }
  if (params.checkout) {
    const checkoutInput = document.getElementById('checkout');
    if (checkoutInput) checkoutInput.value = params.checkout;
  }
  if (params.hospedes) {
    const hospedesInput = document.getElementById('hospedes');
    if (hospedesInput) hospedesInput.value = params.hospedes;
  }
});
