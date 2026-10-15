// ============================================================
// MODAL DE PROJETO
// ============================================================
// Dados de cada card do portfólio.
// - "imagem": caminho da imagem do projeto (pasta assets/projetos/)
// - "alt": texto alternativo da imagem (acessibilidade)
// Para trocar a imagem de um projeto, substitua o arquivo na pasta
// ou altere o caminho em "imagem". A mesma imagem aparece no card e no modal.
const PROJETOS = {
  realphone: {
    titulo: 'RealPhone',
    tag: 'Landing page',
    descricao: 'Landing page de apresentação de smartphone, com navegação vertical pelos recursos do aparelho (como câmera e tela), composição geométrica em roxo e degradê de fundo que guia o olhar até o produto.',
    imagem: 'assets/projetos/realphone.webp',
    alt: 'Prévia do site RealPhone, com celular em destaque e fundo roxo em degradê'
  },
  radiance: {
    titulo: 'Radiance',
    tag: 'Site de fotografia',
    descricao: 'Site de fotografia em tela dividida: de um lado, o título e o campo de busca sobre um fundo desfocado; do outro, a foto em destaque com carrossel de miniaturas para navegar pela galeria.',
    imagem: 'assets/projetos/radiance.webp',
    alt: 'Prévia do site Radiance, com barco ao entardecer e campo de busca'
  },
  'urban-fashion': {
    titulo: 'Urban Fashion',
    tag: 'E-commerce',
    descricao: 'Loja virtual de moda de inverno, com banner da coleção em destaque, menu por coleções e categorias, carrinho sempre visível no topo e paleta suave em degradê rosa e azul.',
    imagem: 'assets/projetos/urban-fashion.webp',
    alt: 'Prévia da loja Urban Fashion, com modelo vestindo casaco rosa e touca azul'
  },
  login: {
    titulo: 'Login Neumórfico',
    tag: 'Interface web',
    descricao: 'Tela de login em estilo neumórfico (relevo suave), com campos de e-mail ou telefone e senha, link de recuperação de senha e atalho para cadastro, tudo em um cartão centralizado e minimalista.',
    imagem: 'assets/projetos/login.webp',
    alt: 'Prévia da tela de login em estilo neumórfico'
  },
  coding: {
    titulo: 'Coding',
    tag: 'Landing page',
    descricao: 'Landing page feita apenas com HTML e CSS, com menu fixo no topo, imagem de fundo em tela cheia, título de impacto e dois botões de chamada para ação.',
    imagem: 'assets/projetos/coding.webp',
    alt: 'Prévia da landing page Coding, com flores escuras ao fundo'
  },
  'criar-conta': {
    titulo: 'Criar Conta',
    tag: 'Formulário',
    descricao: 'Formulário de cadastro dividido em três etapas, com indicador de progresso no topo, campos de e-mail e senha e botão em degradê, sobre um fundo de cidade à noite.',
    imagem: 'assets/projetos/criar-conta.webp',
    alt: 'Prévia do formulário de criar conta em etapas, sobre fundo de cidade à noite'
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
  projetoModalGaleria.innerHTML = `
    <img class="projeto-modal-imagem" src="${p.imagem}" alt="${p.alt}" width="1200" height="600">
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
