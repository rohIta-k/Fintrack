import { createContext, useContext, useEffect, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("admin"); 

  // 🔄 Load saved role
  useEffect(() => {
    const savedRole = localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Save role
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook
export const useRole = () => {
  return useContext(RoleContext);
};