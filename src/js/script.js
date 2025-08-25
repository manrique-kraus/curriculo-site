document.addEventListener("DOMContentLoaded", () => {
    // Declarações de constantes e variáveis no escopo global do DCL
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
    
    // A constante 'sound' foi removida porque não será mais usada.

    const clickSound = new Audio('src/files/sound-click-button.wav');
    clickSound.volume = 0.4;
    
    // A linha que definia o volume do som de digitação foi removida.

    // Lógica do botão de 'escapar'
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

    // Lógica do botão de 'iniciar'
    btnStart.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

        // Fade-out da tela inicial
        homeSection.style.transition = "opacity 0.5s ease-out";
        homeSection.style.opacity = 0;

        // Criar overlay preto para fundo inteiro
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#0f0f1e';
        overlay.style.zIndex = '50';
        document.querySelector('.screen').appendChild(overlay);

        // Barra de carregamento pixel
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
        loadingText.innerText = 'Carregando...';
        loadingContainer.appendChild(loadingText);
        document.querySelector('.screen').appendChild(loadingContainer);

        // Delay de carregamento
        setTimeout(() => {
            loadingProgress.style.transition = 'width 0.5s ease-in-out';
            loadingProgress.style.width = '100%';
        }, 50);

        // Após animação de carregamento
        setTimeout(() => {
            overlay.remove();
            loadingContainer.remove();

            // Esconde a tela inicial e as estrelas
            homeSection.style.display = 'none';
            starsContainer.style.display = 'none';

            // Mostra a landing page com animação de cima pra baixo
            containerPart1.classList.add('show');
            
            // Permitir rolagem
            document.querySelector('.screen').style.overflowY = 'auto';
            
        }, 1600);
    });

    // Lógica de navegação
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

    // Função para criar estrelas caindo
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

    // Função para adicionar novas estrelas periodicamente
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

    // Inicializar estrelas
    createFallingStars();
    addNewStars();

    // Lógica para a pasta fechada aparecer no scroll
    const folderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                folder.classList.add("show");
                folderObserver.unobserve(folder);
            }
        });
    }, { threshold: 0.2 });
    folderObserver.observe(folder);

    // Lógica para abrir o documento
    toggleBtn.addEventListener('click', () => {
        folder.classList.add('hidden');
        documentOpen.classList.remove('hidden');
        toggleBtn.style.display = 'none';
        destroyBtn.style.display = 'inline-block';
        setTimeout(() => documentOpen.classList.add('show'), 50);
        startTypewriterEffect();
    });

    // Lógica para o efeito de digitação (unificado sem som)
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

            // Esta parte que reproduzia o som foi removida.

            i++;
            if (i >= originalText.length) {
                clearInterval(interval);
            }
        }, speed);
    }
    
    // 🕳️ Lógica para destruir o documento com buraco negro
    destroyBtn.addEventListener("click", () => {
        const title = document.querySelector(".container-part2 .title"); 

        if (title) title.style.display = "none";
        destroyBtn.style.display = "none";

        documentOpen.classList.add("black-hole");

        setTimeout(() => {
            documentOpen.remove();
            containerPart2.classList.add("black-hole-trail");
            
            setTimeout(() => {
                containerPart2.classList.remove("black-hole-trail");
            }, 800);
        }, 2000); 
    });
});