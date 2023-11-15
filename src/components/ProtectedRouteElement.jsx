import React, {useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  const appContext = useContext(AppContext);
  return (
    appContext.isLogin ? <Component {...props} /> : <Navigate to="/sign-up" replace/>
)}

export default ProtectedRouteElement; 