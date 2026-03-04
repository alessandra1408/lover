// ================= CONTADOR =================
function updateCounter() {
  const startDate = new Date(document.body.dataset.start);
  const now = new Date();
  let diff = now - startDate;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

  const months = Math.floor((daysTotal % 365) / 30);
  const days = (daysTotal % 365) % 30;

  document.getElementById("counter").innerHTML = `
    <div class="time-block"><span>${months}</span><small>m</small></div>
    <div class="time-block"><span>${days}</span><small>d</small></div>
    <div class="time-block"><span>${hours}</span><small>h</small></div>
    <div class="time-block"><span>${minutes}</span><small>min</small></div>
    <div class="time-block"><span>${seconds}</span><small>s</small></div>
  `;
}
setInterval(updateCounter, 1000);
updateCounter();

// ================= MÚSICA E ROLAGEM =================
function startExperience() {
  // Rola suavemente para a próxima "página"
  document.getElementById("story-section").scrollIntoView({ behavior: "smooth" });
}

// ================= NAVEGAÇÃO ENTRE PÁGINAS =================
function openDetailPage(pageNumber) {
  // Esconde a página principal
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.story-section').style.display = 'none';
  
  // Mostra a página dedicada
  const detailPage = document.getElementById(`detail-page-${pageNumber}`);
  if (detailPage) {
    detailPage.classList.remove('hidden');
    
    // Para a música anterior
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
    
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
  document.querySelector('.hero').style.display = 'flex';
  document.querySelector('.story-section').style.display = 'block';
  
  // Para a música de detalhe
  const detailMusic = document.getElementById('detail-music');
  if (detailMusic) {
    detailMusic.pause();
    detailMusic.currentTime = 0;
  }
  
  // Scroll para o topo
  window.scrollTo(0, 0);
}

function playDetailMusic(pageNumber) {
  let musicSrc = '';
  
  switch(pageNumber) {
    case 1:
      musicSrc = 'static/music/sera_que_e_amor.mp3'; // Ou deixar em branco/outra música
      break;
    case 2:
      musicSrc = 'static/music/sera_que_e_amor.mp3'; // Será tocada ao entrar na página
      break;
    case 3:
      musicSrc = 'static/music/aquele_dia.mp3'; // "Aquele dia" - Marina Sena
      break;
    case 4:
      musicSrc = 'static/music/sera_que_e_amor.mp3'; // Ou outra música
      break;
  }
  
  if (musicSrc) {
    let detailMusic = document.getElementById('detail-music');
    if (!detailMusic) {
      detailMusic = document.createElement('audio');
      detailMusic.id = 'detail-music';
      detailMusic.style.display = 'none';
      document.body.appendChild(detailMusic);
    }
    
    detailMusic.src = musicSrc;
    detailMusic.volume = 0.3;
    detailMusic.play().catch(err => console.log('Audio play error:', err));
  }
}

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