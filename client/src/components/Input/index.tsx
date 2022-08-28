import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IInputprops } from "./interfaces";

const Input = ({
  as,
  mask,
  alwaysShowMask,
  label,
  icon: Icon,
  name,
  register,
  helperText,
  error,
  ...props
}: IInputprops) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel mb={0} color={"gray.900"}>
        {label}
      </FormLabel>
      <InputGroup>
        {Icon && (
          <InputLeftElement>
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          as={as}
          mask={mask}
          alwaysShowMask={alwaysShowMask}
          name={name}
          size={"md"}
          border={"2px solid"}
          borderColor={"gray.300"}
          color={"gray.800"}
          bg={"gray.200"}
          outline={"none"}
          {...register(name)}
          {...props}
        />
      </InputGroup>
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
export default Input;
