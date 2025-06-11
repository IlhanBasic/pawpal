import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({
  token: null,
  pushToken: null,
  isAuthenticated: false,
  setPushToken: () => {},
  authenticate: () => {},
  logout: () => {},
});
function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [pushToken, setPushToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    fetchToken();
  }, []);
  function authenticate(token) {
    setToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setToken(null);
    setPushToken(null);
    AsyncStorage.removeItem("token");
  }
  const value = {
    token: token,
    isAuthenticated: !!token,
    pushToken: pushToken,
    setPushToken: setPushToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
