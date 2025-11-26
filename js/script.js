const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("open"); 
});
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));

const bg = document.querySelector(".bg-3d");

document.addEventListener("mousemove", (e) => {
  let moveX = (e.clientX / window.innerWidth - 0.5) * 30;
  let moveY = (e.clientY / window.innerHeight - 0.5) * 30;

  bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

const canvas = document.getElementById("lines");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let particles = [];

for (let i = 0; i < 25; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "rgba(0,255,200,0.6)";
    ctx.fillRect(p.x, p.y, 2, 2);

    particles.forEach(other => {
      let dist = Math.hypot(p.x - other.x, p.y - other.y);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0,255,200,${1 - dist / 120})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}
animate();
