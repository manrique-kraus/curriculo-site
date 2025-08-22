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
document.addEventListener('DOMContentLoaded', function() {
    createFallingStars();
    addNewStars();
});

// Função para alternar entre pasta e documento
const btn = document.getElementById("toggleDoc");
  const folder = document.getElementById("folder");
  const doc = document.getElementById("document");

  btn.addEventListener("click", () => {
    folder.classList.add("hidden");   // esconde a pasta
    doc.classList.remove("hidden");   // mostra o documento
  });

// Função para mostrar o documento e esconder o botão "VER DOCUMENTO"

const toggleDocButton = document.getElementById('toggleDoc');
const destroyButton = document.getElementById('destroy-button');
const documentSection = document.getElementById('document');

toggleDocButton.addEventListener('click', () => {
    // Mostra a segunda tela
    documentSection.classList.remove('hidden');
    
    // Esconde o botão "VER DOCUMENTO"
    toggleDocButton.style.display = 'none';
    
    // Mostra o botão "DESTRUIR"
    destroyButton.style.display = 'inline-block';
});

  