import * as React from 'react';
import {  Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  redirectPath = '/',
}: {
  redirectPath?: string
}) => {

    const user = localStorage.getItem('user');
    if(user){
      console.log('user is logged in');
      return <Outlet />;
    }
    else{
      return <Navigate to={redirectPath} replace />;
    }

};
export default ProtectedRoute