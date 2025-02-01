// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Back to top button functionality
const backToTopBtn = document.getElementById('back-to-top-btn');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Sidebar toggle functionality
const initializeSidebar = () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('main-container');
    
    if (sidebarToggle && sidebar) {
        const isMobile = () => window.innerWidth <= 768;
        
        sidebarToggle.addEventListener('click', () => {
            if (isMobile()) {
                sidebar.classList.toggle('show');
            } else {
                sidebar.classList.toggle('collapsed');
                // Store sidebar state in localStorage only for desktop
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!isMobile()) {
                sidebar.classList.remove('show');
                // Restore collapsed state on desktop
                const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
                if (sidebarCollapsed) {
                    sidebar.classList.add('collapsed');
                }
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (isMobile() &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target) &&
                sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });

        // Restore sidebar state on page load for desktop
        if (!isMobile()) {
            const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
            }
        }
    }
};

// Feature cards animation on scroll
const featureCards = document.querySelectorAll('.feature-card');
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const featureObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
});

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    featureObserver.observe(card);
});

// Hero section parallax effect
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Shield icon pulse animation
const shieldIcon = document.querySelector('.shield-icon');
if (shieldIcon) {
    shieldIcon.addEventListener('mouseover', () => {
        shieldIcon.style.animation = 'none';
        shieldIcon.offsetHeight; // Trigger reflow
        shieldIcon.style.animation = 'pulse 1s ease-in-out infinite';
    });
}

// Dynamic color gradient for feature cards
const updateGradients = () => {
    const featureIcons = document.querySelectorAll('.feature-card i');
    featureIcons.forEach((icon, index) => {
        const progress = (index / featureIcons.length) * 100;
        icon.style.backgroundImage = `linear-gradient(120deg, 
            var(--neon-cyan) ${progress}%, 
            var(--seafoam) ${progress + 50}%, 
            var(--magenta) ${progress + 100}%)`;
    });
};

// Initialize page transitions
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('#content');
    if (mainContent) {
        mainContent.classList.add('page-transition', 'active');
    }
    updateGradients();
    initializeSidebar(); // Initialize sidebar functionality
});

// Navigation menu highlight
const highlightCurrentSection = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
};

// Initialize all animations and interactions
const initializeInteractions = () => {
    highlightCurrentSection();
    
    // Add hover effect for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeInteractions);
