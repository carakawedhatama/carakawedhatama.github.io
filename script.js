// ===== Navigation Functionality =====
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');

    const highlightActiveSection = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial check

    // ===== Smooth Scroll Enhancement =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation - group by section to avoid long delays
    const animationGroups = [
        '.services-grid .service-card',
        '.experience-column .timeline-item',
        '.skills-section .skill-tag',
        '.projects-section .project-card',
        '.products-section .product-card',
        '.blog-section .blog-card',
        '.contact-section .contact-item, .contact-section .contact-card'
    ];

    animationGroups.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            // Max delay of 0.3s per section to keep animations snappy
            el.style.transition = `all 0.5s ease ${Math.min(index * 0.05, 0.3)}s`;
            animateOnScroll.observe(el);
        });
    });

    const animatableElements = document.querySelectorAll(
        '.service-card, .timeline-item, .skill-tag, .project-card, .product-card, .blog-card, .contact-item, .contact-card'
    );

    // Add animation class handler
    document.querySelectorAll('.animate-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Re-implement with MutationObserver for class changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const element = mutation.target;
                if (element.classList.contains('animate-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    });

    animatableElements.forEach(el => {
        observer.observe(el, { attributes: true });
    });

    // ===== Contact Form Handler =====
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // For demo purposes - show success feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Message Sent!</span>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';

                // Reset form
                contactForm.reset();

                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);

            // In a real implementation, you would send the data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, message })
            // });
        });
    }

    // ===== Typing Effect for Hero (Optional Enhancement) =====
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        // Add a subtle glow effect on hover
        heroTitle.addEventListener('mouseenter', () => {
            const gradientText = heroTitle.querySelector('.gradient-text');
            if (gradientText) {
                gradientText.style.filter = 'drop-shadow(0 0 10px rgba(79, 109, 245, 0.5))';
            }
        });

        heroTitle.addEventListener('mouseleave', () => {
            const gradientText = heroTitle.querySelector('.gradient-text');
            if (gradientText) {
                gradientText.style.filter = 'none';
            }
        });
    }

    // ===== Add spinning animation for loading state =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);

    // ===== Parallax Effect for Hero Background =====
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const heroBg = heroSection.querySelector('.hero-image-bg');
                if (heroBg) {
                    heroBg.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            }
        });
    }

    // ===== Project Cards Tilt Effect =====
    const projectCards = document.querySelectorAll('.project-card:not(.featured)');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== Skills Tag Hover Effect =====
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });

    // ===== Console Easter Egg =====
    console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #4f6df5;');
    console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px; color: #4a5568;');

    // ===== Performance: Throttle scroll events =====
    let ticking = false;

    const throttledScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                highlightActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    };

    // Replace direct scroll listeners with throttled version
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', highlightActiveSection);
    window.addEventListener('scroll', throttledScroll);

    // ===== Slider Functionality =====
    const initSliders = () => {
        const sliderContainers = document.querySelectorAll('.slider-container');

        sliderContainers.forEach(container => {
            const track = container.querySelector('.slider-track');
            const prevBtn = container.querySelector('.slider-btn-prev');
            const nextBtn = container.querySelector('.slider-btn-next');
            const dotsContainer = container.querySelector('.slider-dots');
            const items = Array.from(container.querySelectorAll('.slider-item'));

            if (!track || items.length === 0) return;

            let currentPage = 0;

            // Calculate items per view based on screen size
            const getItemsPerView = () => {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            };

            // Calculate total pages
            const getTotalPages = () => {
                const itemsPerView = getItemsPerView();
                return Math.max(1, items.length - itemsPerView + 1);
            };

            // Create dot indicators
            const createDots = () => {
                dotsContainer.innerHTML = '';
                const totalPages = getTotalPages();

                // Only show dots if there's more than one page
                if (totalPages <= 1) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    return;
                }

                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';

                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('slider-dot');
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToPage(i));
                    dotsContainer.appendChild(dot);
                }
            };

            // Update active dot
            const updateDots = () => {
                const dots = dotsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentPage);
                });
            };

            // Update button states
            const updateButtons = () => {
                const totalPages = getTotalPages();
                prevBtn.disabled = currentPage === 0;
                nextBtn.disabled = currentPage >= totalPages - 1;
            };

            // Go to specific page
            const goToPage = (pageIndex) => {
                const totalPages = getTotalPages();
                if (pageIndex < 0) pageIndex = 0;
                if (pageIndex >= totalPages) pageIndex = totalPages - 1;

                currentPage = pageIndex;
                const targetItem = items[currentPage];

                if (targetItem) {
                    targetItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start'
                    });
                }

                updateDots();
                updateButtons();
            };

            // Navigate prev/next
            const goToPrev = () => {
                if (currentPage > 0) {
                    goToPage(currentPage - 1);
                }
            };

            const goToNext = () => {
                const totalPages = getTotalPages();
                if (currentPage < totalPages - 1) {
                    goToPage(currentPage + 1);
                }
            };

            // Detect current page from scroll position
            const detectCurrentPage = () => {
                const trackRect = track.getBoundingClientRect();

                for (let i = 0; i < items.length; i++) {
                    const itemRect = items[i].getBoundingClientRect();
                    if (itemRect.left >= trackRect.left - 10 && itemRect.left < trackRect.left + trackRect.width / 2) {
                        const totalPages = getTotalPages();
                        const newPage = Math.min(i, totalPages - 1);
                        if (currentPage !== newPage) {
                            currentPage = newPage;
                            updateDots();
                            updateButtons();
                        }
                        break;
                    }
                }
            };

            // Event listeners
            prevBtn.addEventListener('click', goToPrev);
            nextBtn.addEventListener('click', goToNext);

            // Update on scroll (debounced)
            let scrollTimeout;
            track.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(detectCurrentPage, 100);
            }, { passive: true });

            // Recreate dots on resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    createDots();
                    updateButtons();
                }, 150);
            });

            // Initialize
            createDots();
            updateButtons();
        });
    };

    initSliders();
});
