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
            idadeValor: "24 Anos",
            formacaoValor: "Engenharia Mecatrônica",
            inglesValor: "Colocar",
            skillsValor: "Bla Bla Bla Bla"
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
            typewriter: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nesciunt consectetur deleniti debitis dolorem doloribus reiciendis architecto recusandae? Autem voluptatibus fugit nobis, sapiente quae porro repudiandae debitis quia asperiores mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero illo officia facere laborum ipsum alias officiis beatae saepe pariatur consectetur voluptate quas, deleniti eaque, exercitationem.",
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
            idadeValor: "24 Years Old",
            formacaoValor: "Mechatronic Engineering",
            inglesValor: "To place",
            skillsValor: "Bla Bla Bla Bla"
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
            typewriter: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nesciunt consectetur deleniti debitis dolorem doloribus reiciendis architecto recusandae? Autem voluptatibus fugit nobis, sapiente quae porro repudiandae debitis quia asperiores mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero illo officia facere laborum ipsum alias officiis beatae saepe pariatur consectetur voluptate quas, deleniti eaque, exercitationem.",
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

window.updateTexts = function() {
    // Title
    document.title = window.translations[window.currentLanguage].title;

    // Nav
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === 'home') link.textContent = window.translations[window.currentLanguage].nav.inicio;
        else if (section === 'sobre') link.textContent = window.translations[window.currentLanguage].nav.sobre;
        else if (section === 'experiência') link.textContent = window.translations[window.currentLanguage].nav.experiencia;
        else if (section === 'contato') link.textContent = window.translations[window.currentLanguage].nav.contato;
    });

    // Home
    const pixelTitle = document.querySelector('.pixel-title');
    if (pixelTitle) pixelTitle.textContent = window.translations[window.currentLanguage].home.title;
    const btnStart = document.getElementById('btn-start');
    if (btnStart) btnStart.textContent = window.translations[window.currentLanguage].home.iniciar;
    const btnExit = document.getElementById('btn-exit');
    if (btnExit) btnExit.textContent = window.translations[window.currentLanguage].home.sair;

    // Part1
    const questions = document.querySelectorAll('.question h2');
    if (questions.length >= 4) {
        questions[0].textContent = window.translations[window.currentLanguage].part1.idade;
        questions[1].textContent = window.translations[window.currentLanguage].part1.formacao;
        questions[2].textContent = window.translations[window.currentLanguage].part1.ingles;
        questions[3].textContent = window.translations[window.currentLanguage].part1.skills;
    }
    const responses = document.querySelectorAll('.response h2');
    if (responses.length >= 4) {
        responses[0].textContent = window.translations[window.currentLanguage].part1.idadeValor;
        responses[1].textContent = window.translations[window.currentLanguage].part1.formacaoValor;
        responses[2].textContent = window.translations[window.currentLanguage].part1.inglesValor;
        responses[3].textContent = window.translations[window.currentLanguage].part1.skillsValor;
    }

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
