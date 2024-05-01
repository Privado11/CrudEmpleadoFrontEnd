import React, { useState } from "react";
import { ListarDepartamentos } from "../departamentos/ListarDepartamentos";
import { ListarCargos } from "../cargos/ListarCargos";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";

function FiltrarEmpleados({
  onSelectCargoEmpleado,
  onSelectDepartamentoEmpleado,
}) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "30px",
        marginBottom: "10px",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <ListarDepartamentos
          onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
        />
      </div>
      <div>
        <ListarCargos onSelectCargoEmpleado={onSelectCargoEmpleado} />
      </div>
    </div>
  );
}

export { FiltrarEmpleados };
