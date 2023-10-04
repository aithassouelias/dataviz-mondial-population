-- Création de tables

CREATE TABLE deaths(
	
);

CREATE TABLE births(
	idBirth INT PRIMARY KEY AUTO INCREMENT NOT NULL,
	country VARCHAR(150) NOT NULL,
	year VARCHAR(4) NOT NULL,
	area VARCHAR(150),
	month VARCHAR(9),
	source_year VARCHAR (4),
	value INT NOT NULL,
	URL VARCHAR(100)
);