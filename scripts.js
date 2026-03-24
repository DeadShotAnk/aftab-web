// Smooth Scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Navbar background opacity change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-zinc-950/90');
    } else {
        nav.classList.remove('bg-zinc-950/90');
    }
});

// Intersection Observer for Timeline Reveal
const observerOptions = {
    threshold: 0.2
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

const contactWrapper = document.getElementById('contact-wrapper');
const mainContactBtn = document.getElementById('main-contact-btn');
const evolvedButtons = document.getElementById('evolved-buttons');
let revertTimeout;

function revertButton() {
    // Return to original mobile or desktop width
    const isMobile = window.innerWidth < 640;
    contactWrapper.style.width = isMobile ? '85px' : '100px'; 
    
    evolvedButtons.style.opacity = '0';
    evolvedButtons.style.pointerEvents = 'none';

    setTimeout(() => {
        mainContactBtn.style.opacity = '1';
        mainContactBtn.style.pointerEvents = 'auto';
    }, 200);
}

// Function to handle the evolution
function evolve(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevents the 'document' click listener from firing immediately

    clearTimeout(revertTimeout);

    // Expand width - slightly smaller on mobile to prevent layout break
    const isMobile = window.innerWidth < 640;
    contactWrapper.style.width = isMobile ? '120px' : '140px'; 
    
    mainContactBtn.style.opacity = '0';
    mainContactBtn.style.pointerEvents = 'none';

    setTimeout(() => {
        evolvedButtons.style.opacity = '1';
        evolvedButtons.style.pointerEvents = 'auto';
    }, 200);

    revertTimeout = setTimeout(revertButton, 6000);
}

// Add both Click and Touchstart for mobile responsiveness
mainContactBtn.addEventListener('click', evolve);
mainContactBtn.addEventListener('touchstart', evolve, {passive: false});

// Close if clicking outside
document.addEventListener('click', (e) => {
    if (!contactWrapper.contains(e.target)) {
        clearTimeout(revertTimeout);
        revertButton();
    }
});