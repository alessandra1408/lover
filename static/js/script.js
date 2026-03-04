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

  let yearsHTML = years > 0 
    ? `<div class="time-block"><span>${years}</span><small>anos</small></div>`
    : "";

  document.getElementById("counter").innerHTML = `
    ${yearsHTML}
    <div class="time-block"><span>${months}</span><small>meses</small></div>
    <div class="time-block"><span>${days}</span><small>dias</small></div>
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
  if (music) music.play().catch(e => console.log("Erro ao tocar música:", e));

  const storySection = document.getElementById("story-section");
  if (storySection) {
    storySection.scrollIntoView({ 
      behavior: "smooth", 
      block: "center" 
    });
  }
}

// ================= SLIDER CORRIGIDO =================

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  // Garante que o índice atualize corretamente antes de aplicar as classes
  slides.forEach(slide => {
    slide.classList.remove("active");
    slide.style.zIndex = "1";
  });

  currentSlide = (index + slides.length) % slides.length;
  
  const activeSlide = slides[currentSlide];
  activeSlide.classList.add("active");
  activeSlide.style.zIndex = "2";

  // Dispara o confete de corações a cada troca!
  lancarConfete();
}

// Funções chamadas pelos botões
function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// ================= EFEITO DE CONFETE (CORAÇÕES) =================

function lancarConfete() {
  tsParticles.load("confete-hearts", {
    fullScreen: { enable: true, zIndex: 100 },
    particles: {
      number: { value: 0 },
      color: { value: ["#ff4d88", "#ffb3c1", "#ff85a2"] },
      shape: {
        type: "character",
        options: {
          character: { value: ["❤️", "💖", "💕", "🌸"] }
        }
      },
      opacity: { value: 1 },
      size: { value: { min: 10, max: 20 } },
      move: {
        enable: true,
        gravity: { enable: true, acceleration: 10 },
        speed: { min: 10, max: 20 },
        direction: "top",
        outModes: { default: "destroy" }
      }
    },
    emitters: {
      direction: "top",
      rate: { quantity: 5, delay: 0.1 },
      life: { duration: 0.5, count: 1 },
      position: { x: 50, y: 100 }
    }
  });
}
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