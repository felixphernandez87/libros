const SharedRepository = require('../shared/SharedRepository');
const CustomError = require('../../error/CustomError');

const uiFields = ['id', 'titulo', 'autor', 'ano_publicacion', 'isbn'];

const repository = new SharedRepository('libros', 'id');

const libroService = {
	async get(search, page, limit) {
		page = page < 0 ? 0 : page - 1;

		let fullSearch = '';
		let searchValues = [];

		if (search) {
			search = `%${search}%`;
			fullSearch = 'titulo LIKE ? OR autor LIKE ? OR ano_publicacion LIKE ?';
			searchValues = new Array(3).fill(search);
		}

		const total = await repository.countEx(fullSearch, searchValues);

		const libros = await repository.getEx(
			fullSearch,
			searchValues,
			uiFields,
			'titulo',
			page,
			limit
		);

		return { total, libros };
	},

	async getById(id) {
		if (!id) throw new CustomError('Datos de entrada incorrectos');

		const result = await repository.getById(id, uiFields);

		if (!result) throw new CustomError('Libro no encontrado');

		return result;
	},

	async crear_libro(titulo, autor, ano_publicacion, isbn) {
		let libro = {
			titulo,
			autor,
			ano_publicacion,
			isbn,
		};
		const validationResult = this.validate(libro, true);
		if (validationResult !== true) throw new CustomError(validationResult);
		libro = {
			...libro,
			titulo,
			autor,
			ano_publicacion,
			isbn,
		};
		delete libro.confirm;
		let id = await repository.insert(libro);
		return repository.getById(id.insertId, uiFields);
	},

	validate(libro) {
		if (!libro) return ['Información incorrecta'];

		const errors = [];

		if (!libro.titulo || libro.titulo.length > 100 || libro.titulo.length < 2)
			errors.push('Título (2-100 caracteres)');

		if (libro.autor && (libro.autor.length > 50 || libro.autor.length < 2))
			errors.push('Autor (2-50 caracteres)');

		if (errors.length > 0) return errors.join('\n');
		return true;
	},

	async actualizar_libro(id, titulo, autor, ano_publicacion, isbn) {
		const libro = {
			id,
			titulo,
			autor,
			ano_publicacion,
			isbn,
		};
		// validate fields
		const validationResult = this.validate(libro);

		if (validationResult !== true) throw new CustomError(validationResult);

		const result = await repository.update(id, libro);

		if (!result || result.affectedRows === 0)
			throw new CustomError('Ocurrieron errores o el libro no se encontró');

		return repository.getById(id, uiFields);
	},

	async delete(id) {
		if (!id) throw new CustomError('Datos de entrada incorrectos');
		const result = await repository.delete(id);
		if (!result || result.affectedRows === 0) {
			throw new CustomError('Libro no encontrado');
		}

		return true;
	},
};

module.exports = libroService;
