import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { ICustomDatePickerProps } from "./interfaces";

import "moment/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";
import { DatePicker } from "antd";

const CustomDatePicker = ({
  error,
  helperText,
  onChange,
  // name,
  label,
}: // register,
ICustomDatePickerProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel mb={1} color={"gray.900"}>
        {label}
      </FormLabel>
      <Box
        bg="gray.200"
        border={"2px solid"}
        borderColor={!error ? "gray.300" : "#F24C3D"}
        boxShadow={error && "0 0 0 1px #f24c3d;"}
        color={"gray.800"}
        borderRadius="md"
        _focusWithin={{ border: "3px solid", borderColor: "blue.500" }}
      >
        <DatePicker
          locale={locale}
          format="DD/MM/yyyy"
          style={{ width: "100%", background: "transparent" }}
          onChange={onChange}
        />
      </Box>
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

export default CustomDatePicker;
