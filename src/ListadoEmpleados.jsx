import React, { useState, useEffect } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/api/v1/empleados";
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultados de la consulta:");
    console.log(resultado.data);
    setEmpleados(resultado.data);
  };

  return (
    <div style={{ margin: "30px" }}>
      <div className="container text-center">
        <h3>Sistema de Recursos Humanos</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, indice) => (
            <tr key={indice}>
              <th scope="row">{empleado.idEmpleado}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td>
                <NumericFormat
                  value={empleado.sueldo}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoEmpleados;
