import React, { useEffect, useState } from "react";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";

function ListarCargos({ value, division, onSelectCargoEmpleado }) {
  const { cargos } = useRecursosHumanos();
  const [cargosFiltrados, setCargosFiltrados] = useState([]);

  const onSelectCargo = (event) => {
    const SelectCargoName = event.target.value;
    const cargoE = cargos.find((cargo) => cargo.name === SelectCargoName);
    onSelectCargoEmpleado(cargoE);
  };

  useEffect(() => {
    if (cargos && division) {
      setCargosFiltrados(
        cargos.filter((cargo) => cargo.departamento_id === division.id)
      );
    } else {
      setCargosFiltrados(cargos);
    }
  }, [division]);

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={onSelectCargo}
      value={value}
    >
      <option value="">Cargo</option>
      {cargosFiltrados
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cargo, indice) => (
          <option key={indice}>{cargo.name}</option>
        ))}
    </select>
  );
}

export { ListarCargos };
