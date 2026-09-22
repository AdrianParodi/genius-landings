<?php
/**
 * Genius Landings Admin — helper para consumir las APIs internas.
 * Usar: require_once 'api.php';
 */

define('BUDGET_MANAGER_URL', 'http://localhost:8080');
define('LANDING_CRM_URL',    'http://localhost:3000');

function api_get(string $url): array {
    $context  = stream_context_create(['http' => ['timeout' => 3]]);
    $response = @file_get_contents($url, false, $context);
    if ($response === false) return [];
    return json_decode($response, true) ?? [];
}

function api_patch(string $url, array $data = []): array {
    $context  = stream_context_create([
        'http' => [
            'method' => 'PATCH',
            'header' => "Content-Type: application/json\r\n",
            'content' => json_encode($data),
            'timeout' => 3]]);
     echo "<pre>paso por patch:\n";

    $response = @file_get_contents($url, false, $context);
    if ($response === false) return [];
    return json_decode($response, true) ?? [];
}

function edit_status_landing(string $id, string $status): array {
    echo "<pre>ya llego a edit";
    return api_patch(LANDING_CRM_URL . '/api/landings/' . urldecode($id), ["status" => $status]);
}

function get_campaigns(?string $client = null): array {
    $url = BUDGET_MANAGER_URL . '/api/campaigns';
    if ($client) $url .= '?client=' . urlencode($client);
    return api_get($url);
}

function get_landings(): array {
    $url = LANDING_CRM_URL . '/api/landings';
    return api_get($url);
}

function get_landings_by_client(?string $client): array { 
    return api_get(LANDING_CRM_URL . '/api/landings/client/' . urldecode($client));
}

function get_leads(int $landing_id): array {
    return api_get(LANDING_CRM_URL . '/api/landings/' . $landing_id . '/leads');
}
