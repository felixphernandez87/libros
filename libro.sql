create table libros(
  id int unsigned auto_increment,
  titulo VARCHAR(100) not null,
  autor VARCHAR(50) NOT NULL,
  ano_publicacion int(4) NOT NULL,
  isbn VARCHAR(100) NOT NULL,
  unique i_id(id),
  unique i_isbn(isbn)
 );