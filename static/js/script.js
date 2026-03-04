// ================= CONTADOR (Tudo em uma linha) =================
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

  let html = "";
  if (years > 0) html += `<div class="time-block"><span>${years}</span><small>a</small></div>`;
  html += `
    <div class="time-block"><span>${months}</span><small>m</small></div>
    <div class="time-block"><span>${days}</span><small>d</small></div>
    <div class="time-block"><span>${hours}</span><small>h</small></div>
    <div class="time-block"><span>${minutes}</span><small>min</small></div>
    <div class="time-block"><span>${seconds}</span><small>s</small></div>
  `;
  document.getElementById("counter").innerHTML = html;
}

setInterval(updateCounter, 1000);
updateCounter();

// ================= MÚSICA COM FADE-IN =================
function startExperience() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0;
    music.play();
    let vol = 0;
    const interval = setInterval(() => {
      if (vol < 0.5) { // Volume máximo 50% para ser suave
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(interval);
      }
    }, 200); // Sobe o volume gradualmente em 2 segundos
  }

  const storySection = document.getElementById("story-section");
  storySection.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ================= SLIDER (CORREÇÃO DO CLIQUE) =================
let currentSlide = 0; 
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

// ================= CORAÇÕES LENTOS NO FUNDO =================
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 3 }, // Apenas 2 ou 3 corações por vez
    color: { value: "#ff85a2" },
    shape: {
      type: "character",
      options: { character: { value: ["❤️"] } }
    },
    opacity: { value: 0.3 }, // Bem discretos
    size: { value: { min: 10, max: 15 } }, // Pequenos
    move: {
      enable: true,
      speed: 0.5, // Bem lentos
      direction: "top",
      outModes: { default: "out" }
    }
  },
  background: { color: "transparent" }
});
// ================= PARTÍCULAS =================

tsParticles.load("tsparticles", {
  particles: {
    number: { value: 40 },
    color: { value: "#ff85a2" },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      speed: 0.6,
      outModes: { default: "out" }
    }
  },
  background: { color: "transparent" }
});