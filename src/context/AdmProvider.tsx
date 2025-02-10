import { AuthProvider } from "./AuthContext";
// import { ThemeProvider } from "./ThemeContext";

export default function AdmProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* <ThemeProvider> */}
        {children}
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
}
