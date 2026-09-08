<?php
// guardar.php
require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = htmlspecialchars(trim($_POST['email']));
    $celular = htmlspecialchars(trim($_POST['celular']));

    if (!empty($nombre) && !empty($email) && !empty($celular)) {
        try {
            $db = new Database();
            $conexion = $db->getConexion();

            $sql = "INSERT INTO contactos (nombre, email, celular) VALUES (:nombre, :email, :celular)";
            $stmt = $conexion->prepare($sql);

            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':celular', $celular);

            $stmt->execute();
            
            // CAMBIO AQUÍ: Se agregó ../ para salir de la carpeta phpfiles
            header('Location: ../index.html?estado=exito');
            exit;

        } catch (PDOException $e) {
            // CAMBIO AQUÍ: Se agregó ../
            header('Location: ../index.html?estado=error');
            exit;
        }
    } else {
        // CAMBIO AQUÍ: Se agregó ../
        header('Location: ../index.html?estado=vacio');
        exit;
    }
} else {
    // CAMBIO AQUÍ: Se agregó ../
    header('Location: ../index.html');
    exit;
}
?>