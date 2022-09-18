import React, { Component } from 'react'
import { Route, Navigate } from 'react-router-dom'
import {isAuthenticated} from './auth/auth-helper'

const PrivateRoute = ({children})=>  isAuthenticated() ? children : <Navigate to="/login" />;


  export default PrivateRoute
