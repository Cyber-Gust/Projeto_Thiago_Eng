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

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Adiciona um "ouvinte" de clique a cada card
        card.addEventListener('click', () => {
            // Procura se já existe um card ativo
            const activeCard = document.querySelector('.card.active');

            // Se existe um card ativo e NÃO é o que acabamos de clicar, remove a classe 'active' dele
            if (activeCard && activeCard !== card) {
                activeCard.classList.remove('active');
            }

            // Adiciona ou remove a classe 'active' do card que foi clicado
            // (Permite abrir e fechar o mesmo card)
            card.classList.toggle('active');
        });
    });
    
});

