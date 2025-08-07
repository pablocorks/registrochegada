async function enviarFormulario(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const url = 'https://script.google.com/macros/s/AKfycbzoEj-dg4pdZhhQUXVIatktaAAh5bMMt_li0QUvbSm3b0aPcaSCDF8Lt0v0MnGgR3n5Dg/exec';

  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ nome }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.href = 'index.html';
  } catch (e) {
    alert('Erro ao registrar chegada');
  }
}
