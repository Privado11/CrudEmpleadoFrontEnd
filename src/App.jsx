import { ListadoEmpleados } from "./empleados/ListadoEmpleados";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AgregarEmpleado } from "./empleados/AgregarEmpleado";
import { EditarEmpleado } from "./empleados/EditarEmpleado";
import { RecursosHumanosProvider } from "./context/RecursosHumanosContext";
import { Sidebar } from "./plantilla/Sidebar";
import ".//style.css";

function App() {
  return (
    <RecursosHumanosProvider>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ListadoEmpleados />} />
          <Route path="/create/employee" element={<AgregarEmpleado />} />
          <Route path="/editar/:id" element={<EditarEmpleado />} />
        </Routes>
      </BrowserRouter>
    </RecursosHumanosProvider>
  );
}

export default App;
