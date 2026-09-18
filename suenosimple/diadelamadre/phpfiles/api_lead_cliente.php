<?php

/**
 * Envía los datos del lead a la API externa.
 * Retorna true si la API respondió 2xx, false en cualquier otro caso.
 */
function enviarLeadAApi(?string $name, ?string $email, ?string $phone, ?string $message): bool
{
    $url = 'http://localhost:3000/api/landings/3/leads';

    $payload = json_encode([
        'name'    => $name,
        'email'   => $email,
        'phone'   => $phone,
        'message' => $message,
    ]);

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);

    $response   = curl_exec($ch);
    $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError  = curl_error($ch);

    // curl_close($ch);

    if ($curlError) {
        error_log("Error cURL al enviar lead: " . $curlError);
        return false;
    }

    if ($httpStatus >= 200 && $httpStatus < 300) {
        error_log("Lead enviado OK. Status: " . $httpStatus);
        return true;
    }

    error_log("La API devolvió error. Status: $httpStatus | Body: $response");
    return false;
}
