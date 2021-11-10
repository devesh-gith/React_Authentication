import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Profilepage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import TestPage from "../pages/TestPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import RestPasswordPage from "../pages/RestPasswordPage";
import ForgotPassword from "../pages/ForgotPassword";
import { useAuth } from "../context/AuthContext";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/notfound" component={NotFoundPage} />
          <ProtectedRoute exact path="/login" component={LoginPage} />
          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/test" component={TestPage} />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={RestPasswordPage}
          />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  const location = useLocation();
  if (
    path === "/login" ||
    path === "/register" ||
    path === "/reset-password" ||
    path === "/forgot-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/profile"} />
    ) : (
      <Route {...props} />
    );
  }

  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
