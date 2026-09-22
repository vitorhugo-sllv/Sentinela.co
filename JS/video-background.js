
const videoA  = document.getElementById('videoA');
const videoB  = document.getElementById('videoB');
const canvas  = document.getElementById('bgCanvas');
const ctx     = canvas.getContext('2d');
const fallback = document.querySelector('.bg-fallback');

const CROSSFADE_MS = 1200; // duração do crossfade em ms

// Estado do crossfade
let activeVideo   = videoA;
let inactiveVideo = videoB;
let crossfading   = false;
let crossfadeStart = 0;
let rafId = null;

// ----- Redimensiona o canvas para preencher o container -----
function resizeCanvas() {
  canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
}

// ----- Desenha um frame de um vídeo com "object-fit: cover" -----
function drawCover(video, alpha) {
  if (video.readyState < 2) return; // sem dados suficientes ainda

  const cw = canvas.width;
  const ch = canvas.height;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;

  // Calcula crop "cover": escala para cobrir o canvas inteiro
  const scale = Math.max(cw / vw, ch / vh);
  const dw = vw * scale;
  const dh = vh * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.globalAlpha = alpha;
  ctx.drawImage(video, dx, dy, dw, dh);
}

// ----- Loop de renderização -----
function renderLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (crossfading) {
    const elapsed = timestamp - crossfadeStart;
    const t = Math.min(elapsed / CROSSFADE_MS, 1);
    // easing suave
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    drawCover(activeVideo,   1 - ease);
    drawCover(inactiveVideo, ease);

    if (t >= 1) {
      // crossfade concluído — pausa o vídeo que saiu e troca os papéis
      crossfading = false;
      const outgoing = activeVideo;
      [activeVideo, inactiveVideo] = [inactiveVideo, activeVideo];
      outgoing.pause();
      outgoing.currentTime = 0;
      // registra o watch no novo activeVideo agora que a troca foi feita
      watchForEnd();
    }
  } else {
    drawCover(activeVideo, 1);
  }

  rafId = requestAnimationFrame(renderLoop);
}

// ----- Inicia o crossfade quando o vídeo ativo está perto do fim -----
function watchForEnd() {
  const watched = activeVideo; // captura referência no momento do registro

  // Trigger principal: timeupdate detecta quando falta ~CROSSFADE_MS pro fim
  function onTick() {
    if (crossfading) return;
    if (!watched.duration) return;
    if ((watched.duration - watched.currentTime) <= CROSSFADE_MS / 1000) {
      cleanup();
      startCrossfade();
    }
  }

  // Fallback: se o vídeo terminar antes do timeupdate reagir, inicia assim mesmo
  function onEnded() {
    cleanup();
    if (!crossfading) startCrossfade();
  }

  function cleanup() {
    watched.removeEventListener('timeupdate', onTick);
    watched.removeEventListener('ended', onEnded);
  }

  watched.addEventListener('timeupdate', onTick);
  watched.addEventListener('ended', onEnded);
}

function startCrossfade() {
  if (crossfading) return;
  crossfading    = true;
  crossfadeStart = performance.now();

  inactiveVideo.currentTime = 0;
  inactiveVideo.play().catch(() => {});
  // watchForEnd do próximo ciclo é registrado pelo renderLoop após a troca de papéis
}

// ----- Inicialização -----
function init() {
  // Silencia a Media Session — impede o Chrome de registrar como mídia controlável
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = null;
      ['play','pause','stop','seekbackward','seekforward',
       'previoustrack','nexttrack','enterpictureinpicture'
      ].forEach(a => { try { navigator.mediaSession.setActionHandler(a, null); } catch(_){} });
    } catch(_) {}
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Inicia o videoA (escondido) e começa a renderizar no canvas
  activeVideo.play()
    .then(() => {
      watchForEnd(); // primeiro ciclo
      rafId = requestAnimationFrame(renderLoop);

      // Só agora começa a baixar o videoB (preload="none" no HTML).
      // Evita concorrer com o videoA pela banda logo no carregamento da página.
      inactiveVideo.load();
    })
    .catch(() => {
      // Autoplay bloqueado → mostra gradient de fallback
      fallback.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', init);

// Pausa o render quando a aba está em background (economiza CPU/bateria)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  } else {
    if (!rafId) rafId = requestAnimationFrame(renderLoop);
  }
});
