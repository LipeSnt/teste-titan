<?php
$hostname = '127.0.0.1';       // Endereço do servidor MySQL (normalmente localhost)
$username = 'root';     // Nome de usuário do banco de dados
$password = '';       // Senha do banco de dados
$database = 'teste'; // Nome do banco de dados 
// Criar conexão com o MySQL
$conn = mysqli_connect($hostname, $username, $password, $database);

// Verificar se a conexão foi estabelecida corretamente
if (!$conn) {
    die('Falha na conexão: ' . mysqli_connect_error());
}

?>