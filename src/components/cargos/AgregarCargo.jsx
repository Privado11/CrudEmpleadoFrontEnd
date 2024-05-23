import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";
import { ListarDepartamentos } from "../departamentos/ListarDepartamentos";

function AgregarCargo() {
  const navigate = useNavigate();
  const { saveCargo } = useRecursosHumanos();
  const [position, setPosition] = useState({ name: "", departamento_id: "" });

  const { name, departamento_id } = position;

  const onInputChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  const onSelectDepartamentoEmpleado = (selectedDepartamento) => {
    setPosition({ ...position, departamento_id: selectedDepartamento.id });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await saveCargo(position);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Add Position</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name Position
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={name}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departamento_id" className="form-label">
            Department
          </label>
          <ListarDepartamentos
            onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Save Position
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

export { AgregarCargo };
