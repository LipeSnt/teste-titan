<!DOCTYPE html>
<html>
<head>
    <title>Contas a Pagar</title>
</head>
<body>
    <h1>Contas a Pagar</h1>
    <form id="formConta">
       <div class="row">
            <label  for="empresa">Selecione a Empresa:</label>
            <select id="empresa">
                <?php

                    include_once('conect.php');

                    $query = "SELECT * FROM tbl_empresa";
                    $result = mysqli_query($conn, $query);

                    // Verificar se a consulta foi executada com sucesso
                    if ($result) {
                        while ($row = mysqli_fetch_assoc($result)) {
                          
                            echo "<option value=".$row['id_empresa'].">".$row['nome']."</option>";
                        }

                    } else {
                        echo 'Erro na consulta: ' . mysqli_error($conn);
                    }     
                ?>
            </select>
       </div>

        <div class="row">
            <label for="dataPagamento">Data de Pagamento:</label>
            <input type="date" id="dataPagamento">
        </div>

        <div>
            <label for="valor">Valor a Pagar:</label>
            <input type="number" id="valor">
        </div>
        <button type="button" onclick="inserirEditarConta()">Inserir / Editar</button>
    </form>

    <h2>Tabela de Contas a Pagar</h2>
    <input type="text" id="busca" oninput="filtrarContas()" placeholder="Filtrar por Nome, Valor ou Data">
    <table >
        <thead>
            <tr>
                <th>EMPRESA</th>
                <th>DATA</th>
                <th>VALOR</th>
            </tr>
        </thead>
        <tbody id="tabelaContas">
                <?php
                    $query = "SELECT te.nome, tcp.data_pagar,tcp.valor  
                                FROM tbl_conta_pagar tcp 
                                left join tbl_empresa te on te.id_empresa  = tcp.id_empresa";
                    $result = mysqli_query($conn, $query);
                    while ($row = mysqli_fetch_assoc($result)) {

                        $data = date("d/m/Y",strtotime($row['data_pagar']));

                     echo   '<tr>
                                <td>'.$row['nome'].'</td>
                                <td>'.$data.'</td>
                                <td>R$'.number_format($row['valor'],2,".",",").'</td>
                            </tr>';
                    }
                      
                ?>
        </tbody>
    </table>
        
    <script src="script.js">
    </script>



    
</body>
</html>