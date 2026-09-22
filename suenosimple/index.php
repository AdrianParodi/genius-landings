<?php

/**
 * GL-F08 — Gestión de landings por cliente.
 * Muestra las landings del cliente seleccionado y permite registrar nuevas.
 */
require_once __DIR__.'/../admin/api.php';

$cliente  = $_GET['client'] ?? '';
$landings = $cliente ? get_landings_by_client($cliente) : [];
$leads_by_landing = [];
$estados_lista = ["active", "draft", "inactive"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $status = $_POST['status'] ?? null;

    if ($id !== null && $status !== null && $status !== '') {
        $resultado = edit_status_landing($id, $status);

        $_SESSION['alerta'] = [
            'tipo' => 'success',
            'mensaje' => '¡Estado actualizado con éxito!',
        ];

        header('Location: /suenosimple/landings.php?client=' . urlencode((string) $cliente));
        exit;
    }
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SueñoSimple — Landings | Genius</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <header class="site-header">
        <a href="../index.html" class="brand">Genius<span>.</span></a>
        <span class="header-meta">Panel interno — Landings por cliente</span>
    </header>
    <main>
        <nav class="breadcrumb">
            <a href="../index.html">Clientes</a>
            <span class="sep">/</span>
            <span>SueñoSimple</span>
        </nav>

        <div class="client-info">
            <div class="client-info-avatar av-blue">SS</div>
            <div class="client-info-text">
                <h2>SueñoSimple</h2>
                <p>Colchones &mdash; Mercado masivo LATAM &mdash; Campañas estacionales</p>
            </div>
        </div>

        <p class="section-label">Landings publicadas</p>

        <?php if (!$cliente): ?>
            <p style="color:#dc3545; text-align: center; margin: 3rem auto">No se indicó ningún cliente. <a href="index.php">Volver al inicio.</a></p>
        <?php else: ?>

            <?php if (empty($landings)): ?>
                <div class="no-api-warning">
                    ⚠ No se obtuvieron landings desde la API. Verificá que el Landing CRM esté corriendo (puerto 3000) o que el cliente tenga landings registradas.
                </div>
            <?php endif; ?>

        <?php endif; ?>

        <div class="landing-grid">
            <?php foreach ($landings as $l): ?>

                <?php 
                    $posicionActual = array_search($l["status"] ?? 'draft', $estados_lista);
                    if ($posicionActual === false) { $posicionActual = 1; }
                    $siguientePosicion = ($posicionActual + 1) % count($estados_lista);
                    $siguienteEstado = $estados_lista[$siguientePosicion];
                ?>

                <div class="landing-card">
                    <div class="landing-card-top">
                        <div>
                            <h3><?= htmlspecialchars($l['name'] ?? $l['title'] ?? '—') ?></h3>
                            <span class="landing-type">Lanzamiento de producto</span>
                        </div>
                        <form action="" method="POST">
                            <input type="hidden" name="id" value="<?= $l['id'] ?>">
                            <input type="hidden" name="status" value="<?= $siguienteEstado ?>">
                            <button type="input" 
                                class="badge button-status badge-<?= htmlspecialchars($l['status'] ?? 'borrador') ?>"
                                style="cursor: pointer; border: none"
                                 title="Haga clic para cambiar el estado a: <?= htmlspecialchars($siguienteEstado) ?>">
                                <?= htmlspecialchars($l['status'] ?? 'borrador') ?> &#x21BB
                            </button>
                        </form>
                    </div>
                    <p class="landing-date">Publicada el: <?php echo $l['fields']['eventDate'] ?? 'Sin fecha confirmada' ?></p>
                    <a href="economica-pro.html" class="btn btn-outline">Ver landing</a>
                </div>


            <?php endforeach; ?>
            <?php if (empty($landings)): ?>
                <tr>
                    <td colspan="6" style="color:#64748b;text-align:center;padding:16px;">Sin landings registradas.</td>
                </tr>
            <?php endif; ?>

        </div>
    </main>

    <footer class="site-footer">
        Genius Agency &mdash; Uso interno. No compartir fuera del equipo.
    </footer>
</body>

</html>