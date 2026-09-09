<?php
// database.php

class Database {
    private $pdo;

    public function __construct() {
        // ==========================================
        // CADENA DE CONEXIÓN
        // Si el día de mañana quieres pasar a MySQL, 
        // solo cambias esta línea por algo como:
        // 'mysql:host=localhost;dbname=mi_base_datos;charset=utf8'
        // y pones tus credenciales abajo.
        // ==========================================
        $dsn = 'sqlite:' . __DIR__ . '/datos.sqlite';
        
        // Usuario y contraseña (SQLite no los usa, pero MySQL sí)
        $usuario = null;
        $contrasena = null;

        try {
            // Creamos la instancia de PDO
            $this->pdo = new PDO($dsn, $usuario, $contrasena);
            
            // Configuramos PDO para que lance excepciones si hay errores
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Creamos la tabla si no existe
            $this->crearTablaSiNoExiste();
            
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    private function crearTablaSiNoExiste() {
        // Sintaxis SQL estándar compatible con SQLite y MySQL
        $sql = "CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            celular TEXT
        )";
        $this->pdo->exec($sql);
    }

    public function getConexion() {
        return $this->pdo;
    }
}
?>