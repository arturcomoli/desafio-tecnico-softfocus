import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { useComms } from "../../providers/comms";

const Conflicts = () => {
  const { id } = useParams();

  const { getConflict, conflictData } = useComms();

  useEffect(() => {
    getConflict(id);
  }, []);

  console.log(conflictData);

  return (
    <Background>
      <Header />
    </Background>
  );
};
export default Conflicts;
