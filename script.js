async function enviarFormulario(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const url = 'https://script.google.com/macros/s/AKfycbzoEj-dg4pdZhhQUXVIatktaAAh5bMMt_li0QUvbSm3b0aPcaSCDF8Lt0v0MnGgR3n5Dg/exec';

  try {
    const resposta = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ nome }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const texto = await resposta.text();
    if (resposta.ok) {
      window.location.href = 'index.html';
    } else {
      alert('Erro do servidor: ' + texto);
    }

  } catch (e) {
    alert('Erro ao conectar: ' + e.message);
  }
}

