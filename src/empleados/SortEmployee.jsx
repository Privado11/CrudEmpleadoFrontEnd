import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import "../styles/empleados/SortEmployee.css";

function SortEmployee({
  onSorts,
  setShowModalSort,
  sorts,
  setSorts,
  sortSend,
  setSortSend,
}) {
  const [showOption, setShowOption] = useState(false);
  const [ascending, setAscending] = useState(true);

  const toggleButton = () => {
    const newAscending = !sorts.ascending;
    setAscending(newAscending);
    setSorts({ ...sorts, ascending: newAscending });
  };

  const menu = [
    "codigo",
    "nombre",
    "email",
    "cargos",
    "departamentos",
    "sueldo",
  ];

  const sendSorts = () => {
    if (sorts || sortSend) {
      onSorts(sorts);
      setShowModalSort(false);
      setSortSend(sorts);
    }
  };

  const toggleShowOption = () => {
    setShowOption(true);
  };

  const addSort = (option) => {
    const newSort = {
      option: option,
      ascending: ascending ? true : false,
    };
    setSorts(newSort);
    setShowOption(false);
  };

  const removeSort = () => {
    setSorts();
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
        {!sorts && (
          <div>
            <h6>No sorts applied to this view</h6>
            <p style={{ fontSize: "12px" }}>
              Add a column below to sort the view
            </p>
          </div>
        )}
        {sorts && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px" }}>
              <IoReorderThreeOutline
                style={{ fontSize: "15px", marginRight: "5px" }}
              />
              sort by: <span style={{ fontWeight: "900" }}>{sorts.option}</span>
            </span>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "12px", marginRight: "5px" }}>
                ascending:
              </span>
              <div
                className={`switch-button ${sorts.ascending ? "active" : ""}`}
                onClick={toggleButton}
              >
                <div className="slider"></div>
              </div>
            </div>

            <button onClick={() => removeSort()} style={{ marginLeft: "5px" }}>
              <IoIosClose
                style={{
                  fontSize: "20px",
                }}
              />
            </button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={toggleShowOption}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "12px" }}>Pick a column sort by</span>
          </button>
          <button onClick={sendSorts}>
            <span style={{ fontSize: "12px" }}>Apply sorting</span>
          </button>
        </div>
      </div>
      {showOption && (
        <div
          style={{
            position: "absolute",
            top: "60%",
            backgroundColor: "#ffffff",
            padding: "10px",
            borderRadius: "5px",
            width: "120px",
          }}
        >
          <div
            style={{
              display: "block",

              marginBottom: "5px",
            }}
          >
            <div>
              {menu.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: "block",
                    height: "30px",
                  }}
                >
                  <button onClick={() => addSort(option)}>
                    <span style={{ fontSize: "12px" }}>{option}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SortEmployee };
