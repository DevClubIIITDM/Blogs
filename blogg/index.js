// Navbar toggle for mobile
const nav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');
navToggle.onclick = () => nav.classList.toggle('open');

// Blog search filter
const searchInput = document.getElementById('searchInput');
const blogGrid = document.getElementById('blogGrid');

searchInput.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  for (const card of blogGrid.children) {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const summary = card.querySelector('p').textContent.toLowerCase();
    card.style.display = (title.includes(q) || summary.includes(q)) ? '' : 'none';
  }
});

// Blog cards fade-in entry animation (for when dynamically loaded/added)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.blog-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    setTimeout(() => {
      card.style.opacity = '1';
    }, 260 + i * 120);
  });
});

// Stat counter animation
function animateStatCounter(el, target) {
  let num = 0;
  const step = Math.ceil(target/42);
  function update() {
    num += step;
    if (num >= target) {
      el.textContent = target + "+";
    } else {
      el.textContent = num + "+";
      requestAnimationFrame(update);
    }
  }
  update();
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

let statsAnimated = false;
window.addEventListener('scroll', () => {
  if (statsAnimated) return;
  const cards = document.querySelectorAll('.stat-num');
  if (cards.length && isInViewport(cards[0])) {
    statsAnimated = true;
    cards.forEach(card => {
      const target = parseInt(card.getAttribute('data-target'), 10);
      animateStatCounter(card, target);
    });
  }
});
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const cards = document.querySelectorAll('.stat-num');
    if (!statsAnimated && cards.length && isInViewport(cards[0])) {
      statsAnimated = true;
      cards.forEach(card => {
        const target = parseInt(card.getAttribute('data-target'), 10);
        animateStatCounter(card, target);
      });
    }
  }, 500);
});

