import { Route, Routes } from "react-router-dom";
import Cadastros from "../pages/Cadastros";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastros" element={<Cadastros />} />
    </Routes>
  );
};
export default AppRoutes;
