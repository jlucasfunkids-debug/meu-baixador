async function buscarDownload() {
    const url = document.getElementById('urlVideo').value;
    const resultadoDiv = document.getElementById('resultado');
    
    if (!url) {
        alert('Por favor, insira uma URL!');
        return;
    }

    resultadoDiv.innerHTML = "Processando... por favor, aguarde.";

    // API pública e gratuita de conversão (Exemplo funcional de terceiros)
    const apiUrl = `https://mp3.net{encodeURIComponent(url)}`;

    try {
        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();

        if (dados.downloadUrl) {
            resultadoDiv.innerHTML = `<a href="${dados.downloadUrl}" target="_blank" download>Clique aqui para baixar o vídeo</a>`;
        } else {
            resultadoDiv.innerHTML = "Não foi possível gerar o link. Tente outro vídeo.";
        }
    } catch (erro) {
        resultadoDiv.innerHTML = "Erro ao conectar com o servidor de download.";
    }
}
