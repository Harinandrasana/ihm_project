import {
  Popover as CustomMenu,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

const CustomMenu = ({ buttonContent, popoverContent }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box mt={20}>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button mr={5} onMouseEnter={onToggle} onMouseLeave={onClose}>
            {buttonContent}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>{popoverContent}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CustomMenu;
