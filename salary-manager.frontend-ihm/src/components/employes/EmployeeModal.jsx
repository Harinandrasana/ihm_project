import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";

const EmployeeModal = ({
  isOpen,
  onClose,
  addMod,
  selectedId,
  closeAndRefresh,
}) => {
  const OverlayOne = () => (
    <ModalOverlay
      key="overlayOne"
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"md"}>
      {addMod ? <OverlayTwo /> : <OverlayOne />}
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
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;
