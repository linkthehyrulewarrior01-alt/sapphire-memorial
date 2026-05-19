/* ============================================
   SAPPHIRE MEMORIAL - SCRIPT
   Matching the permanent Manus-hosted site exactly
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // PARTICLES - Star/Diamond/Cross shapes
  // ============================================
  const particlesContainer = document.getElementById('particles');
  
  const particleColors = [
    '#ff6b9d', '#ffd700', '#4ecdc4', '#a855f7', '#ff8c42',
    '#45b7d1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6',
    '#06d6a0', '#ff006e', '#fb5607', '#ffbe0b', '#3a86ff'
  ];
  
  const sparkleShapes = ['sparkle-star', 'sparkle-cross', 'sparkle-diamond'];
  
  // Colorful shaped particles (120)
  for (let i = 0; i < 120; i++) {
    const p = document.createElement('div');
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    const size = Math.random() * 10 + 5;
    const shape = sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)];
    p.className = shape;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: float-particle ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      filter: drop-shadow(0 0 ${size/2}px ${color});
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
  // MOUSE SPARKLE TRAIL - Star/Diamond shapes
  // ============================================
  const sparkleContainer = document.getElementById('sparkle-container');
  let sparkleThrottle = 0;
  
  document.addEventListener('mousemove', (e) => {
    sparkleThrottle++;
    if (sparkleThrottle % 3 !== 0) return;
    
    const sparkle = document.createElement('div');
    const sparkleColors = ['#ff6b9d', '#ffd700', '#4ecdc4', '#a855f7', '#ec4899', '#45b7d1'];
    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    const size = Math.random() * 10 + 5;
    const shape = sparkleShapes[Math.floor(Math.random() * sparkleShapes.length)];
    
    sparkle.className = shape;
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      pointer-events: none;
      animation: sparkle-fade 0.8s ease-out forwards;
      filter: drop-shadow(0 0 ${size/2}px ${color});
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
// YOUTUBE MUSIC PLAYER
// ============================================
let ytPlayer = null;
let ytReady = false;
let ytMuted = false;
let ytPlaying = false;

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: 'Z1IA_75pOgA',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'Z1IA_75pOgA',
      controls: 0,
      mute: 0,
      playsinline: 1
    },
    events: {
      onReady: function(e) {
        ytReady = true;
        e.target.setVolume(60);
        e.target.playVideo();
        ytPlaying = true;
        updateMusicUI();
      },
      onStateChange: function(e) {
        ytPlaying = (e.data === YT.PlayerState.PLAYING);
        updateMusicUI();
      }
    }
  });
};

function updateMusicUI() {
  const playBtn = document.getElementById('music-play-btn');
  const muteBtn = document.getElementById('music-mute-btn');
  const status = document.getElementById('music-status');
  if (playBtn) playBtn.textContent = ytPlaying ? '\u23f8\ufe0f' : '\u25b6\ufe0f';
  if (muteBtn) muteBtn.textContent = ytMuted ? '\ud83d\udd07' : '\ud83d\udd0a';
  if (status) status.textContent = ytPlaying ? 'PLAYING' : 'PAUSED';
}

function toggleMusicPlay() {
  if (!ytReady || !ytPlayer) return;
  if (ytPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

function toggleMusicMute() {
  if (!ytReady || !ytPlayer) return;
  if (ytMuted) {
    ytPlayer.unMute();
    ytMuted = false;
  } else {
    ytPlayer.mute();
    ytMuted = true;
  }
  updateMusicUI();
}

// Legacy toggle for any old references
function toggleMusic() { toggleMusicPlay(); }

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
        .card { width: 3.5in; background: linear-gradient(135deg, #1a0533, #2d1b69); border-radius: 8px; display: flex; flex-direction: column; align-items: center; color: white; padding: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 2px solid rgba(236,72,153,0.6); }
        .card img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #fbbf24; margin-bottom: 4px; }
        .card h2 { font-family: 'Dancing Script', cursive; color: #f9a8d4; font-size: 14px; margin: 2px 0; }
        .card .dates { font-family: 'Raleway', sans-serif; color: rgba(251,191,36,0.8); font-size: 9px; letter-spacing: 1px; margin-top: 4px; }
        .card .msg { font-family: 'Crimson Text', serif; color: rgba(196,181,253,0.7); font-size: 11px; font-style: italic; margin-top: 4px; }
        .card .obit-section { border-top: 1px solid rgba(168,85,247,0.3); padding-top: 8px; margin-top: 8px; width: 100%; }
        .card .obit-section p { font-family: 'Crimson Text', serif; color: rgba(232,213,245,0.8); font-size: 8px; line-height: 1.5; text-align: left; margin-top: 3px; }
        .card .obit-quote { font-style: italic; text-align: center !important; color: rgba(251,191,36,0.7) !important; margin-top: 8px !important; font-size: 9px !important; }
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
        <div class="obit-section">
          <p>With heavy hearts, we announce the passing of our beloved Sapphire Brooklynn Nicole Parker, who left this world too soon at the tender age of 10 on September 15, 2025. Born on June 20, 2015, in the vibrant city of Las Vegas, Nevada, Sapphire was a shining light in the lives of all who had the privilege to know her.</p>
          <p>Sapphire was the cherished daughter of Angelina and Jackson Parker, and the loving sister to her six siblings: Anna-Grace, Savannah, Brynleigh, Connor, Skyleigh, and Olivia.</p>
          <p>She is preceded in death by her cousins, Kristina, Victoria, Gabby, Amberlynn, and Jordan, who welcomed her with open arms in the embrace of eternity.</p>
          <p>Though her time with us was far too brief, Sapphire's impact was profound and lasting. She taught us the importance of love, family, and cherishing each moment.</p>
          <p>In lieu of flowers, the family requests that donations be made to a charity of your choice in Sapphire's memory.</p>
          <p>A private viewing/funeral and celebration of life will take place on September 22, 2025, for friends and family.</p>
          <p class="obit-quote">"Forever 10. Forever loved. Forever in our hearts."</p>
        </div>
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
        .sheet { width: 5in; background: linear-gradient(135deg, #1a0533, #2d1b69, #1a0533); border-radius: 12px; display: flex; flex-direction: column; align-items: center; color: white; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 2px solid rgba(251,191,36,0.6); text-align: center; }
        .sheet img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #fbbf24; margin-bottom: 12px; }
        .sheet h2 { font-family: 'Dancing Script', cursive; color: #f9a8d4; font-size: 18px; margin: 2px 0; }
        .sheet .dates { font-family: 'Raleway', sans-serif; color: rgba(251,191,36,0.8); font-size: 10px; letter-spacing: 2px; margin-top: 8px; }
        .sheet .divider { width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent); margin: 12px 0; }
        .sheet .obit { font-family: 'Crimson Text', serif; color: rgba(232,213,245,0.8); font-size: 10px; line-height: 1.6; text-align: left; margin-top: 6px; }
        .sheet .quote { font-family: 'Crimson Text', serif; color: rgba(251,191,36,0.7); font-size: 11px; font-style: italic; margin-top: 12px; }
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
        <p class="obit">With heavy hearts, we announce the passing of our beloved Sapphire Brooklynn Nicole Parker, who left this world too soon at the tender age of 10 on September 15, 2025. Born on June 20, 2015, in the vibrant city of Las Vegas, Nevada, Sapphire was a shining light in the lives of all who had the privilege to know her.</p>
        <p class="obit">Sapphire was the cherished daughter of Angelina and Jackson Parker, and the loving sister to her six siblings: Anna-Grace, Savannah, Brynleigh, Connor, Skyleigh, and Olivia. Together, they created a bond that was unbreakable, filled with laughter, adventure, and the kind of love that only siblings can share. Sapphire's presence brought joy and warmth into their lives, and her memory will forever be etched in their hearts.</p>
        <p class="obit">In addition to her immediate family, Sapphire is survived by her doting cousins, her beloved grandparents, and a host of aunts and uncles who loved her dearly. She is preceded in death by her cousins, Kristina, Victoria, Gabby, Amberlynn, and Jordan, who welcomed her with open arms in the embrace of eternity.</p>
        <p class="obit">Sapphire was not only a daughter and sister; she was a friend, a confidant, and a spark of joy to all who encountered her. Her laughter was infectious, her spirit uplifting, and her kindness boundless. She had a unique ability to see the beauty in the world and share it with others, inspiring those around her to embrace life with open hearts.</p>
        <p class="obit">Though her time with us was far too brief, Sapphire's impact was profound and lasting. She taught us the importance of love, family, and cherishing each moment. Her light will continue to shine brightly in our memories, illuminating the path of those who remain.</p>
        <p class="obit">As we gather to celebrate her life, let us remember the joy she brought into our lives and the love she so freely gave. Sapphire will forever be loved, cherished, and missed beyond what words and actions could ever describe. May she rest in peace, knowing she is forever in our hearts.</p>
        <p class="obit">In lieu of flowers, the family requests that donations be made to a charity of your choice in Sapphire's memory, honoring her spirit of kindness and love.</p>
        <p class="obit">A private viewing/funeral and celebration of life will take place on September 22, 2025, for friends and family.</p>
        <div class="divider"></div>
        <p class="quote">"Forever 10. Forever loved. Forever in our hearts."</p>
      </div>
      <script>setTimeout(() => { window.print(); }, 500);<\/script>
    </body>
    </html>
  `);
}
