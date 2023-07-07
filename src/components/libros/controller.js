const service = require('./service');
const errorHandling = require('../../error/errorHandling');
const jwt = require('../../middleware/jwtauth');
const formidable = require('formidable');
const path = require('path');
const fileHelper = require('../../utils/fileHelper');
const fs = require('fs');

const userController = {
	async get(req, res) {
		try {
			const { search, page, limit } = req.query;
			const items = await service.get(search, page, limit);
			res.json({ status: 'success', data: items });
		} catch (error) {
			const errors = errorHandling.processError(error);
			res.status(400).json({ status: 'error', errors: errors });
		}
	},

	async getOne(req, res) {
		try {
			const user = await service.getById(req.params.id);
			res.json({ status: 'success', data: user });
		} catch (error) {
			const errors = errorHandling.processError(error);
			res.status(400).json({ status: 'error', errors: errors });
		}
	},

	async crearLibro(req, res) {
		// captcha protected
		try {
			const { titulo, autor, ano_publicacion, isbn } = req.body;
			const result = await service.crear_libro(
				titulo,
				autor,
				ano_publicacion,
				isbn
			);

			res.json({ status: 'success', data: result });
		} catch (error) {
			const errors = errorHandling.processError(error);
			res.status(400).json({ status: 'error', errors: errors });
		}
	},

	async actualizar_libro(req, res) {
		try {
			const { titulo, autor, ano_publicacion, isbn } = req.body;
			const result = await service.actualizar_libro(
				req.params.id,
				titulo,
				autor,
				ano_publicacion,
				isbn
			);

			res.json({ status: 'success', data: result });
		} catch (error) {
			const errors = errorHandling.processError(error);
			res.status(400).json({ status: 'error', errors: errors });
		}
	},

	async delete(req, res) {
		try {
			await service.delete(req.params.id);
			res.json({ status: 'success' });
		} catch (error) {
			const errors = errorHandling.processError(error);
			res.status(400).json({ status: 'error', errors: errors });
		}
	},
};

module.exports = userController;
