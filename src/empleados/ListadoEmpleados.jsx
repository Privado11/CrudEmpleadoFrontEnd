import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { useRecursosHumanos } from "../context/RecursosHumanosContext";
import { FiltrarEmpleados } from "./FiltrarEmpleados";

function ListadoEmpleados() {
  const { empleados, deleteEmpleado, getEmpleados } = useRecursosHumanos();
  const [listEmpleados, setListEmpleados] = useState(empleados);
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState();
  const [filter, setFilter] = useState([]);

  const operadores = {
    "=": (campo, valorFiltro) => campo === valorFiltro,
    "<>": (campo, valorFiltro) => campo !== valorFiltro,
    "<": (campo, valorFiltro) => campo < valorFiltro,
    ">": (campo, valorFiltro) => campo > valorFiltro,
  };

  const EliminarEmpleado = async (id) => {
    await deleteEmpleado(id);
    getEmpleados();
  };

  const filtrarEmpleados = async (filtro) => {
    filtrarEmpleadosCampos(filters);

    if (filtro && filtro.length > 0) {
      const list = filters.length > 0 || sorts ? listEmpleados : empleados;
      const filtrados = list.filter((empleado) =>
        empleado.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      setListEmpleados(filtrados);
    } else {
      const list = sorts ? listEmpleados : empleados;
      setListEmpleados(list);
    }
  };

  const filtrarEmpleadosCampos = (newFilters) => {
    setFilters(newFilters);
    if (newFilters.length === 0) {
      if (sorts) {
        onSort(sorts, empleados);
      } else {
        setListEmpleados(empleados);
      }
      return;
    }
    const filtrados = empleados.filter((empleado) => {
      return newFilters.every((filter) => {
        const campo =
          filter.column === "departamentos"
            ? empleado.cargos.departamentos.nombre
            : empleado[filter.column]?.nombre !== undefined
            ? empleado[filter.column].nombre
            : empleado[filter.column];
        const operador = filter.operator;
        const valorFiltro = filter.value.toLowerCase();

        if (operador in operadores) {
          return operadores[operador](String(campo).toLowerCase(), valorFiltro);
        } else {
          return true;
        }
      });
    });
    if (sorts) {
      onSort(sorts, filtrados);
    } else {
      setListEmpleados(filtrados);
    }
  };

  const option = (x, sort) => {
    const d =
      sort.option === "departamentos"
        ? x.cargos[sort.option].nombre
        : x[sort.option]?.nombre !== undefined
        ? x[sort.option].nombre
        : x[sort.option];

    return d;
  };
  const onSort = (sort, filtrados) => {
    setSorts(sort);
    if (sort) {
      const empleadosToSort = filtrados ? filtrados : listEmpleados;
      const ordenados =
        sort.option === "sueldo"
          ? empleadosToSort.slice().sort((a, b) => {
              return sort.ascending
                ? a[sort.option] - b[sort.option]
                : b[sort.option] - a[sort.option];
            })
          : empleadosToSort.slice().sort((a, b) => {
              const aValue = option(a, sort);
              const bValue = option(b, sort);
              return sort.ascending
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            });
      setListEmpleados(ordenados);
    } else {
      setListEmpleados(empleados);
    }
  };

  useEffect(() => {
    filtrarEmpleadosCampos(filters);
  }, [sorts === undefined]);

  useEffect(() => {
    setListEmpleados(empleados);
  }, [empleados]);

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div style={{ margin: "30px", marginLeft: "55px", padding: "5px" }}>
      <div className="container text" style={{ margin: "0" }}>
        <h3 style={{ color: "#171717" }}>Sistema de Recursos Humanos</h3>
      </div>
      <FiltrarEmpleados
        onFiltersChange={filtrarEmpleadosCampos}
        onFilter={filtrarEmpleados}
        onSort={onSort}
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
              <td>{empleado.nombre}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.email}</td>
              <td>{empleado.cargos.nombre}</td>
              <td>{empleado.cargos.departamentos.nombre}</td>
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
