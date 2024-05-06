import { useState } from "react";
import { Stack, Button } from "@chakra-ui/react";

// Fonction composant principal
function TablePagination({ data, itemsPerPage }) {
  // État local pour suivre la page actuelle
  const [currentPage, setCurrentPage] = useState(0);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Fonction pour passer à la page précédente
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calcul du début et de la fin des éléments à afficher sur la page actuelle
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Affichage des éléments de la page actuelle
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <Stack>
      {/* Affichage des éléments de la page actuelle */}
      {currentPageData.map((item, index) => (
        <div key={index}>{/* Affichage de l'élément */}</div>
      ))}

      {/* Boutons de pagination */}
      <Stack direction="row" spacing={4}>
        {/* Bouton précédent */}
        <Button onClick={prevPage} disabled={currentPage === 0}>
          Précédent
        </Button>
        {/* Bouton suivant */}
        <Button onClick={nextPage} disabled={endIndex >= data.length}>
          Suivant
        </Button>
      </Stack>
    </Stack>
  );
}

export default TablePagination;
