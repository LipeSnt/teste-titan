<?php
include_once('conect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $dadosRecebidos = json_decode(file_get_contents("php://input"), true);

    
    // Recebe os dados enviados via POST
    $empresa = $dadosRecebidos['empresa'];
    $data = $dadosRecebidos['data'];
    $valor = $dadosRecebidos['valor'];
  
   
    $query = "insert into tbl_conta_pagar ( valor,
                                            data_pagar,
                                            id_empresa
                                            )
                                            values
                                            (
                                            ".$valor.",
                                            '".$data."',
                                            ".$empresa."
                                            )";
    $result = mysqli_query($conn, $query);
    mysqli_close($conn);
}

?>