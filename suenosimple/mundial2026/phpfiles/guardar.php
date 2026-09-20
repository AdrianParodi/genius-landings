<?php
// guardar.php
require 'database.php';
require_once 'api_lead_cliente.php';

// ← Esto es clave: le decimos al navegador que la respuesta es JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'tipo' => 'metodo', 'mensaje' => 'Método no permitido.']);
    exit;
}

$nombre   = trim($_POST['nombre']   ?? '');
$email    = trim($_POST['email']    ?? '');
$telefono = trim($_POST['telefono'] ?? '');

if (empty($nombre) || empty($email)) {
    http_response_code(400); // Bad Request
    echo json_encode(['ok' => false, 'tipo' => 'vacio', 'mensaje' => 'Completá los campos requeridos.']);
    exit;
}

try {
    $db       = new Database();
    $conexion = $db->getConexion();

    $sql  = "INSERT INTO contactos (nombre, email, telefono) VALUES (:nombre, :email, :telefono)";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre',   $nombre);
    $stmt->bindParam(':email',    $email);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->execute();

    // ← JSON de éxito
    echo json_encode(['ok' => true, 'mensaje' => '¡Gracias por registrarte!']);

    // 2. Enviar a la API externa
    $apiOk = enviarLeadAApi($nombre, $email, $telefono, null);

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        http_response_code(409); // Conflict
        echo json_encode(['ok' => false, 'tipo' => 'duplicado', 'mensaje' => 'Este email ya está registrado.']);
    } else {
        http_response_code(500); // Server Error
        echo json_encode(['ok' => false, 'tipo' => 'error', 'mensaje' => 'Error al guardar. Intentá de nuevo.']);
    }
}
?>