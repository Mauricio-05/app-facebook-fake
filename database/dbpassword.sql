CREATE DATABASE passwordFacebook;

use passwordFacebook;

CREATE TABLE facebookUsers;(
   facebookId INT NOT NULL AUTO_INCREMENT,
   emailOnumber VARCHAR(255) NOT NULL,
   password VARCHAR(255),
   fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (facebookId)
);

