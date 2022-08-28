import { ButtonGroup as ChakraButtonGroup } from "@chakra-ui/react";
import Button from "../../components/Button";
import { useComms } from "../../providers/comms";

const ButtonGroup = () => {
  const { previousPage, nextPage } = useComms();
  return (
    <ChakraButtonGroup>
      <Button bg="orange.500" onClick={previousPage}>
        Anterior
      </Button>
      <Button bg="orange.500" onClick={nextPage}>
        Próxima
      </Button>
    </ChakraButtonGroup>
  );
};
export default ButtonGroup;
