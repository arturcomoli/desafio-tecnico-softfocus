import { createContext, useContext, useEffect, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { IRegistrationData } from "../../pages/Home/interfaces";
import api from "../../services/api";
import { IChildren } from "../interfaces";
import {
  CommsContextData,
  IErrorInfoData,
  IGetResponse,
  IPostResponse,
} from "./interfaces";

const CommsContext = createContext<CommsContextData>({} as CommsContextData);

export const CommsProvider = ({ children }: IChildren) => {
  const [comms, setComms] = useState<IPostResponse[]>([]);
  const [errorInfo, setErrorInfo] = useState<IErrorInfoData>(
    {} as IErrorInfoData
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path, { replace: true });
  };

  const getComms = async () => {
    try {
      const { data } = await api.get<IGetResponse>("/api/perdas/");
      setComms(data.resultados);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComm = async (data: IRegistrationData) => {
    setErrorInfo({} as IErrorInfoData);
    try {
      const { data: apiData } = await api.post<IPostResponse>(
        "/api/perdas/",
        data
      );
      setComms([...comms, apiData]);
      toast.success("Comunicação cadastrada com sucesso!");
    } catch (error: any) {
      toast.error("Ops, algo deu errado!");
      onOpen();
      setErrorInfo(error.response.data.data_colheita);
    }
  };

  useEffect(() => {
    getComms();
  }, []);

  return (
    <CommsContext.Provider
      value={{ handleNavigate, submitComm, isOpen, onOpen, onClose, errorInfo }}
    >
      {children}
    </CommsContext.Provider>
  );
};

export const useComms = () => useContext(CommsContext);
