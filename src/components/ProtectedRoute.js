import React from "react";
import { withAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(props) {
    const { ...rest } = props;

    return (
        props.isLoggedIn ? <Outlet {...rest} />
                        : <Navigate to='/' />
    )
}

export default withAuth(ProtectedRoute);