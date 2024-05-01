import React, { useEffect, useState } from "react";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";

function ListarCargos({ value, departamento, onSelectCargoEmpleado }) {
  const { cargos } = useRecursosHumanos();
  const [cargosFiltrados, setCargosFiltrados] = useState([]);

  const onSelectCargo = (event) => {
    const SelectCargoName = event.target.value;
    const cargoE = cargos.find((cargo) => cargo.nombre === SelectCargoName);
    onSelectCargoEmpleado(cargoE);
  };

  useEffect(() => {
    if (cargos && departamento) {
      setCargosFiltrados(
        cargos.filter((cargo) => cargo.departamento.id === departamento.id)
      );
    } else {
      setCargosFiltrados(cargos);
    }
  }, [departamento]);

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
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map((cargo, indice) => (
          <option key={indice}>{cargo.nombre}</option>
        ))}
    </select>
  );
}

export { ListarCargos };
