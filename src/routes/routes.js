const express = require('express');
const jwt = require('../middleware/jwtauth');
const libroRoutes = require('../components/libros/routes');

//const path = require('path');

const router = express.Router();

router.use('/libros', jwt.authenticateToken, libroRoutes);

router.all('*', (req, res) => {
	res.sendStatus(404);
});

// this is needed for serving front as static
// router.all('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

module.exports = router;
