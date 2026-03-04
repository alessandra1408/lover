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

// ================= SOM E ROLAGEM =================
function startExperience() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0;
    music.play();
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.5) {
        vol += 0.05;
        music.volume = vol;
      } else { clearInterval(fade); }
    }, 200);
  }

  document.getElementById("story-section").scrollIntoView({ behavior: "smooth" });
}

// ================= SLIDER (Sincronizado com HTML) =================
// Descobre qual slide já começa com a classe 'active'
let currentSlide = Array.from(document.querySelectorAll('.slide')).findIndex(s => s.classList.contains('active'));
if (currentSlide === -1) currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(s => s.classList.remove("active"));
  
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

// ================= PARTÍCULAS LENTAS NO FUNDO =================
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 2 }, // Apenas 2 corações por vez para ser discreto
    shape: { type: "character", options: { character: { value: ["❤️"] } } },
    opacity: { value: 0.2 },
    size: { value: { min: 10, max: 14 } },
    move: { 
      enable: true, 
      speed: 0.3, // Super lento
      direction: "top", 
      outModes: "out" 
    }
  }
});