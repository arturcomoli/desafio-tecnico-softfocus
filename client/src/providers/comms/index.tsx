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
import { IFilterInterface } from "../../pages/Cadastros/interfaces";
import { IPatchInterface } from "../../components/Card/interfaces";

const CommsContext = createContext<CommsContextData>({} as CommsContextData);

export const CommsProvider = ({ children }: IChildren) => {
  const [comms, setComms] = useState<IPostResponse[]>([]);
  const [errorInfo, setErrorInfo] = useState<IErrorInfoData>(
    {} as IErrorInfoData
  );
  const [page, setPage] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<IFilterInterface>(
    {} as IFilterInterface
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path, { replace: true });
  };

  const nextPage = (): void => {
    if (filterMode && filterPage >= 1 && filterPage < maxPages)
      return setFilterPage(filterPage + 1);
    if (!filterMode && page >= 1 && page < maxPages) return setPage(page + 1);
  };

  const previousPage = (): void => {
    if (filterMode && filterPage > 1) return setFilterPage(filterPage - 1);
    if (!filterMode && page > 1) return setPage(page - 1);
  };

  const cleanFilters = (): void => {
    setFilterMode(false);
    setFilterData({} as IFilterInterface);
    setPage(1);
  };

  const getFilterData = (data: IFilterInterface) => {
    setFilterMode(true);
    setFilterData(data);
  };

  const filterComms = async (): Promise<void> => {
    const { cpf } = filterData;
    if (filterMode) {
      setLoading(true);
      try {
        const { data } = await api.get<IGetResponse>(
          `/api/perdas/?pagina=${filterPage}&cpf=${cpf}`
        );
        setMaxPages(data.total_paginas);
        setComms(data.resultados);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setFilterMode(false);
        setLoading(false);
      }
    }
  };

  const getComms = async (): Promise<void> => {
    if (!filterMode) {
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
      setErrorInfo(error.response.data.data_colheita);
      onOpen();
      setLoading(false);
    }
  };

  const submitPatch = async (
    data: IPatchInterface,
    id: string
  ): Promise<void> => {
    setLoading(true);
    setErrorInfo({} as IErrorInfoData);

    try {
      console.log(data, id);
      await api.patch<IPostResponse>(`/api/perdas/id/${id}/`, data);
      getComms();
      setLoading(false);
      toast.success("Cadastro atualizado com sucesso!");
    } catch (error: any) {
      console.log(error);
      toast.error("Ops, algo deu errado!");
      setErrorInfo(error.response.data.data_colheita);
      onOpen();
      setLoading(false);
    }
  };

  const deleteComm = async (id: string): Promise<void> => {
    setLoading(true);

    try {
      await api.delete(`/api/perdas/id/${id}/`);
      getComms();
      setLoading(false);
      toast.success("Comunicação deletada com sucesso!");
    } catch (error) {
      toast.error("Ops, algo deu errado!");
      setLoading(false);
    }
  };

  useEffect(() => {
    filterComms();
    getComms();
  }, [page, filterPage, filterMode, filterData]);

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
        cleanFilters,
        getFilterData,
        submitPatch,
        deleteComm,
      }}
    >
      {children}
    </CommsContext.Provider>
  );
};

export const useComms = () => useContext(CommsContext);
