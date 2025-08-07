// **Cole aqui a URL do seu Google Apps Script que você copiou!**
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyuZH-cn7dq7WJlF64xTSw84MwyGyvUHZNAwFkZBzcVr84kpIAfNJlH5ypsDeTd94nJ8A/exec'; 

document.addEventListener('DOMContentLoaded', () => {
    const checkinForm = document.getElementById('checkinForm');
    const nomeCompletoInput = document.getElementById('nomeCompleto');
    const mensagemStatus = document.getElementById('mensagemStatus');

    // Foca no campo de texto ao carregar a página
    if (nomeCompletoInput) {
        nomeCompletoInput.focus();
    }

    if (checkinForm) {
        checkinForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const nome = nomeCompletoInput.value.trim();

            if (!nome) {
                mensagemStatus.textContent = "Por favor, digite seu nome completo.";
                mensagemStatus.style.color = 'red';
                return;
            }

            mensagemStatus.textContent = "Enviando...";
            mensagemStatus.style.color = 'orange';

            try {
                const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Necessário para a comunicação com o Apps Script de um front-end estático
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `nome=${encodeURIComponent(nome)}`
                });

                // Como usamos 'no-cors', não conseguimos ler a resposta diretamente,
                // mas se não houver erro de rede, presumimos sucesso.
                // Em um ambiente de produção mais robusto, você poderia ter um proxy.

                mensagemStatus.textContent = "Chegada registrada com sucesso!";
                mensagemStatus.style.color = 'green';
                nomeCompletoInput.value = ''; // Limpa o campo

                // Volta para a tela inicial após um pequeno atraso
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000); // 2 segundos
                
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
                mensagemStatus.textContent = "Ocorreu um erro ao registrar sua chegada. Tente novamente.";
                mensagemStatus.style.color = 'red';
            }
        });
    }
});
