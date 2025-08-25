const btnExit = document.getElementById('btn-exit');
const btnStart = document.getElementById('btn-start');

const clickSound = new Audio('src/files/sound-click-button.wav');
clickSound.volume = 0.4;

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

btnStart.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();

    // Esconder menu principal imediatamente
    const homeSection = document.getElementById('home-section');
    homeSection.style.display = 'none';

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

    // Criar barra de carregamento pixel
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

    // Animação de carregamento em segundos
    setTimeout(() => {
        loadingProgress.style.transition = 'width 0.5s ease-in-out';
        loadingProgress.style.width = '100%';
    }, 50);

    setTimeout(() => {
        loadingContainer.classList.remove('active');
        overlay.remove();

        // Esconder estrelas ao entrar na landing page
        const starsContainer = document.getElementById('stars-container');
        starsContainer.style.display = 'none';

        // Ativar rolagem na landing page
        document.querySelector('.screen').style.overflowY = 'auto';

        // Mostrar landing page
        const curriculoSection = document.getElementById('curriculo-section');
        curriculoSection.classList.add('active');
    }, 1600);
});

// Navegação entre seções
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        clickSound.currentTime = 0;
        clickSound.play();

        const targetSection = link.getAttribute('data-section');

        if (targetSection === 'home') {
            // Voltar para a tela inicial
            const curriculoSection = document.getElementById('curriculo-section');
            const homeSection = document.getElementById('home-section');
            const starsContainer = document.getElementById('stars-container');

            curriculoSection.classList.remove('active');
            starsContainer.style.display = 'block';

            // Desativar rolagem na tela inicial
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
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;

    const numberOfStars = 50;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Tamanho aleatório
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(randomSize);

        // Brilho aleatório
        if (Math.random() > 0.7) {
            star.classList.add('bright');
        }

        // Posição horizontal aleatória
        star.style.left = Math.random() * 100 + '%';

        // Atraso de animação aleatório - ajustado para começar quase imediatamente e evitar estrelas paradas no topo
        star.style.animationDelay = (Math.random() * 0.1) + 's';

        // Ajuste para posição inicial Y aleatória para evitar estrelas paradas no topo
        const initialY = -Math.random() * window.innerHeight;
        star.style.transform = `translateY(${initialY}px) rotate(0deg)`;

        // Duração da animação aleatória
        const duration = 15 + Math.random() * 15;
        star.style.animationDuration = duration + 's';

        starsContainer.appendChild(star);
    }
}

// Função para adicionar novas estrelas periodicamente
function addNewStars() {
    const starsContainer = document.getElementById('stars-container');
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

        // Remover estrela após a animação
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 30000);
    }, 500);
}

// Inicializar estrelas quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    createFallingStars();
    addNewStars();
});

// Função para mostrar o documento e esconder o botão "VER DOCUMENTO"

const toggleDocButton = document.getElementById('toggleDoc');
const destroyButton = document.getElementById('destroy-button');
const documentSection = document.getElementById('document');
const folder = document.getElementById('folder');

toggleDocButton.addEventListener('click', () => {
    // Esconde a pasta
    folder.classList.add('hidden');

    // Mostra a segunda tela
    documentSection.classList.remove('hidden');

    // Esconde o botão "VER DOCUMENTO"
    toggleDocButton.style.display = 'none';

    // Mostra o botão "DESTRUIR"
    destroyButton.style.display = 'inline-block';

    console.log("Iniciando efeito de digitação..."); // Log para depuração
    startTypewriterEffect();
});




// Função para efeito de digitação (typewriter)
function startTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;

    const originalText = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.visibility = 'visible';

    let i = 0;
    const speed = 15; // ms por letra

    const interval = setInterval(() => {
        typewriterText.textContent += originalText.charAt(i);
        i++;
        if (i >= originalText.length) {
            clearInterval(interval);
            // Remove o cursor piscando no final
            typewriterText.classList.add('typewriter-finished');
        }
    }, speed);
}


// Função para efeito de digitação (typewriter) com som
function startTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    const sound = document.getElementById('typewriter-sound');
    sound.volume = 0.01;
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

        if (char !== ' ' && char !== '\n') {
            sound.currentTime = 0;
            sound.play();
        }

        i++;
        if (i >= originalText.length) {
            clearInterval(interval);
        }
    }, speed);
}




//Função pasta fechada vindo da esquerda

document.addEventListener("DOMContentLoaded", () => {
    const folder = document.getElementById("folder");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                folder.classList.add("show");
                observer.unobserve(folder); // Para não ficar disparando toda hora
            }
        });
    }, { threshold: 0.2 }); // 20% visível já ativa a animação

    observer.observe(folder);
});



//Funçao pasta aberta
document.addEventListener("DOMContentLoaded", () => {
    const folder = document.getElementById("folder");
    const documentOpen = document.getElementById("document");
    const toggleBtn = document.getElementById("toggleDoc");

    // Animação de aparecer a pasta fechada no scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                folder.classList.add("show");
                observer.unobserve(folder);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(folder);

    // Clique no botão "VER DOCUMENTO"
    toggleBtn.addEventListener("click", () => {
        folder.classList.add("hidden");       // Esconde a pasta fechada
        documentOpen.classList.remove("hidden");

        // Timeout para deixar a transição suave
        setTimeout(() => {
            documentOpen.classList.add("show");
        }, 50);
    });
});



//Buraco negro destruir documento
document.addEventListener("DOMContentLoaded", () => {
    const folder = document.getElementById("folder");
    const documentOpen = document.getElementById("document");
    const toggleBtn = document.getElementById("toggleDoc");
    const destroyBtn = document.getElementById("destroy-button");

    // Pasta fechada aparecendo ao scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                folder.classList.add("show");
                observer.unobserve(folder);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(folder);

    // VER DOCUMENTO
    toggleBtn.addEventListener("click", () => {
        folder.classList.add("hidden");
        documentOpen.classList.remove("hidden");
        setTimeout(() => documentOpen.classList.add("show"), 50);
    });

    // 🕳️ DESTRUIR DOCUMENTO (ANIMAÇÃO BURACO NEGRO COMPLETA)
    destroyBtn.addEventListener("click", () => {
        const title = document.querySelector(".container-part2 .title"); 
        const container = document.querySelector(".container-part2"); // Pega o container pai

        // Esconde o título e o botão
        if (title) title.style.display = "none";
        destroyBtn.style.display = "none";

        // Adiciona a classe de buraco negro para iniciar a animação
        documentOpen.classList.add("black-hole");

        // Remove o documento da tela APÓS o fim da animação de sucção
        setTimeout(() => {
            documentOpen.remove();
            
            // Adiciona a classe que ativa a animação do mini buraco negro
            container.classList.add("black-hole-trail");
            
            // Remove a classe para que a animação possa ser reativada
            setTimeout(() => {
                container.classList.remove("black-hole-trail");
            }, 800); // Duração da animação do rastro (0.8s)
            
        }, 2000); // Tempo da animação principal do documento (2s)
    });

});