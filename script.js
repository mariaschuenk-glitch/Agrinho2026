document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIONALIDADE: ACCORDION ---
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Alterna o estado atual
            header.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded;
            header.querySelector('.icon').textContent = isExpanded ? '+' : '−';
        });
    });

    // --- FUNCIONALIDADE: ACESSIBILIDADE (FONTE E TEMA) ---
    let tamanhoAtualFonte = 100;
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');
    const btnTema = document.getElementById('btn-tema');

    btnAumentar.addEventListener('click', () => {
        if(tamanhoAtualFonte < 140) {
            tamanhoAtualFonte += 10;
            document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
        }
    });

    document.getElementById('btn-diminuir-fonte').addEventListener('click', () => {
        if(tamanhoAtualFonte > 80) {
            tamanhoAtualFonte -= 10;
            document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
        }
    });

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // --- FUNCIONALIDADE: LEITURA POR VOZ (SpeechSynthesis API) ---
    const btnFalar = document.getElementById('btn-falar');
    const btnParar = document.getElementById('btn-parar');
    let sotaqueBr = null;

    // Carrega vozes de maneira assíncrona para suporte cross-browser
    function carregarVozes() {
        const vozes = window.speechSynthesis.getVoices();
        sotaqueBr = vozes.find(voz => voz.lang === 'pt-BR' || voz.lang.includes('pt'));
    }
    carregarVozes();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = carregarVozes;
    }

    btnFalar.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Cancela leituras anteriores ativas
        
        const containerPrincipal = document.getElementById('conteudo-principal');
        // Filtra para ler text content limpo da página principal
        const textoParaLer = containerPrincipal.innerText;

        const utterance = new SpeechSynthesisUtterance(textoParaLer);
        if (sotaqueBr) utterance.voice = sotaqueBr;
        utterance.rate = 1.1; // Velocidade natural de fala

        window.speechSynthesis.speak(utterance);
    });

    btnParar.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });

    // --- FUNCIONALIDADE: FORMULÁRIO DE INSCRIÇÃO ---
    const formInscricao = document.getElementById('cadastro-seminario');
    formInscricao.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        alert(`Parabéns, ${nome}! Sua inscrição para o seminário on-line de Nova Tebas foi realizada com sucesso.`);
        formInscricao.reset();
    });

    // --- FUNCIONALIDADE: ÁREA DE COMENTÁRIOS ---
    const formComentario = document.getElementById('form-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');

    formComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const caixaTexto = document.getElementById('texto-comentario');
        const texto = caixaTexto.value.trim();

        if (texto) {
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario-item');
            
            // Tratamento contra injeção de script estruturado de forma segura
            const paragrafo = document.createElement('p');
            paragrafo.textContent = texto;
            novoComentario.appendChild(paragrafo);
            
            // Adiciona no topo da lista
            listaComentarios.insertBefore(novoComentario, listaComentarios.firstChild);
            caixaTexto.value = '';
        }
    });
});
