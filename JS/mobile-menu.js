// ============================================================
// MENU MOBILE
// ============================================================
const menuBtn     = document.getElementById('menuBtn');
const menuMobile  = document.getElementById('menuMobile');
const menuOverlay = document.getElementById('menuOverlay');

function abrirMenu() {
  menuMobile.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  menuBtn.classList.add('is-active');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-aberto');
}

function fecharMenu() {
  menuMobile.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  menuBtn.classList.remove('is-active');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-aberto');
}

menuBtn.addEventListener('click', () => {
  menuBtn.classList.contains('is-active') ? fecharMenu() : abrirMenu();
});
menuOverlay.addEventListener('click', fecharMenu);
menuMobile.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharMenu();
});
