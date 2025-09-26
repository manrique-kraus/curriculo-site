document.addEventListener("DOMContentLoaded", () => {
    const btnExit = document.getElementById('btn-exit');
    const btnStart = document.getElementById('btn-start');
    const toggleBtn = document.getElementById("toggleDoc");
    const destroyBtn = document.getElementById("destroy-button");
    const folder = document.getElementById("folder");
    const documentOpen = document.getElementById("document");
    const containerPart1 = document.querySelector('.container-part1');
    const containerPart2 = document.querySelector(".container-part2");
    const homeSection = document.getElementById('home-section');
    const starsContainer = document.getElementById('stars-container');
    const typewriterText = document.querySelector('.typewriter-text');

    const clickSound = new Audio('src/files/sound-click-button.wav');
    clickSound.volume = 0.4;

    const clickWhoosh = new Audio('src/files/whoosh.mp3');
    clickWhoosh.volume = 0.2;

    // BOTÕES DE SOM E IDIOMA
    const toggleSound = document.getElementById('toggle-sound');
    const toggleLanguage = document.getElementById('toggle-language');

    const clickMp3 = new Audio('src/files/click.mp3');
    clickMp3.volume = 0.2;



    let soundEnabled = true;

    toggleSound.addEventListener('click', () => {
        soundEnabled = toggleSound.querySelector('input').checked;
        clickSound.volume = soundEnabled ? 0.4 : 0;
        clickWhoosh.volume = soundEnabled ? 0.2 : 0;
        clickMp3.volume = soundEnabled ? 0.2 : 0;
        if (soundEnabled) {
            clickMp3.currentTime = 0;
            clickMp3.play();
        }
    });

    const toggleLanguageInput = toggleLanguage.querySelector('input');
    toggleLanguageInput.addEventListener('change', () => {
        window.currentLanguage = toggleLanguageInput.checked ? 'pt' : 'en';
        window.updateTexts();
        if (soundEnabled) {
            clickMp3.currentTime = 0;
            clickMp3.play();
        }
    });

    // BOTÃO FUGIR
    let state = 0;
    btnExit.classList.add('escaping');
    btnExit.style.left = '0px';

    btnExit.addEventListener('click', () => {
        if (soundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        state = (state + 1) % 4;

        const isMobile = window.innerWidth <= 600;
        const moveDistance = isMobile ? 75 : 300;

        if (state === 1) {
            btnExit.style.left = `-${moveDistance}px`;
        } else if (state === 2) {
            btnExit.style.left = '0px';
        } else if (state === 3) {
            btnExit.style.left = `${moveDistance}px`;
        } else {
            btnExit.style.left = '0px';
        }
    });

    // BOTÃO INICIAR
    btnStart.addEventListener('click', () => {
        if (soundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }

        homeSection.style.transition = "opacity 0.5s ease-out";
        homeSection.style.opacity = 0;

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#0f0f1e';
        overlay.style.zIndex = '50';
        document.querySelector('.screen').appendChild(overlay);

        // BARRA DE CARREGAMENTO
        const loadingContainer = document.createElement('div');
        loadingContainer.classList.add('loading-container', 'active');
        const loadingBar = document.createElement('div');
        loadingBar.classList.add('loading-bar-pixel');
        const loadingProgress = document.createElement('div');
        loadingProgress.classList.add('loading-progress-pixel');
        loadingProgress.style.width = '0%';
        loadingBar.appendChild(loadingProgress);
        loadingContainer.appendChild(loadingBar);
        const loadingText = document.createElement('div');
        loadingText.classList.add('loading-text');
        loadingText.innerText = window.translations[window.currentLanguage].loading;
        loadingText.style.color = '#fff';
        loadingContainer.appendChild(loadingText);
        document.querySelector('.screen').appendChild(loadingContainer);

        // DELAY DE CARREGAMENTO
        setTimeout(() => {
            loadingProgress.style.transition = 'width 0.5s ease-in-out';
            loadingProgress.style.width = '100%';
        }, 50);

        setTimeout(() => {
            overlay.remove();
            loadingContainer.remove();

            // Esconde a tela inicial
            homeSection.style.display = 'none';
            starsContainer.style.display = 'none';

            // Animação ao aparecer landing page
            containerPart1.classList.add('show');

            // Permite scroll
            document.querySelector('.screen').style.overflowY = 'auto';

            // Mostra header
            document.getElementById('main-header').style.display = 'flex';

            // Mostra botão flutuante
            document.body.classList.add('site-started');

            // BOTÃO FLUTUANTE PARA VOLTAR AO TOPO
            const floatingButton = document.querySelector('.button');
            if (floatingButton) {
                floatingButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (soundEnabled) {
                        clickWhoosh.currentTime = 0;
                        clickWhoosh.play();
                    }
                    const screen = document.querySelector('.screen');
                    screen.style.scrollBehavior = 'smooth';
                    screen.scrollTop = 0;
                });
            }

        }, 1600);
    });

    // LÓGICA DE NAVEGAÇÃO
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (soundEnabled) {
                clickWhoosh.currentTime = 0;
                clickWhoosh.play();
            }

            const targetSection = link.getAttribute('data-section');

            if (targetSection === 'home') {
                const curriculoSection = document.getElementById('curriculo-section');
                curriculoSection.classList.remove('active');
                starsContainer.style.display = 'block';

                document.querySelector('.screen').style.overflowY = 'hidden';

                // OCULTA O BOTÃO FLUTUANTE
                document.body.classList.remove('site-started');

                setTimeout(() => {
                    homeSection.style.display = 'flex';
                    homeSection.classList.remove('hidden');
                }, 500);
            }
        });
    });

    // ESTRELAS CAINDO
    function createFallingStars() {
        if (!starsContainer) return;
        const numberOfStars = 50;
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const sizes = ['small', 'medium', 'large'];
            const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
            star.classList.add(randomSize);
            if (Math.random() > 0.7) {
                star.classList.add('bright');
            }
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = (Math.random() * 0.1) + 's';
            const initialY = -Math.random() * window.innerHeight;
            star.style.transform = `translateY(${initialY}px) rotate(0deg)`;
            const duration = 15 + Math.random() * 15;
            star.style.animationDuration = duration + 's';
            starsContainer.appendChild(star);
        }
    }

    // ADICIONAR NOVAS ESTRELAS 
    function addNewStars() {
        if (!starsContainer) return;
        setInterval(() => {
            const star = document.createElement('div');
            star.classList.add('star');
            const sizes = ['small', 'medium', 'large'];
            const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
            star.classList.add(randomSize);
            if (Math.random() > 0.7) {
                star.classList.add('bright');
            }
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDuration = (15 + Math.random() * 15) + 's';
            starsContainer.appendChild(star);
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 30000);
        }, 500);
    }

    // INICIA ESTRELAS
    createFallingStars();
    addNewStars();

    // PASTA FECHADA APARECER AO SCROLAR
    const folderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                folder.classList.add("show");
                folderObserver.unobserve(folder);
            }
        });
    }, { threshold: 0.4 });
    folderObserver.observe(folder);

    // ANIMAÇÃO DO CRACHÁ CONTATO
    const contactSection = document.querySelector('.container-part4');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // ABRIR DOCUMENTO
    toggleBtn.addEventListener('click', () => {
        folder.classList.add('hidden');
        documentOpen.classList.remove('hidden');
        toggleBtn.style.display = 'none';
        destroyBtn.style.display = 'inline-block';
        setTimeout(() => documentOpen.classList.add('show'), 50);
        startTypewriterEffect();
    });

    // EFEITO MÁQUINA DE ESCREVER
    function startTypewriterEffect() {
        if (!typewriterText) return;
        let originalText = window.translations[window.currentLanguage].part2.typewriter;

        typewriterText.textContent = '';
        typewriterText.style.visibility = 'visible';

        let i = 0;
        const speed = 15;

        const interval = setInterval(() => {
            const char = originalText.charAt(i);
            typewriterText.textContent += char;

            i++;
            if (i >= originalText.length) {
                clearInterval(interval);
            }
        }, speed);
    }

    // DESTRUIR DOCUMENTO
    destroyBtn.addEventListener("click", () => {
        const title = document.querySelector(".container-part2 .title");

        if (title) title.style.display = "none";
        destroyBtn.style.display = "none";

        documentOpen.classList.add("black-hole");

        setTimeout(() => {
            documentOpen.remove();

            // MENSAGEM DEPOIS DE DESTRUIR
            const message = document.createElement('div');
            message.textContent = window.translations[window.currentLanguage].part2.nothingHere;
            message.style.fontFamily = '"Press Start 2P", monospace';
            message.style.fontSize = '32px';
            message.style.color = '#fff';
            message.style.textAlign = 'center';
            message.style.marginTop = '50px';
            message.style.textShadow = '2px 2px 0px #000';
            containerPart2.appendChild(message);

            containerPart2.classList.add("black-hole-trail");

            setTimeout(() => {
                containerPart2.classList.remove("black-hole-trail");
            }, 600);
        }, 1800);
    });

});

// TV LIGANDO
document.addEventListener('DOMContentLoaded', () => {
    const staticOverlay = document.querySelector('.static-overlay');
    const mainContent = document.querySelector('.screen');

    mainContent.classList.remove('hidden');



    setTimeout(() => {

        staticOverlay.classList.add('static-fade-out');

        staticOverlay.addEventListener('transitionend', () => {
            staticOverlay.style.display = 'none';
        }, { once: true });
    }, 200);
});

// ANIMAÇÃO DE CRÉDITOS EM CASCATA INFINITA
document.addEventListener('DOMContentLoaded', () => {
    const creditsInner = document.querySelector('.credits-inner');
    if (!creditsInner) return;

    // Duplica o conteúdo para criar um loop 
    function duplicateContent() {
        const originals = Array.from(creditsInner.children);

        // Remove cópias antigas 
        const oldCopies = creditsInner.querySelectorAll('[data-copy]');
        oldCopies.forEach(copy => copy.remove());

        originals.forEach(node => {
            const copy = node.cloneNode(true);
            copy.dataset.copy = 'true';
            creditsInner.appendChild(copy);
        });
    }

    // Define a animação e a distância de rolagem
    function setupAnimation() {

        // Pega a altura do primeiro item 
        const firstItemHeight = creditsInner.firstElementChild.offsetHeight + 60;

        // Distância total para a animação
        const animationDistance = firstItemHeight * (creditsInner.children.length / 2);

        creditsInner.style.setProperty('--scroll-distance', `-${animationDistance}px`);

        // Ajusta a duração 
        const pxPerSecond = 50;
        const durationSec = Math.max(6, animationDistance / pxPerSecond);
        creditsInner.style.setProperty('--duration', `${durationSec}s`);
    }

    // Executa as funções
    duplicateContent();
    window.updateTexts();
    setupAnimation();

    // Recalcula ao redimensionar a janela
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            duplicateContent();
            setupAnimation();
        }, 120);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona a seção que você quer observar
    const creditsSection = document.querySelector('.container-part4');

    // Seleciona o elemento que será animado
    const creditsInner = document.querySelector('.credits-inner');

    // Opções para o Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    };

    // Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            // Verifica se a seção está visível
            if (entry.isIntersecting) {

                // Adiciona a classe para iniciar a animação
                creditsInner.classList.add('start-animation');

                // Observação depois de iniciar a animação uma vez
                observer.unobserve(creditsSection);
            }
        });
    }, options);

    // Começa a observar a seção de créditos
    if (creditsSection) {
        observer.observe(creditsSection);
    }
});


// NAVEGAÇÃO ENTRE SEÇÕES
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const target = document.getElementById(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            document.querySelectorAll('.fade-section').forEach(sec => {
                sec.classList.remove('fade-in');
            });

            target.classList.add('fade-in');

            setTimeout(() => {
                target.classList.remove('fade-in');
            }, 800);
        }
    });
});
