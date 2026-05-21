async function buscarDownload() {
    const urlInput = document.getElementById('urlVideo').value;
    const resultadoDiv = document.getElementById('resultado');
    
    if (!urlInput) {
        alert('Por favor, insira uma URL!');
        return;
    }

    resultadoDiv.innerHTML = "Processando... por favor, aguarde.";

    // API estável de terceiros (cobalt.tools pública ou similar estruturada via proxy)
    // Usando uma rota pública alternativa direta para facilitar o download sem servidor próprio
    const apiUrl = `https://wuk.sh`;

    try {
        const resposta = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: urlInput,
                vQuality: '720', // Qualidade padrão do vídeo
                isAudioOnly: false
            })
        });

        const dados = await resposta.json();

        if (dados.url) {
            resultadoDiv.innerHTML = `<a href="${dados.url}" target="_blank" rel="noopener noreferrer">Clique aqui para baixar o vídeo</a>`;
        } else if (dados.text) {
            resultadoDiv.innerHTML = `Erro do servidor: ${dados.text}`;
        } else {
            resultadoDiv.innerHTML = "Não foi possível gerar o link. Tente outro vídeo ou shorts.";
        }
    } catch (erro) {
        // Se a API principal falhar, usamos uma segunda opção (Fallback) para garantir
        const fallbackUrl = `https://allorigins.win{encodeURIComponent('https://vercel.app' + urlInput)}`;
        try {
            const respFallback = await fetch(fallbackUrl);
            const dadosFallback = await respFallback.json();
            if(dadosFallback.url) {
                resultadoDiv.innerHTML = `<a href="${dadosFallback.url}" target="_blank">Clique aqui para baixar</a>`;
                return;
            }
        } catch(e) {}
        
        resultadoDiv.innerHTML = "Erro ao conectar com o servidor. Tente novamente em instantes.";
    }
}
