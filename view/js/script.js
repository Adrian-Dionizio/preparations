fetch('include/templates.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    document.getElementById('header').innerHTML = doc.getElementById('header-template').innerHTML;
    //document.getElementById('menu').innerHTML = doc.getElementById('menu-template').innerHTML;
    document.getElementById('footer').innerHTML = doc.getElementById('footer-template').innerHTML;
  });
    
// Função para detectar primeira vez que usuário abriu a página
// Função para mostrar mensagem de início uma vez só
// Função para mostrar mensagem de início uma vez só
function mostrarMensagemInicio() {
  if (!localStorage.getItem('jaVisitou')) {
    alert('Bem-vindo! Iniciando aplicação...');
    localStorage.setItem('jaVisitou', 'true');
  }
}

// Função para carregar lista de arquivos de um JSON e popular o select
async function carregarPreparations() {
  try {
    const resposta = await fetch('../arquivos/preparations.json');
    if (!resposta.ok) throw new Error('Erro ao carregar a lista.');

    const arquivos = await resposta.json();

    const select = document.getElementById('select');
    select.innerHTML = '<option value="">minhas preparations</option>';

    arquivos.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });

  } catch (err) {
    console.error(err);
    const select = document.getElementById('select');
    select.innerHTML = '<option value="">Erro ao carregar lista</option>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  mostrarMensagemInicio();
  carregarPreparations();
});
