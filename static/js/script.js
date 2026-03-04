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
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0;
    music.play();
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);
  }

  // Rola suavemente para a próxima "página"
  document.getElementById("story-section").scrollIntoView({ behavior: "smooth" });
}

// ================= SLIDER CORRIGIDO =================
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  
  // Remove de todos
  slides.forEach(s => s.classList.remove("active"));
  
  // Atualiza o índice
  currentSlide = (index + slides.length) % slides.length;
  
  // Ativa o slide atual
  slides[currentSlide].classList.add("active");
}

// Força o reconhecimento das funções pelos botões
window.nextSlide = function() { showSlide(currentSlide + 1); }
window.prevSlide = function() { showSlide(currentSlide - 1); }

// ================= PARTÍCULAS DISCRETAS =================
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 3 }, // Só 3 coraçõezinhos
    shape: { type: "character", options: { character: { value: ["❤️"] } } },
    opacity: { value: 0.2 },
    size: { value: { min: 8, max: 12 } },
    move: { enable: true, speed: 0.4, direction: "top", outModes: "out" }
  }
});