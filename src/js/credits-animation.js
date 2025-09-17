document.addEventListener("DOMContentLoaded", () => {
    const credits = document.querySelector('.credits');
    if (!credits) return;

    const contents = Array.from(credits.querySelectorAll('.content'));
    if (contents.length === 0) return;

    const containerHeight = credits.clientHeight;

    // Inicializar posições verticais para cada conteúdo
    const positions = contents.map((_, i) => -contents[i].offsetHeight * i);

    function animate() {
        contents.forEach((content, index) => {
            positions[index] += 1; // velocidade de descida (px por frame)
            if (positions[index] > containerHeight) {
                // reposiciona instantaneamente para o topo sem animação
                positions[index] = -content.offsetHeight;
            }
            content.style.transform = `translateY(${positions[index]}px)`;
            content.style.transition = 'none'; // remove transição para reposição instantânea
        });
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
