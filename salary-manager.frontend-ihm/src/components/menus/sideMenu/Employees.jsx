import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { BiGroup } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";

const Employees = () => {
  const [activeItem, setActiveItem] = useState(null);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          bg="none"
          verticalAlign="middle"
          mt={20}
          color="white"
          fontSize={22}
          {...(activeItem === "Employes" && {
            color: "#bcc0c3",
            fontWeight: 500,
            transform: "scale(1.5)",
          })}
          _hover={{
            transform: "scale(1.3)",
            transition: "transform .15s ease-in",
          }}
          onMouseEnter={onToggle}
          onMouseLeave={onClose}
        >
          <Icon as={BiGroup} boxSize={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        maxW={200}
        rounded={16}
        border={"none"}
        outline={"none"}
        boxShadow={"none"}
      >
        <PopoverArrow />
        <PopoverBody bg={"black"} px={10} rounded={16}>
          Employes
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Employees;
