import React from "react";
import {
  Container,
  Button,
  Box,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const RouterBar = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };
  const goNext = () => {
    navigate(+1);
  };

  const pathToPageName = {
    "/": "Accueil",
    "/employees": "Employes",
    "/postes": "Postes",
    "/deductions": "Deductions",
    "/paies": "Paies",
  }

  const currentPageName = pathToPageName[location.pathname];

  return (
    <HStack
      p={5}
      border={"2px solid #f5e9ff"}
      // bg="#f5e9ff"
      bg="#1B335B"
      mt={4}
      mb={2}
      color={"white"}
      mr={"auto"}
    >
      <Button leftIcon={<ArrowBackIcon />} onClick={goBack} mr="auto"></Button>
      <Box>
        {/* // montrer la page précedement parcouru et la page suivante parcouru */}

        <Breadcrumb>
          {/* <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem> */}
          {/* <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/employees">{currentPageName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Button
        rightIcon={<ArrowForwardIcon />}
        mr={2}
        onClick={goNext}
        ml="auto"
      ></Button>
    </HStack>
  );
};

export default RouterBar;
