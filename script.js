// Função para remover os itens, neste caso, que contêm "BairesDev"
function removerItens() {
    // Seleciona todos os elementos de vagas
    let vacancies = document.querySelectorAll('.js_vacancyLoad');

    // Itera sobre todos os elementos de vagas
    vacancies.forEach(vacancy => {
        // Verifica se o elemento contém um link para a BairesDev, para encontrar o href, procure no html da página
        let isTarget = vacancy.querySelector('a[href="https://www.infojobs.com.br/empresa-bairesdev__-62029.aspx"]'); 
        
        // Se contiver, remove o elemento do DOM
        if (isTarget) {
            vacancy.remove();
        }
    });

    //console.log('Itens removidos.');
}

// Função para adicionar event listeners aos links de paginação
function adicionarEventListeners() {
    // Seleciona todos os links de paginação
    let pageLinks = document.querySelectorAll('.page-link');

    pageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Usa MutationObserver para detectar mudanças no DOM após a navegação
            let observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Quando novos itens são adicionados, executa o script
                        removerItens();
                        // Desconecta o observer após a execução
                        observer.disconnect();
                    }
                });
            });

            // Configura o observer para observar mudanças no body
            observer.observe(document.body, { childList: true, subtree: true });
        });
    });
}

// Inicializa a primeira execução do script e adiciona os event listeners
removerItens();
adicionarEventListeners();
