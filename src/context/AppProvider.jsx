import { ThemeProvider } from "./ThemeContext";
import { RoleProvider } from "./RoleContext";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <RoleProvider>
        {children}
      </RoleProvider>
    </ThemeProvider>
  );
};

export default AppProvider;