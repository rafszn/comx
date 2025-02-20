import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch and validate the current user
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const result = await getCurrentUser();
        if (result.success) {
          setUser(result.data);
        } else {
          setUser(null);
          // localStorage.removeItem("token");
        }
      } catch {
        setUser(null);
        // localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
