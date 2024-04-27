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
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const RouterBar = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const goBack = () => {
    navigate(-1);
  };
  const goNext = () => {
    navigate(+1);
  };

  return (
    <HStack
      p={5}
      border={"2px solid #f5e9ff"}
      bg="#f5e9ff"
      mt={4}
      mb={2}
      mr={"auto"}
    >
      <Button leftIcon={<ArrowBackIcon />} onClick={goBack} mr="auto"></Button>
      <Box>
        {/* // montrer la page précedement parcouru et la page suivante parcouru */}
        <HStack>
          <Link to={"/"}>Accueil/</Link>
          {"/"}
          <Link to={"/employees"}>Employees/</Link>
          {"/"}
          <Link to={"/postes"}>Postes/</Link>
          {"/"}
          <Link to={"/deductions"}>Deductions/</Link>
          {"/"}
          <Link to={"paies"}>Paies/</Link>
          {"/"}
        </HStack>
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
