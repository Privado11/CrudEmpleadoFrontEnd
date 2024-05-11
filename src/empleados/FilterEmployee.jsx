import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function FilterEmployee({
  onFiltersChange,
  setShowModal,
  filters,
  setFilters,
  setFilteredSend,
  filteredSend,
}) {
  const [showFilters, setShowFilters] = useState(filters ? true : false);

  const menu = [
    "codigo",
    "nombre",
    "email",
    "cargos",
    "departamentos",
    "sueldo",
  ];
  const menu2 = ["=", "<>", ">", "<"];

  const sendFilters = () => {
    if (filters.length > 0 || filteredSend.length > 0) {
      onFiltersChange(filters);
      setShowModal(false);
      setFilteredSend(filters);
    }
  };

  const toggleFilters = () => {
    setShowFilters(true);
    addFilter();
  };

  const addFilter = () => {
    const newFilter = {
      column: "codigo",
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
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
                    const updatedFilters = [...filters];
                    updatedFilters[index].column = e.target.value;
                    setFilters(updatedFilters);
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
                    updatedFilters[index].operator = e.target.value;
                    setFilters(updatedFilters);
                  }}
                  style={{
                    fontSize: "12px",
                    width: "40px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                >
                  {menu2.map((opcion, indice) => (
                    <option key={indice}>{opcion}</option>
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
