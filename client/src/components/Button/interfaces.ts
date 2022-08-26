import { ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface IButtonProps extends ButtonProps {
  children: ReactNode;
}
