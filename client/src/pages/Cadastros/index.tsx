import { Spinner, useBreakpointValue } from "@chakra-ui/react";
import Background from "../../components/Background";
import ErrorModal from "../../components/ErrorModal";
import Header from "../../components/Header";
import { useComms } from "../../providers/comms";
import ButtonGroup from "./ButtonGroup";
import CommsList from "./CommsList";

const Cadastros = () => {
  const { loading } = useComms();

  const showButton = useBreakpointValue({
    md: true,
  });

  return (
    <Background>
      <Header />
      <ButtonGroup showFilter showButton={showButton} />
      {loading ? (
        <Spinner size="xl" color="blue.500" thickness="3px" />
      ) : (
        <CommsList />
      )}

      <ButtonGroup showButton />
      <ErrorModal />
    </Background>
  );
};
export default Cadastros;
