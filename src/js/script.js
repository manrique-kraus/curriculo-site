document.addEventListener("DOMContentLoaded", () => {
    // DECLARAÇÕES GLOBAIS
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

    // BOTÃO FUGIR
    let state = 0;
    btnExit.classList.add('escaping');
    btnExit.style.left = '0px';

    btnExit.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
        state = (state + 1) % 4;

        if (state === 1) {
            btnExit.style.left = '-300px';
        } else if (state === 2) {
            btnExit.style.left = '0px';
        } else if (state === 3) {
            btnExit.style.left = '300px';
        } else {
            btnExit.style.left = '0px';
        }
    });

    // BOTÃO INICIAR
    btnStart.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

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
        loadingText.innerText = 'CARREGANDO...';
        loadingText.style.color = '#000';
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

            // ESCONDE A TELA INICIAL
            homeSection.style.display = 'none';
            starsContainer.style.display = 'none';

            // ANIMAÇÃO AO APARECER LANDING PAGE
            containerPart1.classList.add('show');
            
            // PERMITE SCROLL APÓS ANIMAÇÃO
            document.querySelector('.screen').style.overflowY = 'auto';
            
        }, 1600);
    });

    // LÓGICA DE NAVEGAÇÃO
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            clickSound.currentTime = 0;
            clickSound.play();

            const targetSection = link.getAttribute('data-section');

            if (targetSection === 'home') {
                const curriculoSection = document.getElementById('curriculo-section');
                curriculoSection.classList.remove('active');
                starsContainer.style.display = 'block';

                document.querySelector('.screen').style.overflowY = 'hidden';

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

    // ADICIONAR NOVAS ESTRELAS PERIODICAMENTE
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
    }, { threshold: 0.2 });
    folderObserver.observe(folder);

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
        let originalText = typewriterText.innerHTML
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/\s+/g, " ");

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
            message.textContent = 'nunca teve nada aqui';
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

    // ANIMAÇÃO DOS CARDS CONTAINER 3
    const jobs = document.querySelectorAll('.job');
    const jobObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (index % 2 === 0) {
                    entry.target.style.transform = 'translateX(-100%)';
                    entry.target.classList.add('slide-in-left');
                } else {
                    entry.target.style.transform = 'translateX(100%)';
                    entry.target.classList.add('slide-in-right');
                }
                jobObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

    jobs.forEach(job => {
        jobObserver.observe(job);
    });
});

// SCROLAR ENTRE ABAS
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const section = this.getAttribute('data-section');
    let targetId = '';

    if (section === 'home') targetId = 'container-part1';
    if (section === 'curriculo') targetId = 'container-part2';

    if (targetId) {
      const targetElement = document.getElementById(targetId);

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start' 
      });
    }
  });
});

// FUNÇÃO TV LIGANDO
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

    // Duplica o conteúdo para criar um loop perfeito
    function duplicateContent() {
        const originals = Array.from(creditsInner.children);
        // Remove cópias antigas para evitar bagunça
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
        // Pega a altura do primeiro item (o mais confiável)
        const firstItemHeight = creditsInner.firstElementChild.offsetHeight + 60; // 60px é a margem top e bottom
        
        // A distância total para a animação
        const animationDistance = firstItemHeight * (creditsInner.children.length / 2);
        
        creditsInner.style.setProperty('--scroll-distance', `-${animationDistance}px`);
        
        // Ajusta a duração com base na distância
        const pxPerSecond = 50;
        const durationSec = Math.max(6, animationDistance / pxPerSecond);
        creditsInner.style.setProperty('--duration', `${durationSec}s`);
    }

    // Executa as funções
    duplicateContent();
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
        root: null, // O viewport (área visível do navegador) é o observador
        rootMargin: '0px', // Nenhuma margem extra
        threshold: 0.01 // A animação começa quando 50% da seção está visível
    };

    // Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Verifica se a seção está visível
            if (entry.isIntersecting) {
                // Adiciona a classe para iniciar a animação
                creditsInner.classList.add('start-animation');
                
                // Opcional: para a observação depois de iniciar a animação uma vez
                observer.unobserve(creditsSection);
            }
        });
    }, options);

    // Começa a observar a seção de créditos
    if (creditsSection) {
        observer.observe(creditsSection);
    }
});

