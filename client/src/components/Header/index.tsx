import { ButtonGroup, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logotipo.svg";
import { useComms } from "../../providers/comms";
import Button from "../Button";

const Header = () => {
  const { handleNavigate } = useComms();

  return (
    <Flex
      w="100% "
      bg="gray.400"
      p={5}
      justify="space-around"
      alignItems={{ base: "center" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "15px" }}
    >
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
    </Flex>
  );
};
export default Header;
