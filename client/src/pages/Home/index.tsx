import { ButtonGroup, Flex, Text, VStack } from "@chakra-ui/react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";

import Background from "../../components/Background";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { IRegistrationData } from "./interfaces";
import CustomDatePicker from "../../components/CustomDatePicker";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { useComms } from "../../providers/comms";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .email("E-mail em formato inválido")
    .required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  tipo_lavoura: yup.string().required("Campo obrigatório"),
  data_colheita: yup
    .string()
    .required("Campo obrigatório")
    .transform((value: Date, originalValue) => {
      let newValue = new Date(value);
      let date = new Intl.DateTimeFormat("pt-BR").format(newValue);

      return date;
    }),
  causa_da_perda: yup
    .string()
    .required("Campo obrigatório")
    .min(1, "Campo obrigatório"),
  latitude: yup
    .number()
    .typeError("Campo obrigatório")
    .min(-34, "Este campo deve estar entre -34.000000 e 5.500000")
    .max(5.5, "Este campo deve estar entre -34.000000 e 5.500000")
    .required("Campo obrigatório"),
  longitude: yup
    .number()
    .typeError("Campo obrigatório")
    .min(-74, "Este campo deve estar entre -74.000000 e -35.000000")
    .max(-35, "Este campo deve estar entre -74.000000 e -35.000000")
    .required("Campo obrigatório"),
});

const Home = () => {
  const { submitComm } = useComms();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegistrationData>({ resolver: yupResolver(schema) });
  console.log(errors);
  return (
    <Background>
      <Header />
      <VStack
        as="form"
        onSubmit={handleSubmit(submitComm)}
        border={"2px"}
        p={4}
        borderRadius="lg"
        borderColor="orange.200"
        boxShadow="0px 0px 20px 5px rgba(53,57,61,0.5)"
        spacing={4}
      >
        <Text as="h2" fontSize={"xl"} fontWeight="semibold">
          Formulário de Cadastros de Comunicações
        </Text>
        <Flex gap="25px">
          <VStack w="50%">
            <Input
              label="Nome do Solicitante"
              name="nome"
              helperText="Ex.: João da Silva"
              error={errors.nome?.message}
              register={register}
            />
            <Input
              label="E-mail do Solicitante"
              name="email"
              helperText="Ex.: joao.silva@email.com.br"
              error={errors.email?.message}
              register={register}
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
            />
            <Input
              label="Tipo da Lavoura"
              name="tipo_lavoura"
              helperText="Ex.: Feijão, milho, soja, etc."
              error={errors.tipo_lavoura?.message}
              register={register}
            />
          </VStack>
          <VStack w="50%">
            <Controller
              control={control}
              name="data_colheita"
              render={({ field }) => (
                // <DatePicker {...field} onChange={(e) => field.onChange(e)} />
                <CustomDatePicker
                  {...field}
                  onChange={(e: any) => field.onChange(e)}
                  label="Data da Colheita"
                  helperText="Ex.: 20/08/2022"
                  // name="data_colheita"
                  error={errors.data_colheita?.message}
                  // register={register}
                />
              )}
            />

            <Select
              name="causa_da_perda"
              label="Causa da Perda"
              helperText="Escolha uma das opções"
              error={errors.causa_da_perda?.message}
              register={register}
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
            />
            <Input
              type="number"
              step=".000001"
              label="Longitude da Ocorrência"
              name="longitude"
              helperText="Ex.: -53.623559"
              error={errors.longitude?.message}
              register={register}
            />
          </VStack>
        </Flex>
        <ButtonGroup>
          <Button type="button" bg="orange.500">
            Ir para Cadastro
          </Button>
          <Button type="submit" bg="blue.200">
            Enviar Comunicação
          </Button>
        </ButtonGroup>
      </VStack>
    </Background>
  );
};
export default Home;
