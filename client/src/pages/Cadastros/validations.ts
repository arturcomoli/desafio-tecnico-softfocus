import * as yup from "yup";

export const schema = yup.object().shape({
  cpf: yup
    .string()
    .test("valid_cpf", "CPF inválido", (value) => value?.length === 11)
    .transform((value: string, originalValue) => value.replace(/[^\d]/g, "")),
});
