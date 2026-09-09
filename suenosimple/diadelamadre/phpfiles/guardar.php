<?php
// guardar.php
require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = htmlspecialchars(trim($_POST['email']));
    $celular = isset($_POST['celular']) ? htmlspecialchars(trim($_POST['celular'])) : '';

    if (!empty($nombre) && !empty($email)) {
                try {
            $db = new Database();
            $conexion = $db->getConexion();

            $sql = "INSERT INTO contactos (nombre, email, celular) VALUES (:nombre, :email, :celular)";
            $stmt = $conexion->prepare($sql);

            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':celular', $celular);

            $stmt->execute();
            
            header('Location: ../index.html?estado=exito');
            exit;

        } catch (PDOException $e) {
            // Código 23000 significa "Violación de restricción de integridad" (ej: UNIQUE duplicado)
            if ($e->getCode() == 23000) {
                // Redirigimos con un estado de "duplicado"
                header('Location: ../index.html?estado=duplicado');
                exit;
            } else {
                // Si es otro error de base de datos, mostramos el genérico
                header('Location: ../index.html?estado=error');
                exit;
            }
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