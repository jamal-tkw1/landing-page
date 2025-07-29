        // Light/Dark mode toggle logic
        function setTheme(mode) {
            const body = document.body;
            const nav = document.getElementById('mainNavbar');
            const glassSections = document.querySelectorAll('.brand-glass, .testimonial-glass, .contact-glass, .about-card, .product-card, .card.bg-white');
            const footer = document.querySelector('footer');
            const dark = mode === 'dark';
            body.classList.toggle('dark-mode', dark);
            nav && nav.classList.toggle('dark-mode', dark);
            glassSections.forEach(el => el.classList.toggle('dark-mode', dark));
            if (footer) footer.classList.toggle('dark-mode', dark);
            document.querySelectorAll('.bg-dark').forEach(el => el.classList.toggle('dark-mode', dark));
            document.querySelectorAll('.btn-outline-light').forEach(el => el.classList.toggle('dark-mode', dark));
            // Icon swap
            document.getElementById('icon-moon').style.display = dark ? 'none' : '';
            document.getElementById('icon-sun').style.display = dark ? '' : 'none';
        }
        function getPreferredTheme() {
            return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        document.addEventListener('DOMContentLoaded', function () {
            // Set initial theme
            setTheme(getPreferredTheme());
            // Toggle button
            const btn = document.getElementById('themeToggleBtn');
            if (btn) {
                btn.addEventListener('click', function () {
                    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                });
                // Set correct icon on load
                setTheme(getPreferredTheme());
            }
        });
        AOS.init({
            duration: 1000,
            once: true
        });



        // Show/hide navbar after scrolling past home section and show/hide Go to Top button
        window.addEventListener('scroll', function () {
            const navbar = document.getElementById('mainNavbar');
            const hero = document.querySelector('header');
            const goTopBtn = document.getElementById('goTopBtn');
            if (window.scrollY > hero.offsetHeight - 50) {
                navbar.classList.remove('d-none');
                navbar.classList.add('d-flex');
            } else {
                navbar.classList.remove('d-flex');
                navbar.classList.add('d-none');
            }
            if (window.scrollY > 200) {
                goTopBtn.style.display = 'block';
            } else {
                goTopBtn.style.display = 'none';
            }
        });

        // Go to Top button click
        document.getElementById('goTopBtn').addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Prevent section hash in URL for navbar links, but scroll smoothly
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href').replace('#', '');
                    const target = document.getElementById(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Optionally close navbar on mobile
                        const navbarCollapse = document.getElementById('navbarNav');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            new bootstrap.Collapse(navbarCollapse).hide();
                        }
                    }
                });
            });
        });

        // Ensure Bootstrap carousel in modal works correctly
        document.addEventListener('DOMContentLoaded', function () {
            var galleryModal1 = document.getElementById('galleryModal1');
            if (galleryModal1) {
                galleryModal1.addEventListener('shown.bs.modal', function () {
                    try {
                        var carousel = document.querySelector('#carouselGallery1');
                        if (carousel) {
                            var bsCarousel = bootstrap.Carousel.getInstance(carousel);
                            if (!bsCarousel) {
                                new bootstrap.Carousel(carousel, { interval: false });
                            }
                        }
                    } catch (e) {
                        console.error('Error initializing modal carousel:', e);
                    }
                });
            }
        });

        // Enhance testimonial carousel: auto-slide, pause on hover, keyboard navigation
        document.addEventListener('DOMContentLoaded', function () {
            var testimonialCarousel = document.getElementById('testimonialCarousel');
            if (testimonialCarousel) {
                var carousel = bootstrap.Carousel.getOrCreateInstance(testimonialCarousel, {
                    interval: 6000,
                    pause: 'hover',
                    ride: 'carousel',
                    keyboard: true,
                    touch: true
                });
            }
        });

        // Robust contact form validation and feedback
        (function () {
            var form = document.getElementById('contactForm');
            var feedback = document.getElementById('contactFeedback');
            var btn = document.getElementById('contactSubmitBtn');
            var btnText = document.getElementById('contactBtnText');
            var btnSpinner = document.getElementById('contactBtnSpinner');
            if (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    feedback.classList.add('d-none');
                    feedback.classList.remove('alert-success', 'alert-danger');
                    if (!form.checkValidity()) {
                        form.classList.add('was-validated');
                        return;
                    }
                    // Simulate async send
                    btn.disabled = true;
                    btnSpinner.classList.remove('d-none');
                    btnText.textContent = 'Sending...';
                    setTimeout(function () {
                        btn.disabled = false;
                        btnSpinner.classList.add('d-none');
                        btnText.textContent = 'Send';
                        feedback.textContent = 'Thank you! Your message has been sent.';
                        feedback.classList.remove('d-none', 'alert-danger');
                        feedback.classList.add('alert-success');
                        form.reset();
                        form.classList.remove('was-validated');
                    }, 1500);
                }, false);
            }
        })();