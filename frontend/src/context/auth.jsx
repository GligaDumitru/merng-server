import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
let initialState = {
  user: null,
};

if (localStorage.getItem('tokenDummyApolloClient')) {
  const decodedToken = jwtDecode(
    localStorage.getItem('tokenDummyApolloClient')
  );
  console.log(decodedToken.exp * 100, Date.now());
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('tokenDummyApolloClient');
    initialState.user = null;
  } else {
    initialState.user = decodedToken;
  }
}
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) =>
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  const logout = () => {
    localStorage.removeItem('tokenDummyApolloClient');
    return dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user: state.user,
        login,
        logout,
      }}
    />
  );
}

export { AuthContext, AuthProvider };
