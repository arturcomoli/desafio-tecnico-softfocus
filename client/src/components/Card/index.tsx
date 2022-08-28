import { ButtonGroup, Text, VStack } from "@chakra-ui/react";
import { IPostResponse } from "../../providers/comms/interfaces";
import Button from "../Button";

const Card = ({
  nome,
  cpf,
  email,
  tipo_lavoura,
  data_colheita,
  causa_da_perda,
  latitude,
  longitude,
  criado_em,
  id,
}: IPostResponse) => {
  return (
    <VStack as="li" p={3} border="2px solid" borderRadius="md" minW="325px">
      <Text>
        <Text fontWeight="bold" as="span">
          Nome do Solicitante:
        </Text>{" "}
        {nome}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          CPF do Solicitante:
        </Text>{" "}
        {cpf}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          E-mail do Solicitante:
        </Text>{" "}
        {email}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Tipo de Lavoura:
        </Text>{" "}
        {tipo_lavoura}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Data da Colheita:
        </Text>{" "}
        {data_colheita}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Causa Informada:
        </Text>{" "}
        {causa_da_perda}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Latitude:
        </Text>{" "}
        {latitude}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Longitude:
        </Text>{" "}
        {longitude}
      </Text>
      <Text>
        <Text fontWeight="bold" as="span">
          Criado em:
        </Text>{" "}
        {criado_em}
      </Text>
      <Button bg="blue.300">Ver Detalhes</Button>
    </VStack>
  );
};
export default Card;
