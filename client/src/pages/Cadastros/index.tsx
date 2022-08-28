import { Spinner, useBreakpointValue } from "@chakra-ui/react";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { useComms } from "../../providers/comms";
import ButtonGroup from "./ButtonGroup";
import CommsList from "./CommsList";

const Cadastros = () => {
  const { loading } = useComms();

  const bp = useBreakpointValue({
    md: true,
  });

  return (
    <Background>
      <Header />
      {bp && <ButtonGroup />}
      {loading ? (
        <Spinner size="xl" color="blue.500" thickness="3px" />
      ) : (
        <CommsList />
      )}

      <ButtonGroup />
    </Background>
  );
};
export default Cadastros;
