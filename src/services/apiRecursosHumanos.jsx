import axios from "axios";
import React, { useEffect, useState } from "react";

function apiRecursosHumanos() {
  const urlBase = "http://localhost:8080/api/v1";

  const [empleados, setEmpleados] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    getEmpleados();
    getCargos();
    getDepartamentos();
  }, []);

  const getData = async (endPoint, setters) => {
    try {
      const datosObt = await axios.get(`${urlBase}/${endPoint}`);
      setters(datosObt.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataId = async (endPoint, id) => {
    try {
      const Empleado = await axios.get(`${urlBase}/${endPoint}/${id}`);
      return Empleado.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const postData = async (endPoint, data) => {
    try {
      await axios.post(`${urlBase}/${endPoint}`, data);
    } catch (error) {
      console.error(error);
    }
  };

  const putData = async (endPoint, id, data) => {
    try {
      await axios.put(`${urlBase}/${endPoint}/${id}`, data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (endPoint, id) => {
    try {
      await axios.delete(`${urlBase}/${endPoint}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = async (endPoint, nameData, data, setters) => {
    try {
      const datosObt = await axios.get(
        `${urlBase}/${endPoint}/${nameData}`,
        data
      );
      setters(datosObt.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Empleados
  const getEmpleados = () => getData("empleados", setEmpleados);
  const saveEmpleado = (empleado) => postData("empleados", empleado);
  const putEmpleado = (id, empleado) => putData("empleados", id, empleado);
  const deleteEmpleado = (id) => deleteData("empleados", id);
  const getEmpleadoById = (id) => getDataId("empleados", id);
  const filterEmpleado = (nameData, data) =>
    filterData("empleados/departamento", nameData, data, setEmpleados);

  //Cargos
  const getCargos = () => getData("cargos", setCargos);
  const saveCargo = (cargo) => postData("cargos", cargo);
  const putCargo = (id, cargo) => putData("cargos", id, cargo);
  const deleteCargo = (id) => deleteData("cargos", id);

  //Departamentos
  const getDepartamentos = () => getData("departamentos", setDepartamentos);
  const saveDepartamento = async (departamento) =>
    postData("departamentos", departamento);
  const putDepartamento = (id, departamento) =>
    putData("departamentos", id, departamento);
  const deleteDepartamento = (id) => deleteData("departamentos", id);

  return {
    empleados,
    getEmpleados,
    filterEmpleado,
    cargos,
    departamentos,
    getEmpleadoById,
    saveEmpleado,
    putEmpleado,
    deleteEmpleado,
    saveCargo,
    putCargo,
    deleteCargo,
    saveDepartamento,
    putDepartamento,
    deleteDepartamento,
  };
}

export { apiRecursosHumanos };
