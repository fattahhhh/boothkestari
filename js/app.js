/**
 * Kestari Open House — App Core & UI Scripts
 * Navigation, smooth scrolling, scroll reveal, and toasts.
 */
'use strict';

(function () {
    const navbar = document.getElementById('navbar');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const toastContainer = document.getElementById('toast-container');

    /* ----------------------------------------------------------------------
       1. Navbar scroll state
       ---------------------------------------------------------------------- */
    function handleScroll() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 24);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ----------------------------------------------------------------------
       2. Mobile menu
       ---------------------------------------------------------------------- */
    function closeMenu() {
        if (!navLinks || !navHamburger) return;
        navLinks.classList.remove('open');
        navHamburger.classList.remove('active');
        navHamburger.setAttribute('aria-expanded', 'false');
        navHamburger.setAttribute('aria-label', 'Buka menu');
    }

    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navHamburger.classList.toggle('active', isOpen);
            navHamburger.setAttribute('aria-expanded', String(isOpen));
            navHamburger.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
        });

        navLinkItems.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!navLinks.classList.contains('open')) return;
            if (navLinks.contains(event.target) || navHamburger.contains(event.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    /* ----------------------------------------------------------------------
       3. Smooth scroll with navbar offset
       ---------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 64;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 4;

            window.scrollTo({ top, behavior: 'smooth' });

            // Keep keyboard focus in sync with the scroll destination.
            if (targetId !== '#hero') {
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    /* ----------------------------------------------------------------------
       4. Active nav link based on viewport
       ---------------------------------------------------------------------- */
    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const id = entry.target.getAttribute('id');
                    navLinkItems.forEach((link) => {
                        const isActive = link.getAttribute('href') === `#${id}`;
                        link.classList.toggle('active', isActive);
                        if (isActive) {
                            link.setAttribute('aria-current', 'true');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                });
            },
            { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        );

        sections.forEach((section) => navObserver.observe(section));
    }

    /* ----------------------------------------------------------------------
       5. Scroll reveal
       ---------------------------------------------------------------------- */
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('revealed'));
    }

    /* ----------------------------------------------------------------------
       6. Photo marquee fallback
       ---------------------------------------------------------------------- */
    document.querySelectorAll('.marquee-card img').forEach((image) => {
        image.addEventListener('error', () => {
            image.remove();
        }, { once: true });
    });

    /* ----------------------------------------------------------------------
       7. Toast notifications
       ---------------------------------------------------------------------- */
    window.showToast = function (message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

        const text = document.createElement('span');
        text.textContent = message;

        toast.append(icon, text);
        toastContainer.appendChild(toast);

        window.setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3000);
    };
})();
