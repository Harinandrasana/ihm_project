import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  HStack,
  Button,
  Container,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import apiClient from "../../services/api-client";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import useNotification from "../../hooks/useNotification";
import { Link } from "react-router-dom";

const Modal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { displayToast } = useNotification();
  const closeAndRefresh = () => {
    onClose();
    getEmployees();
  };

  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        {overlay}
        <ModalContent maxW={"600px"}>
          <ModalHeader textAlign="center">
            <Text>
              {addMod
                ? "Formulaire d'ajout d'employé"
                : `Modification de l'employé ${selectedId}`}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody ml={"auto"} mr={"auto"}>
            {addMod ? (
              <EmployeeAdd onClose={closeAndRefresh} />
            ) : (
              <EmployeeEdit employeeId={selectedId} onClose={closeAndRefresh} />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Modal;
