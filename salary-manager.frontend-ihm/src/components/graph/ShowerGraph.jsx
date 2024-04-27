import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import BarChartComponent from "./BachartComponent";
import PieChartComponent from "./CustomToltip";

const ShowerGraph = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("right");

  // Fonction pour déterminer la taille du tiroir en fonction de son contenu
  const getDrawerSize = () => {
    // Récupérer la hauteur du contenu du graphique
    const graphContentHeight =
      document.getElementById("graph-content")?.offsetHeight || 0;
    // Ajouter une marge supplémentaire pour le contenu
    const margin = 20;
    // Calculer la taille totale du tiroir en fonction de la hauteur du contenu
    return graphContentHeight + margin;
  };

  return (
    <Stack>
      <Text>Consulter le statistique des déductions</Text>
      <Button colorScheme="blue" onClick={onOpen} p={5} pl={10} pr={10}>
        Consulter
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent size={getDrawerSize()}>
          <DrawerHeader borderBottomWidth="1px">
            Camember des deductions
          </DrawerHeader>
          <DrawerBody id="graph-content">
            <PieChartComponent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default ShowerGraph;
