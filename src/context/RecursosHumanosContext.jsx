import React, { createContext, useContext } from "react";
import { apiRecursosHumanos } from "../services/apiRecursosHumanos";

const RecursosHumanosContext = createContext();

const useRecursosHumanos = () => useContext(RecursosHumanosContext);

const RecursosHumanosProvider = ({ children }) => {
  const recursosHumanos = apiRecursosHumanos();

  return (
    <RecursosHumanosContext.Provider value={recursosHumanos}>
      {children}
    </RecursosHumanosContext.Provider>
  );
};

export { useRecursosHumanos, RecursosHumanosProvider };
