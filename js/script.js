// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');
    const researchShowMore = document.getElementById('research-show-more');
    const projectsShowMore = document.getElementById('projects-show-more');
    const logo = document.querySelector('.logo');
    let lastScrollY = window.scrollY;

    // Handle scroll to show/hide header
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }

        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        // Hide/Show logo on scroll
        if (window.scrollY > 0) {
            logo.classList.add('hide');
        } else {
            logo.classList.remove('hide');
        }

        lastScrollY = window.scrollY;
    });

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal functionality for read more buttons
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    });

    // Show more functionality for research and projects
    if (researchShowMore) {
        researchShowMore.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.research-item.hidden');
            if (hiddenItems.length > 0) {
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                researchShowMore.textContent = 'Show Less';
            } else {
                const allItems = document.querySelectorAll('.research-item');
                for (let i = 3; i < allItems.length; i++) {
                    allItems[i].classList.add('hidden');
                }
                researchShowMore.textContent = 'Show More';
            }
        });
    }

    if (projectsShowMore) {
        projectsShowMore.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.project-item.hidden');
            if (hiddenItems.length > 0) {
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                projectsShowMore.textContent = 'Show Less';
            } else {
                const allItems = document.querySelectorAll('.project-item');
                for (let i = 3; i < allItems.length; i++) {
                    allItems[i].classList.add('hidden');
                }
                projectsShowMore.textContent = 'Show More';
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Initialize active nav link
    updateActiveNavLink();

    // Hide research and project items beyond the first 3
    const researchItems = document.querySelectorAll('.research-item');
    const projectItems = document.querySelectorAll('.project-item');

    if (researchItems.length > 3) {
        for (let i = 3; i < researchItems.length; i++) {
            researchItems[i].classList.add('hidden');
        }
    } else if (researchShowMore) {
        researchShowMore.style.display = 'none';
    }

    if (projectItems.length > 3) {
        for (let i = 3; i < projectItems.length; i++) {
            projectItems[i].classList.add('hidden');
        }
    } else if (projectsShowMore) {
        projectsShowMore.style.display = 'none';
    }

    // Ensure hamburger icon is bars on load
    if (hamburger) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Accessibility: Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

// Show navbar on scroll up, hide on scroll down
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (!header) return;
        if (window.scrollY < lastScrollY) {
            // Scrolling up
            header.classList.remove('hide');
        } else if (window.scrollY > lastScrollY) {
            // Scrolling down
            header.classList.add('hide');
        }
        lastScrollY = window.scrollY;
    });
});