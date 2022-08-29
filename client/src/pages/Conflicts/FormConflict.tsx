import {
  ButtonGroup,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import { IPatchInterface } from "../../components/Card/interfaces";
import { schema } from "../../components/Card/validations";
import CustomDatePicker from "../../components/CustomDatePicker";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useComms } from "../../providers/comms";

const FormConflict = () => {
  const [disable, setDisable] = useState<boolean>(true);

  const { id } = useParams();

  const {
    getConflict,
    conflictData,
    submitPatch,
    deleteComm,
    loading,
    handleNavigate,
  } = useComms();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<IPatchInterface>({ resolver: yupResolver(schema) });

  const deleteAndRedirect = () => {
    deleteComm(conflictData?.id);
    handleNavigate("/cadastros/");
  };

  useEffect(() => {
    getConflict(id);
  }, []);

  useEffect(() => {
    if (conflictData) {
      reset(conflictData);
    }
  }, [conflictData]);

  return (
    <>
      {conflictData && (
        <VStack
          id={conflictData.id}
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
                defaultValue={conflictData.nome}
                isDisabled={disable}
              />
              <Input
                label="E-mail do Solicitante"
                name="email"
                helperText="Ex.: joao@email.com.br"
                error={errors.email?.message}
                register={register}
                defaultValue={conflictData.email}
                isDisabled={disable}
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
                defaultValue={conflictData.cpf}
                isDisabled={disable}
              />
              <Input
                label="Tipo da Lavoura"
                name="tipo_lavoura"
                helperText="Ex.: Feijão, milho, soja, etc."
                error={errors.tipo_lavoura?.message}
                register={register}
                defaultValue={conflictData.tipo_lavoura}
                isDisabled={disable}
              />
            </VStack>
            <VStack w="50%">
              <Controller
                control={control}
                name="data_colheita"
                defaultValue={conflictData.data_colheita}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    onChange={(e: string) => field.onChange(e)}
                    label="Data da Colheita"
                    helperText="Ex.: 20/08/2022"
                    error={errors.data_colheita?.message}
                    isDisabled={disable}
                  />
                )}
              />

              <Select
                name="causa_da_perda"
                label="Causa da Perda"
                helperText="Escolha uma das opções"
                error={errors.causa_da_perda?.message}
                register={register}
                defaultValue={conflictData.causa_da_perda}
                isDisabled={disable}
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
                defaultValue={conflictData.latitude}
                isDisabled={disable}
              />
              <Input
                type="number"
                step=".000001"
                label="Longitude da Ocorrência"
                name="longitude"
                helperText="Ex.: -53.623559"
                error={errors.longitude?.message}
                register={register}
                defaultValue={conflictData.longitude}
                isDisabled={disable}
              />
            </VStack>
          </Flex>
          <Input
            w="50%"
            label="Criado Em"
            name="criado_em"
            error={errors.longitude?.message}
            register={register}
            defaultValue={conflictData.criado_em}
            isDisabled
          />
          <Checkbox
            size="lg"
            colorScheme="green"
            // defaultChecked={disable}
            onChange={(e) => setDisable(!e.target.checked)}
          >
            Alterar dados do Cadastro
          </Checkbox>
          <ButtonGroup w={{ base: "100%" }} justifyContent="space-between">
            <HStack>
              <Button
                type="button"
                bg="gray.500"
                onClick={() => handleNavigate("/")}
              >
                Voltar
              </Button>
              <Button type="button" bg="red.500" onClick={deleteAndRedirect}>
                Deletar
              </Button>
            </HStack>
            <Button
              isDisabled={disable}
              type="submit"
              bg="blue.200"
              isLoading={loading}
            >
              Enviar
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </>
  );
};

export default FormConflict;
