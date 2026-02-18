const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
    // Conexión a la base de datos
    db = await open({
        filename: './db/database.sqlite',
        driver: sqlite3.Database
    });

    app.set('db', db);

    // 1. Creamos la tabla con la columna de imagen
// 1. Creamos la tabla con restricción de precio (CHECK)
await db.exec(`
    CREATE TABLE IF NOT EXISTS servicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        precio REAL CHECK(precio >= 0),
        imagen TEXT
    )
`);

const count = await db.get('SELECT COUNT(*) as total FROM servicios');

if (count.total === 0) {
    await db.run(`
        INSERT INTO servicios (nombre, descripcion, precio, imagen)
        VALUES 
        ('Destapación de Cocina', 'Limpieza profunda de cañerías y sifones con máquina rotativa.', 35000, 'cocina.png'),
        ('Destapación de Baño', 'Inodoros, bidets y rejillas con equipo especializado.', 35000, 'baño.png'),
        ('Pluvial', 'Limpieza de desagües de lluvia y patios.', 35000, 'pluvial.jpg'),
        ('Cámara Cloacal', 'Mantenimiento y desobstrucción de cámaras sépticas principales.', 110000, 'Desagote.png'),
        ('Diagnóstico por Imagen', 'Inspección con cámara HD para localizar fugas o roturas.', 450000, 'diagnostico.jpg')
    `);
    console.log('✅ Precios actualizados de AD Destapaciones cargados.');
}

    console.log('🚀 Base de datos conectada con éxito');
})();

app.use('/api/servicios', require('./routes/servicios'));

app.listen(PORT, () => {
    console.log(`Servidor de Destapaciones corriendo en http://localhost:${PORT}`);
});