import { Flex } from "@chakra-ui/react";
import Card from "../../components/Card";
import { useComms } from "../../providers/comms";

const CommsList = () => {
  const { comms } = useComms();

  return (
    <Flex
      as="ul"
      px={{ base: 5 }}
      wrap={{ md: "wrap" }}
      gap={5}
      justifyContent={{ md: "center" }}
      overflow={{ base: "auto", md: "initial" }}
      w="100%"
    >
      {comms.map(
        ({
          id,
          nome,
          cpf,
          email,
          tipo_lavoura,
          criado_em,
          causa_da_perda,
          data_colheita,
          latitude,
          longitude,
        }) => (
          <Card
            key={id}
            id={id}
            nome={nome}
            cpf={cpf}
            email={email}
            causa_da_perda={causa_da_perda}
            criado_em={criado_em}
            data_colheita={data_colheita}
            tipo_lavoura={tipo_lavoura}
            latitude={latitude}
            longitude={longitude}
          />
        )
      )}
    </Flex>
  );
};
export default CommsList;
