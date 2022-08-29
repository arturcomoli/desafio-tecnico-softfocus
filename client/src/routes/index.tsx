import { Route, Routes } from "react-router-dom";
import Cadastros from "../pages/Cadastros";
import Conflicts from "../pages/Conflicts";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastros" element={<Cadastros />} />
      <Route path="verificar-conflito/:id" element={<Conflicts />} />
    </Routes>
  );
};
export default AppRoutes;
