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
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path, { replace: true });
  };

  const nextPage = (): void => {
    if (page >= 1 && page < maxPages) setPage(page + 1);
  };

  const previousPage = (): void => {
    if (page > 1) setPage(page - 1);
  };

  const getComms = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await api.get<IGetResponse>(
        `/api/perdas/?pagina=${page}`
      );
      setMaxPages(data.total_paginas);
      setComms(data.resultados);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const submitComm = async (data: IRegistrationData): Promise<void> => {
    setLoading(true);
    setErrorInfo({} as IErrorInfoData);
    try {
      const { data: apiData } = await api.post<IPostResponse>(
        "/api/perdas/",
        data
      );
      setComms([...comms, apiData]);
      toast.success("Comunicação cadastrada com sucesso!");
      setLoading(false);
    } catch (error: any) {
      toast.error("Ops, algo deu errado!");
      onOpen();
      setErrorInfo(error.response.data.data_colheita);
      setLoading(false);
    }
  };

  useEffect(() => {
    getComms();
  }, [page]);

  return (
    <CommsContext.Provider
      value={{
        loading,
        handleNavigate,
        submitComm,
        isOpen,
        onOpen,
        onClose,
        errorInfo,
        comms,
        nextPage,
        previousPage,
      }}
    >
      {children}
    </CommsContext.Provider>
  );
};

export const useComms = () => useContext(CommsContext);
