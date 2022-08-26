import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IRegistrationData } from "../../pages/Home/interfaces";
import { IChildren } from "../interfaces";
import { CommsContextData } from "./interfaces";

const CommsContext = createContext<CommsContextData>({} as CommsContextData);

export const CommsProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path, { replace: true });
  };

  const submitComm = (data: IRegistrationData) => {
    console.log(data);
  };

  return (
    <CommsContext.Provider value={{ handleNavigate, submitComm }}>
      {children}
    </CommsContext.Provider>
  );
};

export const useComms = () => useContext(CommsContext);
