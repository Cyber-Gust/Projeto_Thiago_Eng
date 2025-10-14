document.addEventListener('DOMContentLoaded', function () {
    
    // CONSTANTES GERAIS
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-menu-btn');
    const header = document.querySelector('.header');

    // LÓGICA PARA O MENU HAMBURGUER
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // LÓGICA PARA O EFEITO DE SCROLL DO HEADER
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ANIMAÇÕES AO ROLAR A PÁGINA
    const faders = document.querySelectorAll('.fade-in');
    if(faders.length > 0) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }
    
    // CONTADOR ANIMADO
    const counters = document.querySelectorAll('.counter');
    if(counters.length > 0) {
        const speed = 200;

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const hasPlus = counter.innerText.includes('+');
            let count = 0;

            const updateCount = () => {
                const inc = target / speed;
                count += inc;

                if (count < target) {
                    counter.innerText = (hasPlus ? '+' : '') + Math.ceil(count);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = (hasPlus ? '+' : '') + target;
                }
            };
            updateCount();
        };
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });
        
        counters.forEach(counter => {
                counterObserver.observe(counter);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // 1. Lógica Mobile (toque)
    // ----------------------------------------------------
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Previne o comportamento padrão de link para gerenciar a abertura
                e.preventDefault(); 
                
                // Se o card já estiver ativo, ele fecha e permite o clique de link
                if (card.classList.contains('is-active')) {
                    card.classList.remove('is-active');
                    // Permite que o link seja seguido após a animação de fechar (opcional)
                    // window.location.href = card.href; 
                } else {
                    // 1. Fecha todos os outros cards
                    cards.forEach(c => c.classList.remove('is-active'));
                    // 2. Abre o card clicado
                    card.classList.add('is-active');
                }
            });
        });
    }

    // 2. Lógica de Alinhamento (Android vs. Outros)
    // ----------------------------------------------------
    const container = document.querySelector('.projects-container');
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detecta se o navegador é Android (uma simplificação)
    const isAndroid = /android/i.test(userAgent);

    if (isAndroid) {
        // Aplica uma classe para que o CSS possa alinhar à esquerda especificamente
        container.classList.add('android-align-left');
    }
    });
    
});

