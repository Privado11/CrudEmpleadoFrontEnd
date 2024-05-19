import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListarCargos } from "../cargos/ListarCargos";
import { ListarDepartamentos } from "../departamentos/ListarDepartamentos";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";
import "../styles/empleados/agregarEmpleado.css";

function AgregarEmpleado() {
  let navegacion = useNavigate();
  const { saveEmpleado } = useRecursosHumanos();
  const [division, setDivision] = useState();
  const [empleado, setEmpleado] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    cargo_id: "",
    salary: "",
  });

  const { code, name, address, phone, email, cargo_id, salary } = empleado;

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
    await saveEmpleado(empleado);
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Add Employee</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code Employed
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            required={true}
            value={code}
            onChange={(e) => onInputChange(e)}
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
            required={true}
            value={name}
            onChange={(e) => onInputChange(e)}
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
            value={address}
            onChange={(e) => onInputChange(e)}
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
            value={phone}
            onChange={(e) => onInputChange(e)}
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
            required={true}
            value={email}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="division" className="form-label">
            Division Employed
          </label>
          <ListarDepartamentos
            onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">
            Position Employed
          </label>
          <ListarCargos
            value={cargo_id}
            division={division}
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
            required={true}
            value={salary}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Save Employee
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

export { AgregarEmpleado };
