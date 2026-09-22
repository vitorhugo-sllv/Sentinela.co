// ============================================================
// CONFIGURAÇÃO — edite só aqui
// ============================================================
const WHATSAPP_NUMERO   = '5511999999999'; // DDI + DDD + número, só dígitos
const WHATSAPP_MENSAGEM = 'Olá, gostaria de solicitar um orçamento.';
const EMAIL_CONTATO     = 'contato@sentinela.com.br';

// ----- Aplica o link do WhatsApp em todos os botões marcados -----
document.querySelectorAll('[data-whatsapp]').forEach((el) => {
  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;
  el.setAttribute('href', link);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});
