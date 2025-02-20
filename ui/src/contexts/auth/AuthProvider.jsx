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
      const result = await getCurrentUser();
      if (result.success) {
        setUser(result.data);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        localStorage.removeItem("token");
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
