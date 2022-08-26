import * as yup from "yup";

export const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .email("E-mail em formato inválido")
    .required("Campo obrigatório"),
  cpf: yup
    .string()
    .required("Campo obrigatório")
    .test("valid_cpf", "CPF inválido", (value) => value?.length === 11)
    .transform((value: string, originalValue) => value.replace(/[^\d]/g, "")),

  tipo_lavoura: yup.string().required("Campo obrigatório"),
  data_colheita: yup
    .string()
    .required("Campo obrigatório")
    .transform((value: Date, originalValue) => {
      let newValue = new Date(value);
      let date = new Intl.DateTimeFormat("pt-BR").format(newValue);

      return date;
    })
    .test("valid_data", "Campo obrigatório", (value) => {
      return value?.length === 10;
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
