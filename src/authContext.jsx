import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const signup = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        signup,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
