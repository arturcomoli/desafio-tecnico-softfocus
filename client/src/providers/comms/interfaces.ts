import { IRegistrationData } from "../../pages/Home/interfaces";

export interface CommsContextData {
  handleNavigate: (path: string) => void;
  submitComm: (data: IRegistrationData) => void;
}
