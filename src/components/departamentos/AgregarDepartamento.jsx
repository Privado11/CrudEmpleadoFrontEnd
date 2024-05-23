import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";

function AgregarDepartamento() {
  let navegacion = useNavigate();
  const { saveDepartamento } = useRecursosHumanos();
  const [division, setDivision] = useState({ name: "" });

  const { name } = division;

  const onInputChange = (e) => {
    setDivision({ ...division, name: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await saveDepartamento(division);
    navegacion("/");
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Add Division</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            name Division
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            required={true}
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Save Division
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

export { AgregarDepartamento };
