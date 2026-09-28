<?php
// guardar.php
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
$landingId = filter_var($_POST['landingId'] ?? '', FILTER_VALIDATE_INT);

if ($landingId === false || $landingId <= 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'tipo' => 'landing', 'mensaje' => 'Landing no válida.']);
    exit;
}

if (empty($nombre) || empty($email)) {
    http_response_code(400); // Bad Request
    echo json_encode(['ok' => false, 'tipo' => 'vacio', 'mensaje' => 'Completá los campos requeridos.']);
    exit;
}

if (enviarLeadAApi($landingId, $nombre, $email, $telefono, null)) {
    echo json_encode(['ok' => true, 'mensaje' => '¡Gracias por registrarte!']);
} else {
    http_response_code(502);
    echo json_encode(['ok' => false, 'tipo' => 'api', 'mensaje' => 'No se pudo enviar el registro. Intentá de nuevo.']);
}
?>