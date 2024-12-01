const container = document.querySelector('.container');
const tabela = document.querySelector('.tabela');
const descricaoADD = document.querySelector('.descricaoADD');
const valorADD = document.querySelector('.valorADD');
const quantidadeADD = document.querySelector('.quantidadeADD');
const descricaoUP = document.querySelector('.descricaoUP');
const valorUP = document.querySelector('.valorUP');
const quantidadeUP = document.querySelector('.quantidadeUP');
const btnAdd = document.querySelector('.btnAdd');
const btnUp = document.querySelector('.btnUp');
const paneladd = document.getElementById('addProductPanel');
const panelup = document.getElementById('upProductPanel');
const paneldel = document.getElementById('delProductPanel');
const inputPesquisar = document.querySelector('.inputPesquisar');
const btnPesquisar = document.querySelector('.btnPesquisar');
const btnXadd = document.querySelector('.fecharAdd')
const btnXup = document.querySelector('.fecharUp')
const h2 = document.querySelector('.h2')

var produtos = [];
document.getElementById('addProductButton').addEventListener('click', () => {
  paneladd.classList.toggle('show');
  paneladd.classList.toggle('hidden');
});

buscaDados();

//PESQUISAR
btnPesquisar.addEventListener('click', async (e) => {
  e.preventDefault();
  let desc = inputPesquisar.value;

  const url = `https://api-produtos-v2.vercel.app/produtos/${desc}`;

  await fetch(url, {
    method: 'GET', // Método HTTP
    headers: {
      'Content-Type': 'application/json' // Cabeçalho indicando o tipo de conteúdo
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
      console.log('Sucesso:', data); // Processa os dados da resposta
      produtos = data;
    })
    .catch(error => {
      console.error('Erro:', error); // Lida com erros na requisição
    });

  await carregarProdutos();


})

btnXadd.addEventListener('click', () => {
  paneladd.classList.toggle('show');
})

btnXup.addEventListener('click', () => {
  panelup.classList.toggle('show');
})

//ADD
btnAdd.addEventListener('click', async (e) => {
  e.preventDefault();

  if (descricaoADD.value !== "" && valorADD.value !== "" && quantidadeADD.value !== "") {

    const url = 'https://api-produtos-v2.vercel.app/produtos';

    const data = {
      descricao: descricaoADD.value.toLowerCase().trim(),
      valor: valorADD.value,
      quantidade: quantidadeADD.value,
      dataDaUltimaAlteracao: new Date()
    }

    valorADD.value = '';
    descricaoADD.value = '';
    quantidadeADD.value = '';

    paneladd.classList.toggle('show');

    await fetch(url, {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Cabeçalho indicando o tipo de conteúdo
      },
      body: JSON.stringify(data) // Converte os dados para uma string JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
        console.log('Sucesso:', data); // Processa os dados da resposta
      })
      .catch(error => {
        console.error('Erro:', error); // Lida com erros na requisição
      });


    alert('PRODUTO ADICIONADO!')
    paneladd.classList.toggle('show');


    await buscaDados();

  } else {
    alert('Campos vazios!')
  }
})

btnUp.addEventListener('click', async (e) => {
  e.preventDefault();

  if (descricaoUP.value !== "" && valorUP.value !== "" && quantidadeUP.value !== "") {

    const url = `https://api-produtos-v2.vercel.app/produtos/${descParam}`;

    const data = {
      descricao: descricaoUP.value.toLowerCase(),
      valor: valorUP.value,
      quantidade: quantidadeUP.value,
      dataDaUltimaAlteracao: new Date()
    }

    valorUP.value = '';
    descricaoUP.value = '';
    quantidadeUP.value = '';

    await fetch(url, {
      method: 'PATCH', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Cabeçalho indicando o tipo de conteúdo
      },
      body: JSON.stringify(data) // Converte os dados para uma string JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
        console.log('Sucesso:', data); // Processa os dados da resposta
      })
      .catch(error => {
        console.error('Erro:', error); // Lida com erros na requisição
      });


    alert('PRODUTO ATUALIZADO!')
    panelup.classList.toggle('show');


    await buscaDados();

  } else {
    alert('Campos vazios!')
  }
})

function carregarProdutos() {
  tabela.innerHTML = ""
  for (let i = 0; i < produtos.length; i++) {
    const isoDate = produtos[i].dataDaUltimaAlteracao;
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', });
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    tabela.innerHTML += `<tr data-desc="${produtos[i].descricao}">
    <th scope="row">${produtos[i].descricao}</th>
    <td>R$ ${produtos[i].valor}</td>
    <td>${produtos[i].quantidade}</td>
    <td>${formattedDate + " " + formattedTime}</td>
    <td><button class="btn btn-outline-danger btnOp remover" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i>
    </button><button class="btn btn-outline-success btnOp atualizar" onclick="updatePanel(this)" id="updateProductButton"><i class="fa-solid fa-code-compare"></i></button></td>
    </tr>`
  }
}

async function buscaDados() {
  const url = 'https://api-produtos-v2.vercel.app/produtos';

  await fetch(url, {
    method: 'GET', // Método HTTP
    headers: {
      'Content-Type': 'application/json' // Cabeçalho indicando o tipo de conteúdo
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
      console.log('Sucesso:', data); // Processa os dados da resposta
      produtos = data;
    })
    .catch(error => {
      console.error('Erro:', error); // Lida com erros na requisição
    });

  await carregarProdutos();


}

async function deleteRow(button) {
  const row = button.closest('tr');
  const desc = row.getAttribute('data-desc');

  if (confirm(`Tem certeza que deseja apagar: ${desc}`)) {
    const url = `https://api-produtos-v2.vercel.app/produtos/${desc}`;
    await fetch(url, {
      method: 'DELETE', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Cabeçalho indicando o tipo de conteúdo
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
        console.log('Sucesso:', data); // Processa os dados da resposta
      })
      .catch(error => {
        console.error('Erro:', error); // Lida com erros na requisição
      });

    await alert('Produto Deletado!');
    await buscaDados();
  }
}

let descParam;
function updatePanel(button) {
  const row = button.closest('tr');
  const desc = row.getAttribute('data-desc');
  descParam = desc;
  h2.innerHTML = `(${desc})`;
  panelup.classList.toggle('show');
}
