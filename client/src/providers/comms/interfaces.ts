import { IPatchInterface } from "../../components/Card/interfaces";
import { IFilterInterface } from "../../pages/Cadastros/interfaces";
import { IRegistrationData } from "../../pages/Home/interfaces";

export interface CommsContextData {
  isOpen: boolean;
  loading: boolean;
  errorInfo: IErrorInfoData;
  comms: IPostResponse[];
  onOpen: () => void;
  onClose: () => void;
  nextPage: () => void;
  previousPage: () => void;
  handleNavigate: (path: string) => void;
  submitComm: (data: IRegistrationData) => void;
  cleanFilters: () => void;
  getFilterData: (data: IFilterInterface) => void;
  submitPatch: (data: IPatchInterface, id: string) => Promise<void>;
  deleteComm: (id: string) => Promise<void>;
}

export interface IPostResponse extends IRegistrationData {
  id: string;
  criado_em: string;
}

export interface IErrorInfoData {
  divergencia: {
    causa_existente: string;
    distancia_entre_as_ocorrencias: string;
    id_da_informacao_conflitante: string;
    tentativa_de_cadastro: string;
  };
  mensagem: string;
}

export interface IGetResponse {
  links: {
    proxima: string;
    anterior: string;
  };
  por_pagina: number;
  total_paginas: number;
  total_registros: number;
  resultados: IPostResponse[];
}

// export interface IPatchdata {
//   data: IPatchInterface;
//   id: string;
// }
