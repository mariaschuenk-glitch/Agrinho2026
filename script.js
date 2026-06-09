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
Use o código com cuidado.README.mdmarkdown# Agro Forte, Futuro Sustentável - Nova Tebas

## Tema da Página
O tema central do projeto é **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**, focado no panorama econômico e de sustentabilidade no município de Nova Tebas, localizado na região Central do Paraná.

## Objetivo da Página
Apresentar de maneira profissional, acessível e totalmente responsiva a força do agronegócio de Nova Tebas, destacando o papel fundamental da agricultura familiar (que compõe 85% das propriedades locais). A página visa informar o leitor sobre as cadeias produtivas (leite, grãos, pecuária, orgânicos) e promover engajamento através de inscrições em seminários e áreas de debate interativo.

## Instruções de Uso
1. **Instalação**: Salve os três códigos fornecidos (`index.html`, `style.css` e `script.js`) no mesmo diretório local de seu computador.
2. **Imagens**: Para que as imagens carreguem perfeitamente no design premium, salve 3 fotos de sua escolha na mesma pasta utilizando exatamente os nomes:
   * `Foto1.png`
   * `Foto2.png`
   * `Foto3.png`
3. **Execução**: Dê um duplo clique no arquivo `index.html` para abri-lo em qualquer navegador web moderno.
4. **Recursos de Acessibilidade**: Utilize os botões flutuantes para aumen