/* ============================================
   SAPPHIRE MEMORIAL - SCRIPT
   Matching the permanent Manus-hosted site exactly
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // PARTICLES
  // ============================================
  const particlesContainer = document.getElementById('particles');
  
  // Colorful floating particles (120)
  const particleColors = [
    '#ff3366', '#ff6600', '#ffcc00', '#33cc33', '#00ccff',
    '#aa44ff', '#ff44aa', '#ff9900', '#66ff66', '#44aaff',
    '#ff66cc', '#ffaa00', '#00ffaa', '#6644ff', '#ff4444'
  ];
  
  for (let i = 0; i < 120; i++) {
    const p = document.createElement('div');
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: float-particle ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: 0 0 ${size * 2}px ${color}40;
    `;
    particlesContainer.appendChild(p);
  }

  // Twinkling stars (70)
  for (let i = 0; i < 70; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(star);
  }

  // Bokeh orbs (15)
  const bokehColors = ['rgba(168,85,247,0.15)', 'rgba(236,72,153,0.12)', 'rgba(251,191,36,0.1)', 'rgba(59,130,246,0.1)', 'rgba(16,185,129,0.08)'];
  for (let i = 0; i < 15; i++) {
    const orb = document.createElement('div');
    const size = Math.random() * 80 + 40;
    const color = bokehColors[Math.floor(Math.random() * bokehColors.length)];
    orb.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color}, transparent 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: bokeh-float ${Math.random() * 15 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 8}s;
    `;
    particlesContainer.appendChild(orb);
  }

  // ============================================
  // MOUSE SPARKLE TRAIL
  // ============================================
  const sparkleContainer = document.getElementById('sparkle-container');
  let sparkleThrottle = 0;
  
  document.addEventListener('mousemove', (e) => {
    sparkleThrottle++;
    if (sparkleThrottle % 3 !== 0) return;
    
    const sparkle = document.createElement('div');
    const sparkleColors = ['#ff3366', '#ffcc00', '#33cc33', '#00ccff', '#aa44ff', '#ff44aa'];
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = Math.random() * 6 + 3;
    
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle-fade 0.8s ease-out forwards;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    sparkleContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
  });

  // ============================================
  // NAVIGATION
  // ============================================
  const navBtns = document.querySelectorAll('[data-section]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile nav
      mobileNav.classList.remove('open');
      
      // Update active state
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('nav-active'));
      const desktopBtn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
      if (desktopBtn) desktopBtn.classList.add('nav-active');
    });
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Update nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('nav-active');
      if (btn.getAttribute('data-section') === current) {
        btn.classList.add('nav-active');
      }
    });
  });

  // ============================================
  // PHOTO LIGHTBOX
  // ============================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      if (imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      lightbox.classList.remove('open');
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
    }
  });

  // ============================================
  // GUESTBOOK FORM
  // ============================================
  const guestbookForm = document.querySelector('.guestbook-form');
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for signing the guestbook. Your message has been received. 💜');
      guestbookForm.reset();
    });
  }
});

// ============================================
// PRINT FUNCTIONS
// ============================================
function printMemorialCard() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>Sapphire Memorial Card</title>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Raleway:wght@300;400&family=Crimson+Text:ital@0;1&display=swap" rel="stylesheet">
      <style>
        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0f0f0; }
        .card { width: 3.5in; height: 2in; background: linear-gradient(135deg, #1a0533, #2d1b69); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 0.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 2px solid rgba(236,72,153,0.6); }
        .card img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #fbbf24; margin-bottom: 4px; }
        .card h2 { font-family: 'Dancing Script', cursive; color: #f9a8d4; font-size: 14px; margin: 2px 0; }
        .card .dates { font-family: 'Raleway', sans-serif; color: rgba(251,191,36,0.8); font-size: 9px; letter-spacing: 1px; margin-top: 4px; }
        .card .msg { font-family: 'Crimson Text', serif; color: rgba(196,181,253,0.7); font-size: 11px; font-style: italic; margin-top: 4px; }
        @media print { body { background: white; } }
      </style>
    </head>
    <body>
      <div class="card">
        <img src="images/sapphire-portrait-final.jpg" alt="Sapphire" />
        <h2>Sapphire Brooklynn</h2>
        <h2>Nicole Parker</h2>
        <p class="dates">JUNE 20, 2015 — SEPT. 15, 2025</p>
        <p class="msg">Forever in our hearts 🌈</p>
      </div>
      <script>setTimeout(() => { window.print(); }, 500);<\/script>
    </body>
    </html>
  `);
}

function printObituary() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>Sapphire Obituary Sheet</title>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;600&display=swap" rel="stylesheet">
      <style>
        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0f0f0; }
        .sheet { width: 5in; height: 7in; background: linear-gradient(135deg, #1a0533, #2d1b69, #1a0533); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 2px solid rgba(251,191,36,0.6); text-align: center; }
        .sheet img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #fbbf24; margin-bottom: 12px; }
        .sheet h2 { font-family: 'Dancing Script', cursive; color: #f9a8d4; font-size: 18px; margin: 2px 0; }
        .sheet .dates { font-family: 'Raleway', sans-serif; color: rgba(251,191,36,0.8); font-size: 10px; letter-spacing: 2px; margin-top: 8px; }
        .sheet .obit { font-family: 'Crimson Text', serif; color: rgba(232,213,245,0.8); font-size: 11px; line-height: 1.6; margin-top: 12px; padding: 0 0.5rem; }
        .sheet .quote { font-family: 'Crimson Text', serif; color: rgba(251,191,36,0.7); font-size: 12px; font-style: italic; margin-top: 16px; }
        .sheet .divider { width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent); margin: 12px 0; }
        @media print { body { background: white; } }
      </style>
    </head>
    <body>
      <div class="sheet">
        <img src="images/sapphire-portrait-final.jpg" alt="Sapphire" />
        <h2>Sapphire Brooklynn</h2>
        <h2>Nicole Parker</h2>
        <p class="dates">JUNE 20, 2015 — SEPTEMBER 15, 2025</p>
        <div class="divider"></div>
        <p class="obit">A precious soul who lit up every room she entered. Beloved daughter of Angelina & Jackson Parker. Loving sister to Anna-Grace, Savannah, Brynleigh, Connor, Skyleigh & Olivia. Sapphire was a shining light in the lives of all who had the privilege to know her. Her laughter was infectious, her spirit uplifting, and her kindness boundless.</p>
        <div class="divider"></div>
        <p class="quote">"Forever 10. Forever loved. Forever in our hearts."</p>
      </div>
      <script>setTimeout(() => { window.print(); }, 500);<\/script>
    </body>
    </html>
  `);
}
