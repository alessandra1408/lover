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

// ================= MÚSICA =================

function startExperience() {
  const music = document.getElementById("bg-music");
  music.play();

  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
}

// ================= SLIDER =================

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  
  // Remove o active de todos
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  currentSlide = (index + slides.length) % slides.length;
  
  // Adiciona ao atual - o CSS fará a transição de 1.5s
  slides[currentSlide].classList.add("active");
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
  background: {
    color: "transparent"
  }
});