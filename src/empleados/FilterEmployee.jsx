import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function FilterEmployee({
  onFiltersChange,
  setShowModalFilters,
  filters,
  setFilters,
  setFilteredSend,
  filteredSend,
}) {
  const [showFilters, setShowFilters] = useState(filters ? true : false);

  const menu = ["code", "name", "email", "address", "division", "salary"];

  const operadores = {
    "[=] equals": "=",
    "[<>] not equals": "<>",
    "[>] greater than": ">",
    "[<] less than": "<",
  };

  const sendFilters = () => {
    if (filters.length > 0 || filteredSend.length > 0) {
      onFiltersChange(filters);
      setShowModalFilters(false);
      setFilteredSend(filters);
    }
  };

  const toggleFilters = () => {
    setShowFilters(true);
    addFilter();
  };

  const addFilter = () => {
    const newFilter = {
      column: "code",
      operator: "=",
      value: "",
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleFilterChange = (e, index) => {
    const updatedFilters = [...filters];
    let newFilterColumn = e.target.value.toLowerCase();

    if (newFilterColumn === "position") newFilterColumn = "cargos";
    if (newFilterColumn === "division") newFilterColumn = "departamentos";

    updatedFilters[index].column = newFilterColumn;
    setFilters(updatedFilters);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        border: "0.2px solid #171717",
        overflow: "hidden",
        zIndex: "9999",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "5px",
          width: "300px",
        }}
      >
        {filters.length === 0 && (
          <div>
            <h6>No filters applied to this view</h6>
            <p style={{ fontSize: "12px" }}>
              Add a column below to filter the view
            </p>
          </div>
        )}

        {showFilters && (
          <div
            style={{
              display: "block",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "5px",
            }}
          >
            {filters.map((filter, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <select
                  aria-label="Default select example"
                  value={filter.column}
                  onChange={(e) => {
                    handleFilterChange(e, index);
                  }}
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  {menu.map((opcion, indice) => (
                    <option key={indice}>{opcion}</option>
                  ))}
                </select>
                <select
                  aria-label="Default select example"
                  value={filter.operator}
                  onChange={(e) => {
                    const updatedFilters = [...filters];
                    updatedFilters[index].operator =
                      e.target.value.toLowerCase();
                    setFilters(updatedFilters);
                  }}
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  {Object.entries(operadores).map(([nombre, simbolo]) => (
                    <option key={nombre} value={simbolo}>
                      {nombre}
                    </option>
                  ))}
                </select>

                <input
                  value={filter.value}
                  type="text"
                  placeholder="Enter a value"
                  onChange={(e) => {
                    const updatedFilters = [...filters];
                    updatedFilters[index].value = e.target.value;
                    setFilters(updatedFilters);
                  }}
                  style={{
                    width: "80px",
                    height: "20px",
                    borderRadius: "5px",
                    border: "1px solid #C7C7C7",
                    backgroundColor: "#EAE9E9",
                  }}
                />
                <button
                  onClick={() => removeFilter(index)}
                  style={{ marginLeft: "5px" }}
                >
                  <IoIosClose
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={toggleFilters}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IoIosAdd style={{ fontSize: "15px" }} />
            <span style={{ fontSize: "12px" }}>Add filter</span>
          </button>
          <button onClick={sendFilters}>
            <span style={{ fontSize: "12px" }}>Apply filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { FilterEmployee };
