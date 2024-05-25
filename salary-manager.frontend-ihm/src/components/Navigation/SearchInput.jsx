import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import EmployeeGrid from "../employes/EmployeeGrid";

const SearchInput = () => {
  // const ref = useRef(null);
  // const setSearchText = "";
  // const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (ref.current) {
  //     setSearchText(ref.current.value);
  //     navigate("/");
  //   }
  // };


  const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (e) => {
      let val = e.target.value;
      setSearchTerm(val);
    };

  

  console.log(searchTerm);

  // const [id, setId] = useState('');
  // const [nom, setNom] = useState('');
  // const [salaire, setSalaire] = useState('');
  // const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //     try {
  //         const response = await apiClient.get(`/searchP?idPoste=${id}&nomPoste=${nom}&salaire=${salaire}`);
  //         setResults(response.data);
  //         navigate("/");
  //     } catch (error) {
  //         console.error('Erreur lors de la recherche:', error);
  //     }
  // };


  return (
    <>
      <form> {/* onSubmit={handleSubmit} */}
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            // ref={ref}
            borderRadius="20px"
            placeholder="Search..."
            variant="filled"
            onChange={handleSearchTerm}
          />
        </InputGroup>
      </form>
    </>

    
  );
};

export default SearchInput;


// import React, { useState } from 'react';
// import axios from 'axios';

// function SearchPosts() {
//     const [id, setId] = useState('');
//     const [nom, setNom] = useState('');
//     const [salaire, setSalaire] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`/postes?id=${id}&nom=${nom}&salaire=${salaire}`);
//             setResults(response.data);
//         } catch (error) {
//             console.error('Erreur lors de la recherche:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Recherche de Postes</h2>
//             <form onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSearch();
//             }}>
//                 <label>ID:</label>
//                 <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
//                 <br />
//                 <label>Nom:</label>
//                 <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
//                 <br />
//                 <label>Salaire:</label>
//                 <input type="number" value={salaire} onChange={(e) => setSalaire(e.target.value)} />
//                 <br />
//                 <button type="submit">Rechercher</button>
//             </form>
//             <ul>
//                 {results.map((result, index) => (
//                     <li key={index}>
//                         ID: {result.idPoste}, Nom: {result.nomPoste}, Salaire: {result.salaire}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default SearchPosts;
