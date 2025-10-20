// LÓGICA PARA O PRELOADER
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Adiciona a classe que inicia a transição de fade-out
        preloader.classList.add('hidden');
    }
});

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
    
    // Inicialização do Swiper para Clientes
    const clientSwiperSettings = {
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000, // Ajuste este valor para controlar a velocidade (maior = mais lento)
        slidesPerView: 'auto',
        freeMode: true,
        breakpoints: {
            0: { // Para mobile pequeno
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: { // Para tablets
                slidesPerView: 3,
                spaceBetween: 30
            },
            992: { // Para desktops menores
                slidesPerView: 4,
                spaceBetween: 40
            },
            1200: { // Para desktops maiores
                slidesPerView: 5,
                spaceBetween: 50
            }
        },
    };

    // Inicialização do Carrossel 1 (Rola para a Direita)
    if (document.querySelector('.client-swiper-right')) {
        new Swiper('.client-swiper-right', {
            ...clientSwiperSettings, // Copia todas as configurações base
            autoplay: {
                ...clientSwiperSettings.autoplay, // Copia as configurações de autoplay
                reverseDirection: false // Direção padrão (para a direita)
            },
        });
    }

    // Inicialização do Carrossel 2 (Rola para a Esquerda)
    if (document.querySelector('.client-swiper-left')) {
        new Swiper('.client-swiper-left', {
            ...clientSwiperSettings, // Copia todas as configurações base
            autoplay: {
                ...clientSwiperSettings.autoplay, // Copia as configurações de autoplay
                reverseDirection: true // Inverte a direção (para a esquerda)
            },
        });
    }
    
    
});



document.addEventListener('DOMContentLoaded', () => {
        const projectCards = document.querySelectorAll('.project-card');
        const projectContainer = document.querySelector('.project-container');

        // Função para remover a classe ativa de todos os cards
        const removeActiveClass = () => {
            projectCards.forEach(card => {
                card.classList.remove('project-active');
            });
        };

        projectCards.forEach(card => {
            // Lógica para desktop (passar o mouse)
            card.addEventListener('mouseover', () => {
                // Verifica se a tela é maior que 768px (não é mobile)
                if (window.innerWidth > 768) {
                    removeActiveClass();
                    card.classList.add('project-active');
                }
            });

            // Lógica para mobile (clique)
            card.addEventListener('click', () => {
                // Verifica se a tela é 768px ou menor (é mobile)
                if (window.innerWidth <= 768) {
                    // Se o card clicado já estiver ativo, fecha ele. Senão, abre.
                    if (card.classList.contains('project-active')) {
                        card.classList.remove('project-active');
                    } else {
                        removeActiveClass();
                        card.classList.add('project-active');
                    }
                }
            });
        });

        // No desktop, quando o mouse sai da área dos cards, todos fecham
        if (projectContainer && window.innerWidth > 768) {
            projectContainer.addEventListener('mouseleave', () => {
                removeActiveClass();
            });
        }
    });