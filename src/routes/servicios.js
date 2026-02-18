const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = req.app.get('db');
        const servicios = await db.all('SELECT * FROM servicios');
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: "Error al leer los servicios" });
    }
});

module.exports = router;