import { SelectProps } from "@chakra-ui/react";

export interface ISelectProps extends SelectProps {
  label: string;
  name: string;
  register: any;
  helperText: string;
  error?: string;
}
