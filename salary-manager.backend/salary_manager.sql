-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 27 avr. 2024 à 16:06
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
-- Base de données : `salary_manager`
--

-- --------------------------------------------------------

--
-- Structure de la table `avantages`
--

CREATE TABLE `avantages` (
  `idAvantage` int NOT NULL,
  `idEmploye` int NOT NULL,
  `design` varchar(30) NOT NULL,
  `tauxA` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `avantages`
--

INSERT INTO `avantages` (`idAvantage`, `idEmploye`, `design`, `tauxA`) VALUES
(2, 1002, 'Tickets restaurant', 150),
(3, 1003, 'Indemnités de déplacement', 300);

-- --------------------------------------------------------

--
-- Structure de la table `deductions`
--

CREATE TABLE `deductions` (
  `idDeduction` int NOT NULL,
  `idPoste` int NOT NULL,
  `design` varchar(30) NOT NULL,
  `tauxD` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `deductions`
--

INSERT INTO `deductions` (`idDeduction`, `idPoste`, `design`, `tauxD`) VALUES
(1, 1, 'Assurance santé', 1),
(2, 2, 'Retenue fiscale', 3),
(3, 1, 'Retenue syndicale', 2),
(4, 1, 'Assurance retraire', 1),
(5, 1, 'Assurance chômage', 5);

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

CREATE TABLE `employes` (
  `idEmploye` int NOT NULL,
  `idPoste` int NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `dateNaissance` date NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `image_url` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `dateEmbauche` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `employes`
--

INSERT INTO `employes` (`idEmploye`, `idPoste`, `nom`, `prenom`, `dateNaissance`, `adresse`, `image_url`, `email`, `tel`, `dateEmbauche`) VALUES
(1002, 2, 'Martin', 'Sophie', '2024-04-17', '456 Avenue des Roses', 'DSC_1036.JPG', 'sophie.martin@example.com', '9876543210', '2024-04-09'),
(1003, 3, 'Garcia', 'Pierre', '1995-08-03', '789 Boulevard des Champs', NULL, 'pierre.garcia@example.com', '5556667777', '2021-07-10'),
(1005, 1, 'Dupontd', 'Jean', '1990-05-14', '123 Rue de la Paixd', NULL, 'jean.dupontd@example.com', '1234567890', '2019-12-31'),
(1006, 1, 'Dupontd', 'Jean', '1990-05-14', '123 Rue de la Paixd', NULL, 'jean.dupontd@example.com', '1234567890', '2019-12-31'),
(1007, 1, 'Dupontd', 'Jean', '1990-05-14', '123 Rue de la Paixd', NULL, 'jean.dupontd@example.com', '1234567890', '2019-12-31'),
(1016, 2, 'RANDRIASONY', 'Harinandrasana Clet', '2003-08-26', 'Soanierana', 'DSC_1036.JPG', 'clet9807@gmail.com', '+261-261-26-10-34-', '2024-04-24'),
(1017, 1, 'RANDRIASONY', 'Harinandrasana Clet', '2004-04-17', 'Soanierana', 'DSC_1036.JPG', 'clet9807@gmail.com', '+261-261-26-16-2-', '2024-04-21');

-- --------------------------------------------------------

--
-- Structure de la table `paies`
--

CREATE TABLE `paies` (
  `idPaie` int NOT NULL,
  `idEmploye` int NOT NULL,
  `datePaie` date NOT NULL,
  `salaireNet` int NOT NULL,
  `salaireBrut` int NOT NULL,
  `totalDeduction` int NOT NULL,
  `totalAvantage` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `paies`
--

INSERT INTO `paies` (`idPaie`, `idEmploye`, `datePaie`, `salaireNet`, `salaireBrut`, `totalDeduction`, `totalAvantage`) VALUES
(2, 1002, '2024-04-15', 3800, 4000, 200, 150),
(3, 1003, '2024-04-15', 2700, 3000, 300, 300),
(4, 1002, '2024-04-04', 3800, 4000, 200, 150);

-- --------------------------------------------------------

--
-- Structure de la table `postes`
--

CREATE TABLE `postes` (
  `idPoste` int NOT NULL,
  `nomPoste` varchar(20) NOT NULL,
  `salaire` int NOT NULL,
  `commentaire` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `postes`
--

INSERT INTO `postes` (`idPoste`, `nomPoste`, `salaire`, `commentaire`) VALUES
(1, 'Manager', 50000, 'Responsable de la gestion d\'une équipe'),
(2, 'Développeur', 40000, 'Responsable du développement logiciel'),
(3, 'Assistant', 30000, 'Support administratif et organisationnel');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `password` varchar(50) NOT NULL,
  `image_url` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `password`, `image_url`) VALUES
(1, 'motdepasse123', 'image_utilisateur.jpg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD PRIMARY KEY (`idAvantage`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Index pour la table `deductions`
--
ALTER TABLE `deductions`
  ADD PRIMARY KEY (`idDeduction`),
  ADD KEY `idPoste` (`idPoste`);

--
-- Index pour la table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`idEmploye`),
  ADD KEY `idPoste` (`idPoste`);

--
-- Index pour la table `paies`
--
ALTER TABLE `paies`
  ADD PRIMARY KEY (`idPaie`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`idPoste`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avantages`
--
ALTER TABLE `avantages`
  MODIFY `idAvantage` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `deductions`
--
ALTER TABLE `deductions`
  MODIFY `idDeduction` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `employes`
--
ALTER TABLE `employes`
  MODIFY `idEmploye` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1018;

--
-- AUTO_INCREMENT pour la table `paies`
--
ALTER TABLE `paies`
  MODIFY `idPaie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `idPoste` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avantages`
--
ALTER TABLE `avantages`
  ADD CONSTRAINT `avantages_ibfk_1` FOREIGN KEY (`idEmploye`) REFERENCES `employes` (`idEmploye`) ON DELETE CASCADE;

--
-- Contraintes pour la table `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_ibfk_1` FOREIGN KEY (`idPoste`) REFERENCES `postes` (`idPoste`) ON DELETE CASCADE;

--
-- Contraintes pour la table `employes`
--
ALTER TABLE `employes`
  ADD CONSTRAINT `employes_ibfk_1` FOREIGN KEY (`idPoste`) REFERENCES `postes` (`idPoste`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paies`
--
ALTER TABLE `paies`
  ADD CONSTRAINT `paies_ibfk_1` FOREIGN KEY (`idEmploye`) REFERENCES `employes` (`idEmploye`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
