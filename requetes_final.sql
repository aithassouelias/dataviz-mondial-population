-- Création de tables

CREATE TABLE deaths(
	idDeath INT AUTO INCREMENT PRIMARY KEY NOT NULL,
	Region_code VARCHAR(3) NOT NULL,
	Region_Name VARCHAR(31) NOT NULL,
	Country_Code VARCHAR(3) NOT NULL,
	Country_Name VARCHAR(150) NOT NULL,
	Year INT NOT NULL,
	Sex ENUM('All','Male','Female','Unknown')NOT NULL,
	Age_group_code VARCHAR(15) NOT NULL,
	Age_Group VARCHAR(15) NOT NULL,
	Number INT
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