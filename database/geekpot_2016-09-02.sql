# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.12)
# Base de Dados: geekpot
# Tempo de Geração: 2016-09-03 00:35:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `admin` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `username`, `password`, `active`, `admin`, `created_at`, `updated_at`, `deleted_at`, `email`)
VALUES
	(1,'Marcio mansur','marciomansur','$2a$10$bmO0QmqdEeBN1mZ/vtm1PeYuoTJ.FN1v/hQ5NBjUCnzxsFZ73TpzS',0,0,'2016-09-02 21:35:48','2016-09-02 21:35:48',NULL,'mrabeloo@gmail.com'),
	(2,'Marcio Mansur','marciomansur','$2a$10$lKSW6CmJ33FwvFksBeUGt.WGk42nprFnbnX7c2c9HG1hwoBpBZGTC',0,0,'2016-09-02 21:45:33','2016-09-02 21:45:33',NULL,'mrabeloo@gmail.com'),
	(3,'Marcio Mansur','marciomansur','$2a$10$i6cYLCO3NhJnsQ3BWHi6a.9m7li3rZfJpRsQNiTAztVS8dyCKARKa',0,0,'2016-09-02 22:05:49','2016-09-02 22:05:49',NULL,'mrabeloo@gmail.com'),
	(4,'Marcio Mansur','marciomansur','$2a$10$rI1f1ewi/hORW2wv7ZWJSuxl3/7ieHFlKlBa09cbOAArwQGrEKnnm',0,0,'2016-09-02 22:28:12','2016-09-02 22:28:12',NULL,'mrabeloo@gmail.com'),
	(5,'Marcio Mansur','marciomansur','$2a$10$6iBB77.k0bSF2RLV01/yduNgArHowMXXQ31MZwaJQlNH4RlQkbske',0,0,'2016-09-02 22:29:13','2016-09-02 22:29:13',NULL,'mrabeloo@gmail.com'),
	(6,'Marcio Mansur','marciomansur','$2a$10$N4t7uTzYMml5QthWWg9vyufvGehS7URC5d5nkld8wPhmAKMjTuBz2',0,0,'2016-09-02 22:35:51','2016-09-02 22:35:51',NULL,'mrabeloo@gmail.com'),
	(7,'Marcio Mansur','marciomansur','$2a$10$8RUooh5V77iSSG0hIgPdHuwn5EgHgdBMIijJ0cQvg/zrNMEJda92K',0,0,'2016-09-02 22:39:01','2016-09-02 22:39:01',NULL,'mrabeloo@gmail.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
