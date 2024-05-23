import { ListadoEmpleados } from "./components/empleados/ListadoEmpleados";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AgregarEmpleado } from "./components/empleados/AgregarEmpleado";
import { EditarEmpleado } from "./components/empleados/EditarEmpleado";
import { RecursosHumanosProvider } from "./context/RecursosHumanosContext";
import { Sidebar } from "./components/plantilla/Sidebar";
import { AgregarDepartamento } from "./components/departamentos/AgregarDepartamento";
import { AgregarCargo } from "./components/cargos/AgregarCargo";
import { AuthS } from "./components/auth/AuthS";
import ".//style.css";
import { useEffect, useState } from "react";
import { EditAccount } from "./components/account/EditAccount";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <RecursosHumanosProvider>
      <BrowserRouter>
        {session && <Sidebar session={session} setSession={setSession} />}
        <Routes>
          <Route
            path="/login"
            element={<AuthS session={session} setSession={setSession} />}
          />
          <Route
            path="/"
            element={session ? <ListadoEmpleados /> : <Navigate to="/login" />}
          />
          <Route
            path="/create/employee"
            element={session ? <AgregarEmpleado /> : <Navigate to="/login" />}
          />
          <Route
            path="/create/division"
            element={
              session ? <AgregarDepartamento /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create/position"
            element={session ? <AgregarCargo /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/employee/:id"
            element={session ? <EditarEmpleado /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/account"
            element={
              session ? (
                <EditAccount session={session} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </RecursosHumanosProvider>
  );
}

export default App;
