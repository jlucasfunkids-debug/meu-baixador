async function buscarDownload() {
    const urlInput = document.getElementById('urlVideo').value;
    const resultadoDiv = document.getElementById('resultado');
    
    if (!urlInput) {
        alert('Por favor, insira uma URL!');
        return;
    }

    resultadoDiv.innerHTML = "Buscando streams de mídia... aguarde.";

    // Nova URL utilizando um serviço de conversão estático público via iframe/link dinâmico
    try {
        // Formata a URL padrão para extrair o ID do vídeo do YouTube
        let videoId = "";
        if (urlInput.includes("youtu.be/")) {
            videoId = urlInput.split("youtu.be/")[1].split("?")[0];
        } else if (urlInput.includes("watch?v=")) {
            videoId = urlInput.split("watch?v=")[1].split("&")[0];
        } else if (urlInput.includes("shorts/")) {
            videoId = urlInput.split("shorts/")[1].split("?")[0];
        }

        if (videoId) {
            // Em vez de um fetch direto que dá erro de conexão, geramos um widget de download direto integrado
            resultadoDiv.innerHTML = `
                <p>Vídeo encontrado! Use o botão oficial abaixo para processar:</p>
                <iframe src="https://tw0save.com{videoId}" 
                        width="100%" height="150px" style="border:none; border-radius:8px; background:#fff;">
                </iframe>`;
        } else {
            resultadoDiv.innerHTML = "Não foi possível identificar o ID do vídeo. Verifique se o link está correto.";
        }
    } catch (erro) {
        resultadoDiv.innerHTML = "Erro ao processar o link do YouTube. Tente novamente.";
    }
}
