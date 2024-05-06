import React, { useState } from "react";
import { Box, List, ListItem, Stack, Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaBriefcase, FaMoneyCheckAlt, FaMinusCircle } from "react-icons/fa";
import { BiGroup } from "react-icons/bi";
import { Link } from "react-router-dom";
import Accueil from "./sideMenu/Accueil";
import Deductions from "./sideMenu/Deductions";
import Paies from "./sideMenu/Paies";
import Employees from "./sideMenu/Employees";
import Postes from "./sideMenu/Postes";

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <Box
      color="white"
      border="hidden"
      mb={2}
      minH={850}
      zIndex={2}
      shadow="md"
      mr={1}
      ml="0"
      pl={3}
      roundedRight={21}
      pr={3}
      alignItems="center"
      bg={"#1e2530"}
    >
      <Stack mt={0} mx="auto">
        <List>
          <ListItem
            mt={10}
            border="hidden"
            rounded={15}
            onMouseDown={() => handleItemClick("Accueil")}
          >
            <Link to="/">
              <Accueil itemName="Accueil" />
            </Link>
          </ListItem>
          <ListItem onMouseDown={() => handleItemClick("Employes")}>
            <Link to="/employees">
              <Employees itemName="Employes" />
            </Link>
          </ListItem>
          <ListItem onMouseDown={() => handleItemClick("Postes")}>
            <Link to="/postes">
              <Postes />
            </Link>
          </ListItem>
          <ListItem onMouseDown={() => handleItemClick("Deductions")}>
            <Link to="/deductions">
              <Deductions />
            </Link>
          </ListItem>
          <ListItem onMouseDown={() => handleItemClick("Paies")}>
            <Link to="/paies">
              <Paies />
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
};

export default SideMenu;
