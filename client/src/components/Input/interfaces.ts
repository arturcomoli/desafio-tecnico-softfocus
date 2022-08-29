import { InputProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface IInputprops extends InputProps {
  as?: any;
  mask?: string;
  label?: string;
  icon?: IconType;
  name: string;
  register: any;
  helperText?: string;
  error?: string;
  alwaysShowMask?: boolean;
}
