import { ButtonGroup, HStack, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logotipo.svg";
import { useComms } from "../../providers/comms";
import Button from "../Button";

const Header = () => {
  const { handleNavigate } = useComms();

  return (
    <HStack w="100% " bg="gray.400" p={5} justify="space-around">
      <Image src={Logo} alt="logotipo" w="200px" />
      <ButtonGroup spacing={14}>
        <Button
          color="gray.800"
          bg="gray.600"
          onClick={() => handleNavigate("/")}
        >
          Início
        </Button>
        <Button
          color="gray.800"
          bg="gray.600"
          onClick={() => handleNavigate("/cadastros")}
        >
          Cadastros
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
export default Header;
