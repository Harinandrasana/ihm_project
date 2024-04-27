// import React from "react";
// import {
//   TableContainer,
//   Table,
//   Tr,
//   Th,
//   Thead,
//   Tbody,
//   Td,
//   HStack,
//   Button,
//   Container,
//   Text,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   useMediaQuery,
// } from "@chakra-ui/react";

// const EmployeeTable = () => {
//   return (
//     <>
//       {/* Tableau d'affichage des employés */}
//       <TableContainer
//         pt={5}
//         p={5}
//         mr={10}
//         textAlign={"center"}
//         border="4px solid #f2f2f2"
//         boxShadow={10}
//         outline={10}
//         rounded={16}
//         color="black"
//       >
//         <Table variant="simple">
//           <Thead h={58}>
//             <Tr verticalAlign="middle" borderBottom="2px solid #f3f2f2">
//               <Th>Identifiant</Th>
//               <Th>Poste</Th>
//               <Th>Nom</Th>
//               <Th>Prénom</Th>
//               <Th>Adresse</Th>
//               <Th>Téléphone</Th>
//               <Th>Email</Th>
//               <Th>Date d'embauche</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {employees.map((employee) => (
//               <Tr key={employee.idEmploye} borderBottom="2px solid #f3f2f2">
//                 <Td verticalAlign="middle">{employee.idEmploye}</Td>
//                 <Td verticalAlign="middle">{employee.idPoste}</Td>
//                 <Td verticalAlign="middle">{employee.nom}</Td>
//                 <Td verticalAlign="middle">{employee.prenom}</Td>
//                 <Td verticalAlign="middle">{employee.adresse}</Td>
//                 <Td verticalAlign="middle">{employee.email}</Td>
//                 <Td verticalAlign="middle">{employee.tel}</Td>
//                 <Td verticalAlign="middle">{employee.dateEmbauche}</Td>
//                 <Td verticalAlign="middle">
//                   <HStack spacing={8}>
//                     <Button
//                       bg="#2388f6"
//                       onClick={() => {
//                         setSelectedId(employee.idEmploye);
//                         setOverlay(<OverlayTwo />);
//                         setAddMode(false);
//                         onOpen();
//                       }}
//                     >
//                       <EditIcon />
//                     </Button>
//                     <Button
//                       bg="#dc1f09"
//                       onClick={() => deleteEmployee(employee.idEmploye)}
//                     >
//                       <DeleteIcon />
//                     </Button>
//                     {/* <Button
//                       bg="olive"
//                       onClick={() => handleSubmit(employee.idEmploye)}
//                     >
//                       Payer
//                     </Button> */}
//                   </HStack>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default EmployeeTable;
