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

  // Remove active de todos
  slides.forEach(slide => slide.classList.remove("active"));

  // Calcula o próximo índice circularmente
  currentSlide = (index + slides.length) % slides.length;
  
  // Adiciona active ao atual
  slides[currentSlide].classList.add("active");
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

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