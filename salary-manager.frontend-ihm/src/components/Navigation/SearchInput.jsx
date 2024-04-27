import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef(null);
  const setSearchText = "";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ref.current) {
      setSearchText(ref.current.value);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius="20px"
          placeholder="Search..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
