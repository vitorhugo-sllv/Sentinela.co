// ============================================================
// MODAL DE PROJETO
// ============================================================
// Dados de cada card do portfólio. Quando tiver os projetos reais,
// troque "descricao" pelo texto completo e "fotos" pelos caminhos
// das imagens (ex: 'assets/projetos/nortis-1.jpg') — nesse caso
// também troque as <div class="projeto-modal-foto..."> no HTML e
// no populaGaleria() abaixo por <img>.
const PROJETOS = {
  nortis: {
    titulo: 'Nortis',
    tag: 'Landing page',
    descricao: 'Página de captação para lançamento de produto financeiro, com foco em clareza e conversão. Substitua este texto pela descrição real do projeto: o desafio do cliente, a solução criada e os resultados alcançados.',
    corA: '#443B6D', corB: '#2A2A2A'
  },
  aura: {
    titulo: 'Aura Studio',
    tag: 'Site institucional',
    descricao: 'Presença digital para um estúdio de design, com portfólio dinâmico e identidade visual forte. Substitua este texto pela descrição real do projeto.',
    corA: '#6b5f9c', corB: '#2A2A2A'
  },
  cinza: {
    titulo: 'Cinza',
    tag: 'E-commerce',
    descricao: 'Loja online de moda autoral, com vitrine minimalista e checkout simplificado. Substitua este texto pela descrição real do projeto.',
    corA: '#2A2A2A', corB: '#443B6D'
  },
  vetor: {
    titulo: 'Vetor',
    tag: 'Plataforma web',
    descricao: 'Sistema interno de gestão para equipes de operação, com dashboards em tempo real. Substitua este texto pela descrição real do projeto.',
    corA: '#443B6D', corB: '#6b5f9c'
  },
  marear: {
    titulo: 'Marear',
    tag: 'Landing page',
    descricao: 'Site de pré-lançamento para marca de bebidas, com narrativa visual guiada por scroll. Substitua este texto pela descrição real do projeto.',
    corA: '#6b5f9c', corB: '#443B6D'
  },
  fio: {
    titulo: 'Fio',
    tag: 'Aplicativo web',
    descricao: 'Ferramenta de agendamento para autônomos, pensada para uso rápido no dia a dia. Substitua este texto pela descrição real do projeto.',
    corA: '#2A2A2A', corB: '#6b5f9c'
  }
};

const projetoModal        = document.getElementById('projetoModal');
const projetoModalOverlay = document.getElementById('projetoModalOverlay');
const projetoModalFechar  = document.getElementById('projetoModalFechar');
const projetoModalTitulo  = document.getElementById('projetoModalTitulo');
const projetoModalTag     = document.getElementById('projetoModalTag');
const projetoModalDesc    = document.getElementById('projetoModalDescricao');
const projetoModalGaleria = document.getElementById('projetoModalGaleria');

let ultimoFocoAntesDoModal = null;

function populaGaleria(p) {
  // Placeholders coloridos com o degradê do projeto. Troque por <img> reais quando tiver as fotos.
  projetoModalGaleria.innerHTML = `
    <div class="projeto-modal-foto-principal" style="--cor-a:${p.corA}; --cor-b:${p.corB};"></div>
    <div class="projeto-modal-fotos-mini">
      <div class="projeto-modal-foto" style="--cor-a:${p.corB}; --cor-b:${p.corA};"></div>
      <div class="projeto-modal-foto" style="--cor-a:${p.corA}; --cor-b:${p.corB};"></div>
    </div>
  `;
}

function abrirProjetoModal(id, gatilho) {
  const p = PROJETOS[id];
  if (!p) return;

  ultimoFocoAntesDoModal = gatilho || document.activeElement;

  projetoModalTitulo.textContent = p.titulo;
  projetoModalTag.textContent    = p.tag;
  projetoModalDesc.textContent   = p.descricao;
  populaGaleria(p);

  projetoModalOverlay.classList.add('is-open');
  projetoModal.classList.add('is-open');
  projetoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-aberto'); // reaproveita a trava de scroll do menu mobile

  projetoModalFechar.focus();
}

function fecharProjetoModal() {
  if (!projetoModal.classList.contains('is-open')) return;
  projetoModalOverlay.classList.remove('is-open');
  projetoModal.classList.remove('is-open');
  projetoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-aberto');

  if (ultimoFocoAntesDoModal) ultimoFocoAntesDoModal.focus();
}

document.querySelectorAll('.card-projeto').forEach((card) => {
  card.addEventListener('click', () => abrirProjetoModal(card.dataset.project, card));
});

projetoModalOverlay.addEventListener('click', fecharProjetoModal);
projetoModalFechar.addEventListener('click', fecharProjetoModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharProjetoModal();
});
