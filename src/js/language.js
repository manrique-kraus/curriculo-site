// IDIOMA
window.currentLanguage = 'pt';

window.translations = {
    pt: {
        title: "Currículo Manrique",
        nav: {
            inicio: "Início",
            sobre: "Sobre",
            experiencia: "Experiência",
            contato: "Contato"
        },
        home: {
            title: "Currículo Manrique",
            iniciar: "Iniciar",
            sair: "Sair"
        },
        part1: {
            idade: "Idade:",
            formacao: "Formação:",
            ingles: "Inglês:",
            skills: "Skills:",
            idadeValor: "25 Anos",
            formacaoValor: "Engenharia Mecatrônica",
            inglesValor: "Intermediário",
            skillsValor: "Criatividade e adaptabilidade"
        },
        part2: {
            title: "SOBRE",
            confidential: "INFORMAÇÃO CONFIDENCIAL",
            secret: "SECRETO",
            destroyAfter: "DESTRUA APÓS A LEITURA",
            onlyYou: "APENAS VOCÊ PODE LER",
            hour: "HORA:",
            local: "LOCAL:",
            signature: "ASSINATURA:",
            originalDoc: "DOCUMENTO ORIGINAL",
            typewriter: "Com uma paixão por tecnologia que vem da infância, Manrique investiu na sua formação acadêmica na área. Apesar de ainda não ter atuado profissionalmente na área, ele está focado em conseguir sua primeira oportunidade para colocar em prática seus conhecimentos. Sempre antenado com as inovações do mercado e do mundo dos jogos, ele demonstra um interesse genuíno e contínuo por tudo que envolve tecnologia.",
            destroy: "DESTRUIR",
            nothingHere: "nunca teve nada aqui",
            viewDocument: "VER DOCUMENTO"
        },
        part3: {
            title: "EXPERIÊNCIA",
            ano: "Ano",
            cargo: "Cargo",
            funcoes: "Funções Exercidas",
            setran: "Setran - Secretaria de Trânsito e Transporte de Guarapuava",
            setranAno: "2022 (160 horas)",
            setranCargo: "Estagiário",
            setranFuncoes: "Análise de dados de acidentes no Power BI, projeto de um site para arquivar os acidentes na cidade, aprendizado do funcionamento de semáforos, código para converter a localização de latitude/longitude para endereço (python) e acompanhamento da instalação de lombadas eletrônicas.",
            surg: "Surg - Companhia de Serviços de Urbanização de Guarapuava",
            surgAno: "2023 - 2025",
            surgCargo: "Estagiário",
            surgFuncoes: "Criação e gerenciamento de planilhas de serviços, elaboração de desenhos de placas em software especializado e operação de máquina de corte de películas para produção de placas."
        },
        part4: {
            contact: "Entrar em Contato",
            credits: "Créditos",
            desenvolvimento: "Desenvolvimento",
            gerenciamento: "Gerenciamento",
            controleQualidade: "Controle de Qualidade",
            design: "Design",
            agradecimentos: "Agradecimentos Especiais",
            name: "Manrique Kraus"
        },
        loading: "CARREGANDO..."
    },
    en: {
        title: "Manrique's Resume",
        nav: {
            inicio: "Home",
            sobre: "About",
            experiencia: "Experience",
            contato: "Contact"
        },
        home: {
            title: "Manrique's Resume",
            iniciar: "Start",
            sair: "Exit"
        },
        part1: {
            idade: "Age:",
            formacao: "Education:",
            ingles: "English:",
            skills: "Skills:",
            idadeValor: "25 Years Old",
            formacaoValor: "Mechatronic Engineering",
            inglesValor: "Intermediate",
            skillsValor: "Creativity and adaptability"
        },
        part2: {
            title: "ABOUT",
            confidential: "CONFIDENTIAL INFORMATION",
            secret: "SECRET",
            destroyAfter: "DESTROY AFTER READING",
            onlyYou: "ONLY YOU CAN READ",
            hour: "TIME:",
            local: "LOCATION:",
            signature: "SIGNATURE:",
            originalDoc: "ORIGINAL DOCUMENT",
            typewriter: "With a passion for technology since childhood, Manrique invested in an academic education in the field. Although he has not yet worked professionally in the area, he is focused on getting his first opportunity to put his knowledge into practice. Always up-to-date with market and gaming world innovations, he demonstrates a genuine and continuous interest in everything involving technology.",
            destroy: "DESTROY",
            nothingHere: "there was never anything here",
            viewDocument: "VIEW DOCUMENT"
        },
        part3: {
            title: "EXPERIENCE",
            ano: "Year",
            cargo: "Position",
            funcoes: "Duties Performed",
            setran: "Setran - Traffic and Transportation Secretariat of Guarapuava",
            setranAno: "2022 (160 hours)",
            setranCargo: "Intern",
            setranFuncoes: "Data analysis of accidents in Power BI, project of a website to archive city accidents, learning about traffic light operation, code to convert latitude/longitude location to address (python) and monitoring the installation of electronic speed bumps.",
            surg: "Surg - Urban Services Company of Guarapuava",
            surgAno: "2023 - 2025",
            surgCargo: "Intern",
            surgFuncoes: "Creation and management of service spreadsheets, elaboration of plate drawings in specialized software and operation of a film cutting machine for plate production."
        },
        part4: {
            contact: "Get in Touch",
            credits: "Credits",
            desenvolvimento: "Development",
            gerenciamento: "Management",
            controleQualidade: "Quality Control",
            design: "Design",
            agradecimentos: "Special Thanks",
            name: "Manrique Kraus"
        },
        loading: "LOADING..."
    }
};

window.updateTexts = function () {
    // Titulo
    document.title = window.translations[window.currentLanguage].title;

    // Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === 'home') link.textContent = window.translations[window.currentLanguage].nav.inicio;
        else if (section === 'sobre') link.textContent = window.translations[window.currentLanguage].nav.sobre;
        else if (section === 'experiência') link.textContent = window.translations[window.currentLanguage].nav.experiencia;
        else if (section === 'contato') link.textContent = window.translations[window.currentLanguage].nav.contato;
    });

    // Inicio
    const pixelTitle = document.querySelector('.pixel-title');
    if (pixelTitle) pixelTitle.textContent = window.translations[window.currentLanguage].home.title;
    const btnStart = document.getElementById('btn-start');
    if (btnStart) btnStart.textContent = window.translations[window.currentLanguage].home.iniciar;
    const btnExit = document.getElementById('btn-exit');
    if (btnExit) btnExit.textContent = window.translations[window.currentLanguage].home.sair;

    // Part1 Desktop
    const desktopQuestions = document.querySelectorAll('.container-about .question h2');
    if (desktopQuestions.length >= 4) {
        desktopQuestions[0].textContent = window.translations[window.currentLanguage].part1.idade;
        desktopQuestions[1].textContent = window.translations[window.currentLanguage].part1.formacao;
        desktopQuestions[2].textContent = window.translations[window.currentLanguage].part1.ingles;
        desktopQuestions[3].textContent = window.translations[window.currentLanguage].part1.skills;
    }
    const desktopResponses = document.querySelectorAll('.container-about .response h2');
    if (desktopResponses.length >= 4) {
        desktopResponses[0].textContent = window.translations[window.currentLanguage].part1.idadeValor;
        desktopResponses[1].textContent = window.translations[window.currentLanguage].part1.formacaoValor;
        desktopResponses[2].textContent = window.translations[window.currentLanguage].part1.inglesValor;
        desktopResponses[3].textContent = window.translations[window.currentLanguage].part1.skillsValor;
    }

    // Part1 Mobile - Specific selectors to avoid indexing issues
    const mobileIdadeLabel = document.querySelector('.container-about-mobile .question:nth-of-type(1) h2');
    if (mobileIdadeLabel) mobileIdadeLabel.textContent = window.translations[window.currentLanguage].part1.idade;
    const mobileFormacaoLabel = document.querySelector('.container-about-mobile .question:nth-of-type(2) h2');
    if (mobileFormacaoLabel) mobileFormacaoLabel.textContent = window.translations[window.currentLanguage].part1.formacao;
    const mobileInglesLabel = document.querySelector('.container-about-mobile .question:nth-of-type(3) h2');
    if (mobileInglesLabel) mobileInglesLabel.textContent = window.translations[window.currentLanguage].part1.ingles;
    const mobileSkillsLabel = document.querySelector('.container-about-mobile .question:nth-of-type(4) h2');
    if (mobileSkillsLabel) mobileSkillsLabel.textContent = window.translations[window.currentLanguage].part1.skills;

    const mobileIdadeValue = document.querySelector('.container-about-mobile .question:nth-of-type(1) .response h2');
    if (mobileIdadeValue) mobileIdadeValue.textContent = window.translations[window.currentLanguage].part1.idadeValor;
    const mobileFormacaoValue = document.querySelector('.container-about-mobile .question:nth-of-type(2) .response h2');
    if (mobileFormacaoValue) mobileFormacaoValue.textContent = window.translations[window.currentLanguage].part1.formacaoValor;
    const mobileInglesValue = document.querySelector('.container-about-mobile .question:nth-of-type(3) .response h2');
    if (mobileInglesValue) mobileInglesValue.textContent = window.translations[window.currentLanguage].part1.inglesValor;
    const mobileSkillsValue = document.querySelector('.container-about-mobile .question:nth-of-type(4) .response h2');
    if (mobileSkillsValue) mobileSkillsValue.textContent = window.translations[window.currentLanguage].part1.skillsValor;

    // Part2
    const part2Title = document.querySelector('.container-part2 .title');
    if (part2Title) part2Title.textContent = window.translations[window.currentLanguage].part2.title;
    const confidential = document.querySelector('.confidential-folder h1');
    if (confidential) confidential.textContent = window.translations[window.currentLanguage].part2.confidential;
    const stamps = document.querySelectorAll('.stamp');
    if (stamps.length >= 3) {
        stamps[0].textContent = window.translations[window.currentLanguage].part2.secret;
        stamps[1].textContent = window.translations[window.currentLanguage].part2.destroyAfter;
        stamps[2].textContent = window.translations[window.currentLanguage].part2.onlyYou;
    }
    const docBoxSpans = document.querySelectorAll('.document-box span');
    if (docBoxSpans.length >= 3) {
        docBoxSpans[0].textContent = window.translations[window.currentLanguage].part2.hour;
        docBoxSpans[1].textContent = window.translations[window.currentLanguage].part2.local;
        docBoxSpans[2].textContent = window.translations[window.currentLanguage].part2.signature;
    }
    const originalDoc = document.querySelector('.original-docs h2');
    if (originalDoc) originalDoc.textContent = window.translations[window.currentLanguage].part2.originalDoc;
    const destroyBtnSpan = document.querySelector("#destroy-button span");
    if (destroyBtnSpan) destroyBtnSpan.textContent = window.translations[window.currentLanguage].part2.destroy;
    const toggleDocBtn = document.getElementById('toggleDoc');
    if (toggleDocBtn && toggleDocBtn.lastChild.nodeType === Node.TEXT_NODE) {
        toggleDocBtn.lastChild.textContent = window.translations[window.currentLanguage].part2.viewDocument;
    }

    // Update typewriter text if document is open
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText && typewriterText.style.visibility === 'visible') {
        typewriterText.textContent = window.translations[window.currentLanguage].part2.typewriter;
    }

    // Part3
    const part3Title = document.querySelector('.container-part3 .title');
    if (part3Title) part3Title.textContent = window.translations[window.currentLanguage].part3.title;
    const jobStrong = document.querySelectorAll('.job p strong');
    if (jobStrong.length >= 3) {
        jobStrong[0].textContent = window.translations[window.currentLanguage].part3.ano + ':';
        jobStrong[1].textContent = window.translations[window.currentLanguage].part3.cargo + ':';
        jobStrong[2].textContent = window.translations[window.currentLanguage].part3.funcoes + ':';
    }
    const jobH2 = document.querySelectorAll('.job h2');
    if (jobH2.length >= 2) {
        jobH2[0].textContent = window.translations[window.currentLanguage].part3.setran;
        jobH2[1].textContent = window.translations[window.currentLanguage].part3.surg;
    }
    const jobP = document.querySelectorAll('.job p');
    if (jobP.length >= 6) {
        jobP[0].textContent = window.translations[window.currentLanguage].part3.ano + ': ' + window.translations[window.currentLanguage].part3.setranAno;
        jobP[1].textContent = window.translations[window.currentLanguage].part3.cargo + ': ' + window.translations[window.currentLanguage].part3.setranCargo;
        jobP[2].textContent = window.translations[window.currentLanguage].part3.funcoes + ': ' + window.translations[window.currentLanguage].part3.setranFuncoes;
        jobP[3].textContent = window.translations[window.currentLanguage].part3.ano + ': ' + window.translations[window.currentLanguage].part3.surgAno;
        jobP[4].textContent = window.translations[window.currentLanguage].part3.cargo + ': ' + window.translations[window.currentLanguage].part3.surgCargo;
        jobP[5].textContent = window.translations[window.currentLanguage].part3.funcoes + ': ' + window.translations[window.currentLanguage].part3.surgFuncoes;
    }

    // Part4
    const contactHeader = document.querySelector('.contact-header h2');
    if (contactHeader) contactHeader.textContent = window.translations[window.currentLanguage].part4.contact;
    const creditsH2 = document.querySelectorAll('.credits-text h2');
    if (creditsH2.length >= 1) creditsH2[0].textContent = window.translations[window.currentLanguage].part4.credits;
    const creditsH3 = document.querySelectorAll('.credits-text h3');
    if (creditsH3.length >= 5) {
        creditsH3[0].textContent = window.translations[window.currentLanguage].part4.desenvolvimento;
        creditsH3[1].textContent = window.translations[window.currentLanguage].part4.gerenciamento;
        creditsH3[2].textContent = window.translations[window.currentLanguage].part4.controleQualidade;
        creditsH3[3].textContent = window.translations[window.currentLanguage].part4.design;
        creditsH3[4].textContent = window.translations[window.currentLanguage].part4.agradecimentos;
    }
    const creditsP = document.querySelectorAll('.credits-text p');
    if (creditsP.length >= 5) {
        creditsP[0].textContent = window.translations[window.currentLanguage].part4.name;
        creditsP[1].textContent = window.translations[window.currentLanguage].part4.name;
        creditsP[2].textContent = window.translations[window.currentLanguage].part4.name;
        creditsP[3].textContent = window.translations[window.currentLanguage].part4.name;
        creditsP[4].textContent = window.translations[window.currentLanguage].part4.name;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.updateTexts();
});
