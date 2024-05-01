import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";
import { FiltrarEmpleados } from "./FiltrarEmpleados";

function ListadoEmpleados() {
  const { empleados, deleteEmpleado, getEmpleados, filterEmpleado } =
    useRecursosHumanos();
  const [listEmpleados, setListEmpleados] = useState(empleados);
  const [departamento, setDepartamento] = useState();
  const [cargo, setCargo] = useState();

  const EliminarEmpleado = async (id) => {
    await deleteEmpleado(id);
    getEmpleados();
  };

  const onSelectDepartamentoEmpleado = (selectedDepartamento) => {
    setDepartamento(selectedDepartamento);
  };

  const onSelectCargoEmpleado = (selectedCargo) => {
    setCargo(selectedCargo);
  };

  const filtrarEmpleados = async () => {
    if (departamento) {
      filterEmpleado(
        "nombreDepartamento",
        departamento ? departamento.nombre : ""
      );
    } else {
      getEmpleados();
    }
  };

  useEffect(() => {
    setListEmpleados(empleados);
  }, [empleados]);

  useEffect(() => {
    console.log(departamento);
  }, [departamento]);

  useEffect(() => {
    filtrarEmpleados();
  }, [departamento]);

  return (
    <div style={{ margin: "30px" }}>
      <div className="container text-center">
        <h3>Sistema de Recursos Humanos</h3>
      </div>
      <FiltrarEmpleados
        onSelectCargoEmpleado={onSelectCargoEmpleado}
        onSelectDepartamentoEmpleado={onSelectDepartamentoEmpleado}
      />
      <table className="table table-striped table-hover align-middle table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Email</th>
            <th scope="col">Cargo</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listEmpleados.map((empleado, indice) => (
            <tr key={indice}>
              <th scope="row">{empleado.codigo}</th>
              <td>{empleado.nombre + " " + empleado.apellido}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.email}</td>
              <td>{empleado.cargo.nombre}</td>
              <td>{empleado.cargo.departamento.nombre}</td>
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
              <td className="text-center">
                <div>
                  <Link to={`/editar/${empleado.id}`} title="Editar">
                    <MdEditDocument
                      style={{
                        fontSize: "1.5rem",
                        marginRight: "0.3rem",
                        color: "#FFC107",
                      }}
                    />
                  </Link>
                  <MdDeleteForever
                    title="Eliminar"
                    style={{
                      fontSize: "1.5rem",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => EliminarEmpleado(empleado.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ListadoEmpleados };
