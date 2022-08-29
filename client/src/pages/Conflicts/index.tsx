import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { useComms } from "../../providers/comms";
import FormConflict from "./FormConflict";

const Conflicts = () => {
  const { errorInfo } = useComms();

  return (
    <Background>
      <Header />
      {errorInfo && <FormConflict />}
    </Background>
  );
};
export default Conflicts;
