import {
  ButtonGroup,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useComms } from "../../providers/comms";
import InputMask from "react-input-mask";

import Button from "../Button";
import CustomDatePicker from "../CustomDatePicker";
import ErrorModal from "../ErrorModal";
import Input from "../Input";
import Select from "../Select";
import { IDetailsModal, IPatchInterface } from "./interfaces";
import { schema } from "./validations";
import { FormEvent, forwardRef, useRef } from "react";

const FormDetails = ({
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
  onClose,
}: IDetailsModal) => {
  const { loading, submitPatch, deleteComm } = useComms();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IPatchInterface>({ resolver: yupResolver(schema) });

  return (
    <VStack
      id={id}
      w={{ base: "90%", sm: "auto" }}
      as="form"
      onSubmit={handleSubmit((data, e) => submitPatch(data, e?.target.id))}
      p={4}
      spacing={4}
    >
      <Text as="h2" fontSize={"xl"} fontWeight="semibold">
        Alteração do Cadastro
      </Text>
      <Flex gap="25px">
        <VStack w="50%">
          <Input
            label="Nome do Solicitante"
            name="nome"
            helperText="Ex.: João da Silva"
            error={errors.nome?.message}
            register={register}
            defaultValue={nome}
          />
          <Input
            label="E-mail do Solicitante"
            name="email"
            helperText="Ex.: joao@email.com.br"
            error={errors.email?.message}
            register={register}
            defaultValue={email}
          />
          <Input
            as={InputMask}
            mask="999.999.999-99"
            alwaysShowMask
            label="CPF do Solicitante"
            name="cpf"
            helperText="Ex.: 123.456.789-10"
            error={errors.cpf?.message}
            register={register}
            defaultValue={cpf}
          />
          <Input
            label="Tipo da Lavoura"
            name="tipo_lavoura"
            helperText="Ex.: Feijão, milho, soja, etc."
            error={errors.tipo_lavoura?.message}
            register={register}
            defaultValue={tipo_lavoura}
          />
        </VStack>
        <VStack w="50%">
          <Controller
            control={control}
            name="data_colheita"
            defaultValue={data_colheita}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                onChange={(e: string) => field.onChange(e)}
                label="Data da Colheita"
                helperText="Ex.: 20/08/2022"
                error={errors.data_colheita?.message}
              />
            )}
          />

          <Select
            name="causa_da_perda"
            label="Causa da Perda"
            helperText="Escolha uma das opções"
            error={errors.causa_da_perda?.message}
            register={register}
            defaultValue={causa_da_perda}
          >
            <option value={""}>-----------------</option>
            <option value="CHUVA EXCESSIVA">CHUVA EXCESSIVA</option>
            <option value="GEADA">GEADA</option>
            <option value="GRANIZO">GRANIZO</option>
            <option value="SECA">SECA</option>
            <option value="VENDAVAL">VENDAVAL</option>
            <option value="RAIO">RAIO</option>
          </Select>
          <Input
            type="number"
            step=".000001"
            label="Latitude da Ocorrência"
            name="latitude"
            helperText="Ex.: -22.402736"
            error={errors.latitude?.message}
            register={register}
            defaultValue={latitude}
          />
          <Input
            type="number"
            step=".000001"
            label="Longitude da Ocorrência"
            name="longitude"
            helperText="Ex.: -53.623559"
            error={errors.longitude?.message}
            register={register}
            defaultValue={longitude}
          />
        </VStack>
      </Flex>
      <ButtonGroup w={{ base: "100%" }} justifyContent="space-between">
        <HStack>
          <Button type="button" bg="gray.500" onClick={onClose}>
            Fechar
          </Button>
          <Button type="button" bg="red.500" onClick={() => deleteComm(id)}>
            Deletar
          </Button>
        </HStack>
        <Button type="submit" bg="blue.200" isLoading={loading}>
          Enviar
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
export default FormDetails;
