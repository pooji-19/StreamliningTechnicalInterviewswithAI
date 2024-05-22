// import React, { useContext, useState, useEffect } from 'react';

// const AuthContext = React.createContext(null);
// const AuthProvider = (props) => {
// const [user, setUser] = useState(null);

// useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   if (storedUser) {
//     setUser(storedUser);
//   }
// }, []);

// const login = (user) => {
//   setUser(user);
//   localStorage.setItem('user', JSON.stringify(user));
// };

// const logout = () => {
//   setUser(null);
//   localStorage.removeItem('user');
// };

// return (
//   <AuthContext.Provider value={{ user, login, logout }}>
//     {props.children}
//   </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export { AuthProvider, useAuth };
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext(null);
const AuthProvider = (props) => {
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

const login = (user) => {
  setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
};

const logout = () => {
  setUser(null);
  localStorage.removeItem('user');
};

return (
  <AuthContext.Provider value={{ user, login, logout }}>
    {props.children}
  </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
