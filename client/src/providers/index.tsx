import { CommsProvider } from "./comms";
import { IChildren } from "./interfaces";

const Providers = ({ children }: IChildren) => {
  return <CommsProvider>{children}</CommsProvider>;
};
export default Providers;
