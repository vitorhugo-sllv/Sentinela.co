// ============================================================
// HEADER — fundo de vidro aparece ao rolar a página
// ============================================================
const header = document.getElementById('header');

function atualizarHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}
atualizarHeader();
window.addEventListener('scroll', atualizarHeader, { passive: true });
