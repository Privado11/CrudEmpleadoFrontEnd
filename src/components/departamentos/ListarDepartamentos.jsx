import React, { useState } from "react";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";

function ListarDepartamentos({ value, onSelectDepartamentoEmpleado }) {
  const { departamentos } = useRecursosHumanos();

  const onSelectDepartamento = (event) => {
    const SelectDepartamentoName = event.target.value;
    const departamentoE = departamentos.find(
      (departamento) => departamento.name === SelectDepartamentoName
    );
    onSelectDepartamentoEmpleado(departamentoE);
  };

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={onSelectDepartamento}
      value={value}
    >
      <option value="">Departamento</option>
      {departamentos
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((departamento, indice) => (
          <option key={indice}>{departamento.name}</option>
        ))}
    </select>
  );
}

export { ListarDepartamentos };
