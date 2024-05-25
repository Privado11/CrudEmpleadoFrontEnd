import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";
import { FiltrarEmpleados } from "./FiltrarEmpleados";
import { FaArrowDownLong } from "react-icons/fa6";
import TablePagination from "@mui/material/TablePagination";
import "../styles/empleados/ListarEmpleados.css";

function ListadoEmpleados() {
  const { empleados, deleteEmpleado, getEmpleados } = useRecursosHumanos();
  const [listEmpleados, setListEmpleados] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState(null);
  const [ascending, setAscending] = useState(false);
  const [headerSeleted, setHeaderSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([]);

  useEffect(() => {
    const generateRowsPerPageOptions = () => {
      const options = [];
      let i = 10;
      options.push(i);
      while (i <= empleados.length) {
        i += 5;
        options.push(i);
      }
      return options;
    };
    setRowsPerPageOptions(generateRowsPerPageOptions());
  }, [empleados]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const applyFilters = (empleadosList) => {
    return empleadosList.filter((empleado) => {
      return filters.every((filter) => {
        const campo =
          filter.column === "departamentos"
            ? empleado.cargos.departamentos.name
            : empleado[filter.column]?.name !== undefined
            ? empleado[filter.column].name
            : empleado[filter.column];
        const operador = filter.operator;
        const valorFiltro = filter.value.toLowerCase();

        return operadores[operador](String(campo).toLowerCase(), valorFiltro);
      });
    });
  };

  const applySearch = (empleadosList) => {
    return empleadosList.filter((empleado) =>
      empleado.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const applySort = (empleadosList) => {
    if (!sorts) return empleadosList;

    const { option, ascending } = sorts;

    return empleadosList.slice().sort((a, b) => {
      const aValue =
        option === "departamentos"
          ? a.cargos.departamentos.name
          : a[option]?.name !== undefined
          ? a[option].name
          : a[option];
      const bValue =
        option === "departamentos"
          ? b.cargos.departamentos.name
          : b[option]?.name !== undefined
          ? b[option].name
          : b[option];

      if (option === "salary") {
        return ascending ? aValue - bValue : bValue - aValue;
      } else {
        return ascending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
  };

  const updateList = () => {
    let updatedList = empleados
      .slice()
      .sort((a, b) => a.code.localeCompare(b.code));

    updatedList = applyFilters(updatedList);
    updatedList = applySearch(updatedList);

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    let displayedList = updatedList.slice(startIndex, endIndex);

    displayedList = applySort(displayedList);

    setListEmpleados(displayedList);
  };

  useEffect(() => {
    updateList();
  }, [empleados, filters, sorts, searchTerm, page, rowsPerPage]);

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleSort = (option) => {
    setHeaderSelected(option);
    let newSortOption = option.toLowerCase();

    if (newSortOption === "position") newSortOption = "cargos";
    if (newSortOption === "division") newSortOption = "departamentos";

    const isSameOption = sorts?.option === newSortOption;
    const newAscending = isSameOption ? !ascending : true;

    setSorts({ option: newSortOption, ascending: newAscending });
    setAscending(newAscending);
  };

  const headTable = [
    { name: "Code" },
    { name: "Name" },
    { name: "Address" },
    { name: "Phone" },
    { name: "Email" },
    { name: "Position" },
    { name: "Division" },
    { name: "Salary" },
  ];

  return (
    <div style={{ margin: "30px", marginLeft: "55px", padding: "5px" }}>
      <div className="container text" style={{ margin: "0" }}>
        <h3 style={{ color: "#171717" }}>Sistema de Recursos Humanos</h3>
      </div>
      <FiltrarEmpleados
        onFiltersChange={setFilters}
        onFilter={(filtro) => setSearchTerm(filtro)}
      />
      <table className="table table-striped table-hover align-middle table-bordered">
        <thead className="table-dark">
          <tr>
            {headTable.map((head, index) => (
              <th key={index} scope="col">
                <div
                  className="container-head-table"
                  onClick={() => handleSort(head.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {head.name}
                  <FaArrowDownLong
                    className={`arrow-icon ${
                      headerSeleted === head.name ? "visible" : ""
                    } ${
                      headerSeleted === head.name && !sorts.ascending
                        ? "rotated"
                        : ""
                    }`}
                  />
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listEmpleados.map((empleado, indice) => (
            <tr key={indice}>
              <th scope="row">{empleado.code}</th>
              <td>{empleado.name}</td>
              <td>{empleado.address}</td>
              <td>{empleado.phone}</td>
              <td>{empleado.email}</td>
              <td>{empleado.cargos.name}</td>
              <td>{empleado.cargos.departamentos.name}</td>
              <td>
                <NumericFormat
                  value={empleado.salary}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
              <td className="text-center">
                <div>
                  <Link to={`/edit/employee/${empleado.id}`} title="Editar">
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
      <TablePagination
        component="div"
        count={
          filters.length > 0 || searchTerm
            ? listEmpleados.length
            : empleados.length
        }
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  );
}

export { ListadoEmpleados };
