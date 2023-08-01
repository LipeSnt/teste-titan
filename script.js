var contas = [];

function inserirEditarConta() {
    const empresa = document.getElementById('empresa').value;
    const dataPagamento = document.getElementById('dataPagamento').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!empresa || !dataPagamento || isNaN(valor)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }


    // Dados que serão enviados via POST
    var dados = {
        empresa: empresa,
        data: dataPagamento,
        valor:valor 
    };

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'retornoteste.php', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // Verificar o status da resposta (200 indica sucesso)
            if (xhr.status === 200) {
                // Callback de sucesso: o que fazer após a resposta do servidor
                console.log('Resposta do servidor:', xhr.responseText);
            } else {
                // Callback de erro: caso ocorra algum problema na requisição
                console.error('Erro na requisição AJAX:', xhr.status, xhr.statusText);
            }
        }
    };

        // Transformar os dados em formato JSON e enviar a requisição
        xhr.send(JSON.stringify(dados));
        location.reload();
}

function limparFormulario() {
    document.getElementById('empresa').value = '';
    document.getElementById('dataPagamento').value = '';
    document.getElementById('valor').value = '';
}

function atualizarTabelaContas() {
    const tabelaContas = document.getElementById('tabelaContas');
    tabelaContas.innerHTML = ''; // Limpa os dados da tabela

    contas.forEach((conta, index) => {
        const row = tabelaContas.insertRow();
        row.insertCell().innerText = conta.empresa;
        row.insertCell().innerText = conta.dataPagamento;
        row.insertCell().innerText = `R$ ${conta.valor.toFixed(2)}`;

        const btnEditar = document.createElement('button');
        btnEditar.innerText = 'Editar';
        btnEditar.addEventListener('click', () => editarConta(index));
        row.insertCell().appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.innerText = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirConta(index));
        row.insertCell().appendChild(btnExcluir);
    });
}

function editarConta(index) {
    const conta = contas[index];
    document.getElementById('empresa').value = conta.empresa;
    document.getElementById('dataPagamento').value = conta.dataPagamento;
    document.getElementById('valor').value = conta.valor.toFixed(2);
    contas.splice(index, 1);
    atualizarTabelaContas();
}

function excluirConta(index) {
    contas.splice(index, 1);
    atualizarTabelaContas();
}


function filtrarContas() {
    const busca = document.getElementById('busca').value.toLowerCase();

    const tabelaContas = document.getElementById('tabelaContas');
    tabelaContas.innerHTML = ''; // Limpa os dados da tabela

    contas.forEach((conta, index) => {
        const nomeEmpresa = conta.empresa.toLowerCase();
        const valor = conta.valor.toFixed(2);
        const dataPagamento = conta.dataPagamento;

        if (nomeEmpresa.includes(busca) || valor.includes(busca) || dataPagamento.includes(busca)) {
            const row = tabelaContas.insertRow();
            row.insertCell().innerText = conta.empresa;
            row.insertCell().innerText = conta.dataPagamento;
            row.insertCell().innerText = `R$ ${conta.valor.toFixed(2)}`;

            const btnEditar = document.createElement('button');
            btnEditar.innerText = 'Editar';
            btnEditar.addEventListener('click', () => editarConta(index));
            row.insertCell().appendChild(btnEditar);

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirConta(index));
            row.insertCell().appendChild(btnExcluir);

        }
    });
}