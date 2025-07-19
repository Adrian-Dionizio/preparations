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
    const resposta = await fetch('/api/preparations');
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

  const select = document.getElementById('select');
  select.addEventListener('change', async function() {
    const infoDiv = document.getElementById('preparation-info');
    const contentDiv = document.getElementById('preparation-content');
    if (this.value) {
      infoDiv.textContent = `Arquivo selecionado: ${this.value}`;
      // Verifica extensão
      const ext = this.value.split('.').pop().toLowerCase();
      if (['txt', 'json', 'csv', 'md'].includes(ext)) {
        try {
          const resp = await fetch(`/arquivos/${this.value}`);
          if (!resp.ok) throw new Error('Erro ao ler o arquivo.');
          const text = await resp.text();
          contentDiv.style.display = 'block';
          contentDiv.innerText = text;
        } catch (e) {
          contentDiv.style.display = 'block';
          contentDiv.innerText = 'Erro ao carregar o conteúdo.';
        }
      } else if (ext === 'pdf') {
        contentDiv.style.display = 'block';
        contentDiv.innerHTML = `<iframe src="/arquivos/${this.value}" width="100%" height="500px" style="border:none;"></iframe>`;
      } else {
        contentDiv.style.display = 'block';
        contentDiv.innerText = 'Visualização não suportada para este tipo de arquivo.';
      }
    } else {
      infoDiv.textContent = 'Selecione uma preparation para ver o nome aqui.';
      contentDiv.style.display = 'none';
      contentDiv.innerHTML = '';
    }
  });
});
