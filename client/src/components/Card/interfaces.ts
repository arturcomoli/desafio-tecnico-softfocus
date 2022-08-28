import { AlertDialogProps } from "@chakra-ui/react";
import { ReactNode, RefObject } from "react";

export interface IPatchInterface {
  nome?: string;
  cpf?: string;
  email?: string;
  tipo_lavoura?: string;
  data_colheita?: string;
  causa_da_perda?: string;
  latitude?: number;
  longitude?: number;
}

export interface IDetailsModal extends IPatchInterface {
  criado_em: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IDeleteAlert extends AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement> | null;
  children: ReactNode;
}
