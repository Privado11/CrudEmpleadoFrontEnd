import React, { useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FilterEmployee } from "./FilterEmployee";

function FiltrarEmpleados({ onFiltersChange, onFilter, onSort }) {
  const [inputValue, setInputValue] = useState("");
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredSend, setFilteredSend] = useState(filters);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onFilter(e.target.value);
  };

  const toggleModalFilters = () => {
    setShowModalFilters(!showModalFilters);
    setShowModalSort(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModalFilters(false);
      setShowModalSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        marginTop: "30px",
        marginBottom: "10px",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "230px",
          marginRight: "10px",
          borderRight: "1px solid #B9B9B9",
        }}
      >
        <input
          type="text"
          placeholder="Search employee by name"
          value={inputValue}
          onChange={handleChange}
          style={{
            borderRadius: "5px",
            border: "1px solid #C7C7C7",
            backgroundColor: "#EAE9E9",
          }}
        />
      </div>
      <button onClick={toggleModalFilters} style={{ marginRight: "20px" }}>
        <CiFilter
          style={{ fontSize: "15px", color: "#171717", marginRight: "5px" }}
        />
        <span style={{ fontSize: "12px", color: "#171717" }}>
          {filteredSend.length > 0
            ? `Filtered by ${filteredSend.length} rules`
            : "Filter"}
        </span>
      </button>
      {showModalFilters && (
        <div
          ref={modalRef}
          style={{
            position: "absolute",
            top: "calc(100%)",
            right: 0,
            zIndex: 9999,
          }}
        >
          <FilterEmployee
            onFiltersChange={onFiltersChange}
            setShowModalFilters={setShowModalFilters}
            filters={filters}
            setFilters={setFilters}
            filteredSend={filteredSend}
            setFilteredSend={setFilteredSend}
          />
        </div>
      )}
    </div>
  );
}

export { FiltrarEmpleados };
