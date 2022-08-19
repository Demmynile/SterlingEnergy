import React from 'react'
import {Navigate} from 'react-router-dom'
import { isAdminAuthenticated} from './auth';




export const RequireAuthAdmin = ({ children, redirectTo }) =>  {
   let auth = isAdminAuthenticated() ;
   console.log(auth)
   return auth ? children : <Navigate to={redirectTo} />;
 }

