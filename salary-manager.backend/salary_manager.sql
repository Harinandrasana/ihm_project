DROP DATABASE IF EXISTS salary_manager;
CREATE DATABASE salary_manager;
USE salary_manager;

CREATE TABLE postes(
    idPoste int not null auto_increment,
    nomPoste varchar(20) not null, 
    salaire int not null,
    commentaire varchar(100),
    PRIMARY KEY(idPoste)
);

CREATE TABLE employes(
    idEmploye int not null auto_increment,
    idPoste int not null, 
    nom varchar(30) not null, 
    prenom varchar(20) not null, 
    dateNaissance date not null,
    adresse varchar(50) not null,
    image varchar(50) null,
    email varchar(20),   
    tel int not null, 
    dateEmbauche date not null, 
    PRIMARY KEY(idEmploye),
    FOREIGN KEY(idPoste) REFERENCES postes(idPoste) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER id_format_trigger
BEFORE INSERT ON employes
FOR EACH ROW
BEGIN
    DECLARE new_id INT;
    SET new_id = NEW.idEmploye;
    IF new_id < 1000 OR new_id > 9999 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'idEmploye doit être composé de quatre chiffres';
    END IF;
END;
//

DELIMITER ;

CREATE TABLE deductions(
    idDeduction int not null auto_increment,
    idPoste int not null, 
    design varchar(30) not null,
    TauxD int not NULL,
    PRIMARY KEY(idDeduction),
    FOREIGN KEY(idPoste) REFERENCES postes(idPoste) ON DELETE CASCADE 
);

CREATE TABLE avantages(
    idAvantage int not null auto_increment,
    idEmploye int not null, 
    design varchar(30) not null,
    tauxA int not null,
    PRIMARY KEY(idAvantage),
    FOREIGN KEY(idEmploye) REFERENCES employes(idEmploye) ON DELETE CASCADE
);

CREATE TABLE paies(
    idPaie int not null auto_increment,
    idEmploye int not null,
    datePaie date not null,
    salaireNet int not null,
    salaireBrut int not null,
    totalDeduction int not null,
    totalAvantage int,
    PRIMARY KEY(idPaie),
    FOREIGN KEY(idEmploye) REFERENCES employes(idEmploye) ON DELETE CASCADE
);

CREATE TABLE users(
    userId INT NOT NULL,
    password VARCHAR(50) NOT NULL,
    userImage VARCHAR(50) NOT NULL
);
