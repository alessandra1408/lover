// ================= CONTADOR =================
function updateCounter() {
  const startDate = new Date(document.body.dataset.start);
  const now = new Date();
  let diff = now - startDate;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

  const years = Math.floor(daysTotal / 365);
  const months = Math.floor((daysTotal % 365) / 30);
  const days = (daysTotal % 365) % 30;

  const yearsBlock = years > 0
    ? `<div class="time-block"><span>${years}</span><small>anos</small></div>`
    : "";

  document.getElementById("counter").innerHTML = `
    <div class="counter-row">
      ${yearsBlock}
      <div class="time-block"><span>${months}</span><small>meses</small></div>
      <div class="time-block"><span>${days}</span><small>dias</small></div>
    </div>
    <div class="counter-row">
      <div class="time-block"><span>${hours}</span><small>horas</small></div>
      <div class="time-block"><span>${minutes}</span><small>minutos</small></div>
      <div class="time-block"><span>${seconds}</span><small>segundos</small></div>
    </div>
  `;
}
setInterval(updateCounter, 1000);
updateCounter();

// ================= MÚSICA E ROLAGEM =================
function startExperience() {
  // Rola suavemente para a próxima "página"
  document.getElementById("story-section").scrollIntoView({ behavior: "smooth" });

  const video = document.querySelector('video');
  if (video) {
    video.muted = false; // Garante que o som esteja ligado
  }
}

function backToStart() {
  const heroSection = document.querySelector('.hero');
  const storySection = document.querySelector('.story-section');

  if (heroSection) {
    heroSection.style.display = 'flex';
  }
  if (storySection) {
    storySection.style.display = 'block';
  }

  document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ================= NAVEGAÇÃO ENTRE PÁGINAS =================
let lastTimelineScrollY = 0;

function openDetailPage(pageNumber) {
  const sourceItem = document.querySelector(`.timeline-item[data-page="${pageNumber}"]`);
  if (sourceItem) {
    triggerPulse(sourceItem);
  }

  lastTimelineScrollY = window.scrollY;

  // Esconde a página principal
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.story-section').style.display = 'none';
  
  // Mostra a página dedicada
  const detailPage = document.getElementById(`detail-page-${pageNumber}`);
  if (detailPage) {
    detailPage.classList.remove('hidden');
    
    // Toca a música específica
    playDetailMusic(pageNumber);
  }
  
  // Scroll para o topo
  window.scrollTo(0, 0);
}

function goBack() {
  // Esconde todas as páginas de detalhe
  document.querySelectorAll('.detail-page').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Mostra a página principal
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.story-section').style.display = 'block';
  
  // Para a música de detalhe
  const detailMusic = document.getElementById('detail-music');
  if (detailMusic) {
    detailMusic.pause();
    detailMusic.currentTime = 0;
  }
  
  // Volta para a trilha (não para a tela inicial)
  const storySection = document.getElementById('story-section');
  if (storySection) {
    storySection.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  window.scrollTo({ top: lastTimelineScrollY, behavior: 'auto' });

  updateCenterFocus();
}

function playDetailMusic(pageNumber) {
  let musicSrc = '';
  
  switch(pageNumber) {
    case 1:
      musicSrc = 'static/music/lua_cheia\.mp3'; // Ou deixar em branco/outra música
      break;
    case 2:
      musicSrc = 'static/music/sera_que_e_amor.mp3'; // Será tocada ao entrar na página
      break;
    case 3:
      musicSrc = 'static/music/oba_la_vem_ela.mp3'; // "Aquele dia" - Marina Sena
      break;
    case 4:
      musicSrc = 'static/music/helipa.mp3'; // Ou outra música
      break;
    case 5:
      musicSrc = 'static/music/aquele_dia.mp3'; // "Undr" - Duda Beat
      break;
    case 6:
      musicSrc = 'static/music/foi_assim.mp3'; // "Undr" - Duda Beat
      break;
    case 7:
      musicSrc = 'static/music/disritmia.mp3'; // "Undr" - Duda Beat
      break;
    default:
      musicSrc = '';
  }
  
  if (musicSrc) {
    let detailMusic = document.getElementById('detail-music');
    if (!detailMusic) {
      detailMusic = document.createElement('audio');
      detailMusic.id = 'detail-music';
      detailMusic.style.display = 'none';
      document.body.appendChild(detailMusic);
    }
    
    detailMusic.pause();
    detailMusic.src = musicSrc;
    detailMusic.volume = 0.3;
    detailMusic.currentTime = 0;

    detailMusic.onloadedmetadata = () => {
      const startAt = Math.min(0.0, Math.max(0, detailMusic.duration - 0.1));
      detailMusic.currentTime = startAt;
      detailMusic.play().catch(err => console.log('Audio play error:', err));
    };

    detailMusic.load();
  }
}

// ================= FOCO AUTOMÁTICO NA TRILHA =================
const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
let focusedItem = null;

function triggerPulse(item) {
  const content = item?.querySelector('.timeline-content');
  if (!content) return;
  content.classList.remove('pulse');
  void content.offsetWidth;
  content.classList.add('pulse');
}

function updateCenterFocus() {
  if (!timelineItems.length) return;

  const viewportCenterY = window.innerHeight / 2;
  let closest = null;
  let closestDistance = Infinity;

  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenterY - viewportCenterY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = item;
    }
  });

  timelineItems.forEach(item => {
    item.classList.remove('is-focused');
    item.querySelector('.timeline-content')?.classList.remove('pulse');
  });

  if (closest && closestDistance < window.innerHeight * 0.35) {
    closest.classList.add('is-focused');
    closest.querySelector('.timeline-content')?.classList.add('pulse');
    focusedItem = closest;
  }
}

timelineItems.forEach(item => {
  item.addEventListener('touchstart', () => triggerPulse(item), { passive: true });
});

window.addEventListener('scroll', updateCenterFocus, { passive: true });
window.addEventListener('resize', updateCenterFocus);
window.addEventListener('load', updateCenterFocus);

// ================= PARTÍCULAS (O RETORNO) =================
tsParticles.load("tsparticles", {
  particles: {
    number: { 
      value: 50, // Quantidade equilibrada para não poluir
      density: { enable: true, area: 800 }
    },
    color: { value: ["#ff85a2", "#ffffff"] }, // Rosa e branco para brilho
    shape: { 
      type: ["circle", "character"], // Círculos (partículas) e corações
      options: {
        character: { value: ["❤️"] }
      }
    },
    opacity: { 
      value: { min: 0.1, max: 0.4 }, // Bem suaves para não atrapalhar a leitura
      animation: { enable: true, speed: 0.5, sync: false }
    },
    size: { 
      value: { min: 1, max: 4 } 
    },
    move: {
      enable: true,
      speed: 0.5, // Velocidade relaxante que você pediu
      direction: "top", // Subindo suavemente
      outModes: { default: "out" }
    }
  },
  background: { color: "transparent" }
});