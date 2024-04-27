import {
    useToast,
} from "@chakra-ui/react";

const useNotification = () => {
    const toast = useToast();

    const displayToast = async (toastStatus, message) => {
        toast({
            title: "Succès",
            description: message,
            status: toastStatus,
            duration: 3000,
            isClosable: true,
        });
    }

    return { displayToast };
}

export default useNotification;
