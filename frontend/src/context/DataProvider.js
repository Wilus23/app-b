import React, { useState } from "react";
import DataContext from "./DataContext";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(0);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
