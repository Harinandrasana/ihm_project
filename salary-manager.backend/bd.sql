-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 31 mars 2024 à 14:07
-- Version du serveur : 8.0.32
-- Version de PHP : 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `avantage`
--

CREATE TABLE `avantage` (
  `idAvantage` int NOT NULL,
  `idEmploye` int NOT NULL,
  `design` varchar(30) NOT NULL,
  `montantA` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deduction`
--

CREATE TABLE `deduction` (
  `idDeduction` int NOT NULL,
  `design` varchar(30) NOT NULL,
  `TauxD` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `idEmploye` int NOT NULL,
  `idPoste` int NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `email` varchar(20) DEFAULT NULL,
  `tel` int NOT NULL,
  `dateEmbauche` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paie`
--

CREATE TABLE `paie` (
  `idPaie` int NOT NULL,
  `idEmploye` int NOT NULL,
  `mois` date NOT NULL,
  `salaireNet` int NOT NULL,
  `salaireBrut` int NOT NULL,
  `totalDeduction` int NOT NULL,
  `totalAvantage` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poste`
--

CREATE TABLE `poste` (
  `idPoste` int NOT NULL,
  `nomPoste` varchar(20) NOT NULL,
  `salaire` int NOT NULL,
  `commentaire` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poste`
--

INSERT INTO `poste` (`idPoste`, `nomPoste`, `salaire`, `commentaire`) VALUES
(1, 'developpeur', 5000000, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `responsable`
--

CREATE TABLE `responsable` (
  `id` int NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avantage`
--
ALTER TABLE `avantage`
  ADD PRIMARY KEY (`idAvantage`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Index pour la table `deduction`
--
ALTER TABLE `deduction`
  ADD PRIMARY KEY (`idDeduction`);

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`idEmploye`),
  ADD KEY `idPoste` (`idPoste`);

--
-- Index pour la table `paie`
--
ALTER TABLE `paie`
  ADD PRIMARY KEY (`idPaie`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Index pour la table `poste`
--
ALTER TABLE `poste`
  ADD PRIMARY KEY (`idPoste`);

--
-- Index pour la table `responsable`
--
ALTER TABLE `responsable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avantage`
--
ALTER TABLE `avantage`
  MODIFY `idAvantage` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `deduction`
--
ALTER TABLE `deduction`
  MODIFY `idDeduction` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `idEmploye` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paie`
--
ALTER TABLE `paie`
  MODIFY `idPaie` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `poste`
--
ALTER TABLE `poste`
  MODIFY `idPoste` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `responsable`
--
ALTER TABLE `responsable`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avantage`
--
ALTER TABLE `avantage`
  ADD CONSTRAINT `avantage_ibfk_1` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`idEmploye`) ON DELETE CASCADE;

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`idPoste`) REFERENCES `poste` (`idPoste`);

--
-- Contraintes pour la table `paie`
--
ALTER TABLE `paie`
  ADD CONSTRAINT `paie_ibfk_1` FOREIGN KEY (`idEmploye`) REFERENCES `employe` (`idEmploye`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
