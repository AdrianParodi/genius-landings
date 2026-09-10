<?php
// guardar.php
require 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = isset($_POST['telefono']) ? htmlspecialchars(trim($_POST['telefono'])) : '';

    if (!empty($nombre) && !empty($email)) {
                try {
            $db = new Database();
            $conexion = $db->getConexion();

            $sql = "INSERT INTO contactos (nombre, email, telefono) VALUES (:nombre, :email, :telefono)";
            $stmt = $conexion->prepare($sql);

            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':telefono', $telefono);

            $stmt->execute();
            
            header('Location: ../dia-de-la-madre.html?estado=exito');
            exit;

        } catch (PDOException $e) {
            // Código 23000 significa "Violación de restricción de integridad" (ej: UNIQUE duplicado)
            if ($e->getCode() == 23000) {
                // Redirigimos con un estado de "duplicado"
                header('Location: ../dia-de-la-madre.html?estado=duplicado');
                exit;
            } else {
                // Si es otro error de base de datos, mostramos el genérico
                header('Location: ../dia-de-la-madre.html?estado=error');
                exit;
            }
        }
    } else {
        // CAMBIO AQUÍ: Se agregó ../
        header('Location: ../dia-de-la-madre.html?estado=vacio');
        exit;
    }
} else {
    // CAMBIO AQUÍ: Se agregó ../
    header('Location: ../dia-de-la-madre.html');
    exit;
}
?>