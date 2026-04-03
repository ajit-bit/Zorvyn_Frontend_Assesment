import { createContext, useContext, useState } from "react";
import { initialTransactions } from "./data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  const addTransaction = (tx) => {
    setTransactions((prev) => [...prev, tx]);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);