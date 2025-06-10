// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loader Animation
    const loaderContainer = document.querySelector('.loader-container');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderContainer.classList.add('fade-out');
            setTimeout(() => {
                loaderContainer.style.display = 'none';
                // Start animations after loader is gone
                document.body.classList.add('loaded');
            }, 500);
        }, 1000); // Show loader for at least 1 second
    });

    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (window.scrollY > lastScrollY) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = window.scrollY;
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Tab Switching in Experience Section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and items
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked button and corresponding item
            btn.classList.add('active');
            document.getElementById(btn.dataset.id).classList.add('active');
        });
    });

    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .experience-content, .project-card, .skills-category, .publication-card, .contact-content');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
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

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') !== '#') {
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Particles Animation for Hero Section
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position, size and animation delay
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Delay for outline cursor
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 100);
        });
        
        // Add pulse effect on clickable elements
        document.querySelectorAll('a, button, .tab-btn, .menu-toggle').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('expand');
                cursorOutline.classList.add('expand');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('expand');
                cursorOutline.classList.remove('expand');
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Typewriter Effect
    const dynamicText = document.querySelector('.dynamic-text');
    const phrases = ['AI & ML Engineer', 'Deep Learning Researcher', 'Generative AI Developer', 'NLP Engineer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Type Speed
        let typeSpeed = isDeleting ? 50 : 150;
        
        // If phrase is complete, set delay before deleting
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Wait before typing next phrase
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeEffect, 1000);

    // Resume Link Handler
  const resumeBtn = document.querySelector('.resume-btn');

if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('resume/Harsh_Rawte_AI_Resume.pdf', '_blank');
    });
}


    // Project Links Handler
    document.querySelectorAll('.project-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default only if the href is "#" (placeholder)
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                alert('This is a portfolio demo. Project links would be implemented with actual URLs.');
            }
        });
    });

    // View More Projects Button
const viewMoreBtn = document.querySelector('.view-more .btn');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Open GitHub profile in a new tab
        window.open('https://github.com/harshhrawte', '_blank', 'noopener,noreferrer');
    });
}


    // Publication Links Handler
    document.querySelectorAll('.publication-link').forEach(link => {
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('This is a portfolio demo. Publication links would redirect to actual papers, code repositories, or demos.');
            });
        }
    });

    // Optional: Add a simple analytics event tracking
    function trackEvent(category, action, label) {
        if (window.plausible) {
            window.plausible(action, { props: { category, label } });
        }
    }

    // Track outbound link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('Outbound Link', 'click', link.getAttribute('href'));
        });
    });

    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                trackEvent('Section View', 'view', sectionId);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add GSAP-like scroll reveal effects without requiring the library
    function addScrollReveal() {
        const revealElements = document.querySelectorAll('.project-card, .publication-card, .skill-item');
        
        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
    
    addScrollReveal();

    // Add glitch effect animation for the hero title
    const glitchTitle = document.querySelector('.glitch');
    
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.classList.add('active');
            setTimeout(() => {
                glitchTitle.classList.remove('active');
            }, 200);
        }, 5000);
    }
});
