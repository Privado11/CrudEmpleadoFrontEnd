import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";
import { ListarDepartamentos } from "../departamentos/ListarDepartamentos";
import { ListarCargos } from "../cargos/ListarCargos";

function EditarEmpleado() {
  let navegacion = useNavigate();
  const { getEmpleadoById, putEmpleado } = useRecursosHumanos();
  const [division, setDivision] = useState(null);
  const [empleado, setEmpleado] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    cargo_id: "",
    cargos: null,
    salary: "",
  });
  const { id } = useParams();

  const cargarEmpleado = async () => {
    try {
      const empleado = await getEmpleadoById(id);
      setEmpleado(empleado[0]);
    } catch (error) {
      console.error("Error loading employee data:", error);
    }
  };

  useEffect(() => {
    cargarEmpleado();
  }, []);

  useEffect(() => {
    setDivision(empleado.cargos?.departamentos);
  }, [empleado]);

  const onInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSelectDepartamentoEmpleado = (selectedDepartamento) => {
    setDivision(selectedDepartamento);
  };

  const onSelectCargoEmpleado = (selectedCargo) => {
    setEmpleado({ ...empleado, cargo_id: selectedCargo.id });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await putEmpleado(id, empleado);
      navegacion("/");
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const { code, name, address, phone, email, cargos, salary } = empleado;

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Edit Employed</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code Employed
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            required
            value={code || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name Employed
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={name || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address Employed
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Employed
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={phone || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Employed
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={email || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="division" className="form-label">
            Division Employed
          </label>
          <ListarDepartamentos
            value={
              cargos && cargos.departamentos
                ? division
                  ? division.name
                  : cargos.departamentos.name
                : ""
            }
            onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">
            Position Employed
          </label>
          <ListarCargos
            value={cargos ? cargos.name : ""}
            division={
              cargos && cargos.departamentos
                ? division
                  ? division
                  : cargos.division
                : ""
            }
            onSelectCargoEmpleado={onSelectCargoEmpleado}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary Employed
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="salary"
            name="salary"
            required
            value={salary || ""}
            onChange={onInputChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Save
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

export { EditarEmpleado };
