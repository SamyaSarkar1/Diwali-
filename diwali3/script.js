const startBtn = document.getElementById("startBtn");
const lightBtn = document.getElementById("lightBtn");
const resetBtn = document.getElementById("resetBtn");
const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const diyas = document.querySelectorAll(".diya");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

const bgMusic = document.getElementById("bgMusic");
const fireworkSound = document.getElementById("fireworkSound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let fireworksInterval; 
let diyasTextShown = false;


function createFireworks(x, y, colors, type = "normal") {
  const count = 50;
  for (let i = 0; i < count; i++) {
    let angle, speed;
    if (type === "star") {
      angle = (Math.PI * 2 * i) / count;
      speed = Math.sin(5 * angle) * 4 + 3;
    } else if (type === "spiral") {
      angle = i * 0.3;
      speed = i / 10;
    } else {
      angle = Math.random() * 2 * Math.PI;
      speed = Math.random() * 5 + 2;
    }

    particles.push({
      x: x,
      y: y,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: Math.random() * 2 + 1,
      angle,
      speed,
      life: 120
    });
  }
}


function drawFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(drawFireworks);
}
drawFireworks();


startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim() || "Friend";
  greeting.innerHTML = `🪔🎆Happy Diwali, <span class="username">${name}</span>! 🎆🪔`;

  bgMusic.play();

  
  lightBtn.style.display = "inline-block";


  clearInterval(fireworksInterval);

  
  fireworksInterval = setInterval(() => {
    
    createFireworks(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 2, ["gold", "orange", "red", "blue", "green"], "normal");
    createFireworks(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 2, ["yellow", "pink", "purple", "aqua", "lime"], "star");
    createFireworks(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 2, ["cyan", "white", "violet"], "spiral");
    fireworkSound.play();
  }, 800); 
});


lightBtn.addEventListener("click", () => {
  diyas.forEach(diya => {
    diya.classList.add("lit");
    if (!diya.querySelector(".flame")) {
      const flame = document.createElement("div");
      flame.classList.add("flame");
      diya.appendChild(flame);
    }
  });

  if (!diyasTextShown) {
    greeting.innerHTML += "✨🪔<br>All diyas are glowing beautifully! ✨🪔";
    diyasTextShown = true;
  }
});


resetBtn.addEventListener("click", () => {
  greeting.innerHTML = "";
  nameInput.value = "";
  diyas.forEach(diya => {
    diya.classList.remove("lit");
    const flame = diya.querySelector(".flame");
    if (flame) diya.removeChild(flame);
  });
  diyasTextShown = false;
  lightBtn.style.display = "none";
  particles = [];
  clearInterval(fireworksInterval); 
  bgMusic.pause();
  bgMusic.currentTime = 0;
});



