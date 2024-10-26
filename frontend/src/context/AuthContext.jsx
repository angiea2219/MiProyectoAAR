import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rutas, setRutas] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isPO, setIsPO] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUsuario, setIsUsuario] = useState(false);
  
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);
      
      return res.data;

    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }

    
  };


  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data.message]);
    }
  };

  const signout = async () => {
    await axios.post("/signout");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    setLoading(true);
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          if (res.data.id_puesto===1 || res.data.id_puesto===2 ){
            setIsPO(true);
            setRutas('privateRoutesPO');
          }
          if (res.data.id_puesto===100){
            setIsAdmin(true);
            setRutas('privateRoutesAdmin');
          }

          if (res.data.id_puesto > 2 && res.data.id_puesto < 100){
            setIsUsuario(true);
            setRutas('privateRoutesUsuario');
          }
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
        });
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);      
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors])



  useEffect(() => {
    setLoading(true);
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
        });
    }
    
    setLoading(false);
  }, []);




  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading,
        isPO,
        isAdmin,
        isUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
