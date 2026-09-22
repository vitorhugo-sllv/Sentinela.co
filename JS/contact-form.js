// ============================================================
// FORMULÁRIO DE CONTATO — sem backend, abre o e-mail do usuário
// ============================================================
const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailVisitante = document.getElementById('email').value.trim();
  const assunto = 'Contato via site — Sentinela';
  const corpo   = `Meu e-mail para contato: ${emailVisitante}`;
  window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
});
