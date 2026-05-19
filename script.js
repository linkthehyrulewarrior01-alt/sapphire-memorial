// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 5, 32, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 5, 32, 0.9)';
    }
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== GUESTBOOK =====
const guestbookForm = document.getElementById('guestbookForm');
const guestbookEntries = document.getElementById('guestbookEntries');

guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const relation = document.getElementById('guestRelation').value;
    const message = document.getElementById('guestMessage').value;

    if (!name || !message) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const entry = document.createElement('div');
    entry.className = 'guestbook-entry';
    entry.style.animation = 'fadeInUp 0.5s ease-out';
    entry.innerHTML = `
        <div class="entry-header">
            <span class="entry-name">${escapeHtml(name)}</span>
            ${relation ? `<span class="entry-relation">${escapeHtml(relation)}</span>` : ''}
        </div>
        <div class="entry-date">${dateStr}</div>
        <p class="entry-message">${escapeHtml(message)}</p>
    `;

    guestbookEntries.insertBefore(entry, guestbookEntries.firstChild);

    // Save to localStorage
    saveGuestbookEntry({ name, relation, message, date: dateStr });

    // Reset form
    guestbookForm.reset();

    // Show confirmation
    alert('Thank you for signing the guestbook. Your message has been added. 💜');
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function saveGuestbookEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
}

function loadGuestbookEntries() {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    entries.forEach(entry => {
        const el = document.createElement('div');
        el.className = 'guestbook-entry';
        el.innerHTML = `
            <div class="entry-header">
                <span class="entry-name">${escapeHtml(entry.name)}</span>
                ${entry.relation ? `<span class="entry-relation">${escapeHtml(entry.relation)}</span>` : ''}
            </div>
            <div class="entry-date">${entry.date}</div>
            <p class="entry-message">${escapeHtml(entry.message)}</p>
        `;
        guestbookEntries.insertBefore(el, guestbookEntries.firstChild);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadGuestbookEntries();
});
