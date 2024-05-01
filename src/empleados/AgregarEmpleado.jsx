import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListarCargos } from "../cargos/ListarCargos";
import { ListarDepartamentos } from "../departamentos/ListarDepartamentos";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";

function AgregarEmpleado() {
  let navegacion = useNavigate();
  const { saveEmpleado } = useRecursosHumanos();
  const [departamento, setDepartamento] = useState();
  const [empleado, setEmpleado] = useState({
    codigo: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    cargo: "",
    sueldo: "",
  });

  const {
    codigo,
    nombre,
    apellido,
    direccion,
    telefono,
    email,
    cargo,
    sueldo,
  } = empleado;

  const onInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSelectDepartamentoEmpleado = (selectedDepartamento) => {
    setDepartamento(selectedDepartamento);
  };

  const onSelectCargoEmpleado = (selectedCargo) => {
    setEmpleado({ ...empleado, cargo: selectedCargo });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await saveEmpleado(empleado);
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Agregar Empleado</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">
            Codigo Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            required={true}
            value={codigo}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            required={true}
            value={apellido}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono Empleado
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Empleado
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
          <label htmlFor="departamento" className="form-label">
            Departamento Empleado
          </label>
          <ListarDepartamentos
            onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">
            Cargo Empleado
          </label>
          <ListarCargos value={cargo} departamento={departamento} />
        </div>
        <div className="mb-3">
          <label htmlFor="sueldo" className="form-label">
            Sueldo Empleado
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="sueldo"
            name="sueldo"
            required={true}
            value={sueldo}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar Empleado
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

export { AgregarEmpleado };
