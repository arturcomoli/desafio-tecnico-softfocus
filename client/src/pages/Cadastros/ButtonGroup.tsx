import {
  ButtonGroup as ChakraButtonGroup,
  Flex,
  HStack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useComms } from "../../providers/comms";
import { schema } from "./validations";
import { IButtonGroupProps, IFilterInterface } from "./interfaces";
import { useEffect } from "react";

const ButtonGroup = ({ showFilter, showButton }: IButtonGroupProps) => {
  const { previousPage, nextPage, cleanFilters, getFilterData } = useComms();

  const cleanButton = useBreakpointValue({
    base: true,
    md: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFilterInterface>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isSubmitSuccessful) reset({ cpf: "" });
  }, [isSubmitSuccessful]);

  return (
    <VStack w="70%" justifyContent="flex-end">
      {showFilter && (
        <Flex
          w="100%"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: 5, md: 0 }}
        >
          {!cleanButton && (
            <Button type="button" bg="gray.500" onClick={cleanFilters}>
              Limpar Filtro
            </Button>
          )}
          <HStack
            as="form"
            w={{ base: "220px" }}
            // alignSelf={{ base: "center", md: "flex-end" }}
            alignItems="center"
            onSubmit={handleSubmit(getFilterData)}
          >
            <Input
              as={InputMask}
              mask="999.999.999-99"
              alwaysShowMask
              label="Filtrar pelo CPF"
              name="cpf"
              helperText="Ex.: 123.456.789-10"
              error={errors.cpf?.message}
              register={register}
            />
            <Button type="submit" bg="green.400">
              Filtrar
            </Button>
          </HStack>
          {cleanButton && (
            <Button type="button" bg="gray.500" onClick={cleanFilters}>
              Limpar Filtro
            </Button>
          )}
        </Flex>
      )}
      {showButton && (
        <ChakraButtonGroup
          mb={!showFilter ? "25px" : "0px"}
          w="100%"
          justifyContent="space-between"
        >
          <Button bg="orange.500" onClick={previousPage}>
            Anterior
          </Button>
          <Button bg="orange.500" onClick={nextPage}>
            Próxima
          </Button>
        </ChakraButtonGroup>
      )}
    </VStack>
  );
};
export default ButtonGroup;
