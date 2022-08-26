import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { ISelectProps } from "./interfaces";

const Select = ({
  label,
  name,
  register,
  helperText,
  error,
  ...props
}: ISelectProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel mb={1} color={"gray.900"}>
        {label}
      </FormLabel>
      <ChakraSelect
        name={name}
        border={"2px solid"}
        borderColor={"gray.300"}
        color={"gray.800"}
        bg={"gray.200"}
        {...register(name)}
        {...props}
      />

      {!error ? (
        <FormHelperText mt={1}>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage mt={1} color={"red.500"}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
export default Select;
