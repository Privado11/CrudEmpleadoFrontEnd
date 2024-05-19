import axios from "axios";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

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

  const getDataE = async (endPoint, setters) => {
    try {
      const datosObt = await supabase.from(`${endPoint}`).select(`
      *,
      cargos(*, departamentos(*))
    `);
      //const datosObt = await axios.get(`${urlBase}/${endPoint}`);
      setters(datosObt.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async (endPoint, setters) => {
    try {
      const datosObt = await supabase.from(`${endPoint}`).select();
      //const datosObt = await axios.get(`${urlBase}/${endPoint}`);
      setters(datosObt.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataId = async (endPoint, id) => {
    try {
      const empleado = await supabase
        .from(endPoint)
        .select(
          `
        *,
        cargos(*, departamentos(*))
      `
        )
        .eq("id", `${id}`);
      return empleado.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const postData = async (endPoint, data) => {
    try {
      const { code, name, address, phone, email, cargo_id, salary } = data;

      await supabase.from(endPoint).insert([
        {
          code: code,
          name: name,
          address: address,
          phone: phone,
          email: email,
          cargo_id: cargo_id,
          salary: salary,
        },
      ]);
    } catch (error) {
      console.error("Error al insertar datos:", error.message);
    }
  };

  const putData = async (endPoint, id, data) => {
    try {
      const { code, name, address, phone, email, cargo_id, salary } = data;

      await supabase
        .from(endPoint)
        .update([
          {
            code: code,
            name: name,
            address: address,
            phone: phone,
            email: email,
            cargo_id: cargo_id,
            salary: salary,
          },
        ])
        .eq("id", id)
        .select();

      //await axios.put(`${urlBase}/${endPoint}/${id}`, data);
    } catch (error) {
      console.error("Error al insertar datos:", error.message);
    }
  };

  const deleteData = async (endPoint, id) => {
    try {
      await supabase.from(endPoint).delete().eq("id", id);
      //await axios.delete(`${urlBase}/${endPoint}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = async (endPoint, filter, setters) => {
    try {
      const datosObt = await supabase
        .from(`${endPoint}`)
        .select()
        .like("name", `%${filter}%`);
      setters(datosObt.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Empleados
  const getEmpleados = () => getDataE("empleados", setEmpleados);
  const saveEmpleado = (empleado) => postData("empleados", empleado);
  const putEmpleado = (id, empleado) => putData("empleados", id, empleado);
  const deleteEmpleado = (id) => deleteData("empleados", id);
  const getEmpleadoById = (id) => getDataId("empleados", id);
  const filterEmpleado = (filter) =>
    filterData("empleados", filter, setEmpleados);

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
