import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GoListUnordered } from "react-icons/go";
import { FilterEmployee } from "./FilterEmployee";
import { SortEmployee } from "./SortEmployee";

function FiltrarEmpleados({ onFiltersChange, onFilter, onSort }) {
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalSort, setShowModalSort] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredSend, setFilteredSend] = useState(filters);
  const [sorts, setSorts] = useState();
  const [sortSend, setSortSend] = useState(sorts);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onFilter(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalSorf = () => {
    setShowModalSort(!showModalSort);
  };

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
      <button onClick={toggleModal} style={{ marginRight: "20px" }}>
        <CiFilter
          style={{ fontSize: "15px", color: "#171717", marginRight: "5px" }}
        />
        <span style={{ fontSize: "12px", color: "#171717" }}>
          {filteredSend.length > 0
            ? `Filtered by ${filteredSend.length} rules`
            : "Filter"}
        </span>
      </button>
      <button onClick={toggleModalSorf} style={{ marginRight: "10px" }}>
        <GoListUnordered
          style={{ fontSize: "15px", color: "#171717", marginRight: "5px" }}
        />
        <span style={{ fontSize: "12px", color: "#171717" }}>
          {" "}
          {sortSend ? `Sort by ${sortSend.option}` : "Sort"}
        </span>
      </button>
      {showModal && (
        <FilterEmployee
          onFiltersChange={onFiltersChange}
          setShowModal={setShowModal}
          filters={filters}
          setFilters={setFilters}
          filteredSend={filteredSend}
          setFilteredSend={setFilteredSend}
        />
      )}
      {showModalSort && (
        <SortEmployee
          onSorts={onSort}
          setShowModalSort={setShowModalSort}
          sorts={sorts}
          setSorts={setSorts}
          sortSend={sortSend}
          setSortSend={setSortSend}
        />
      )}
    </div>
  );
}

export { FiltrarEmpleados };
