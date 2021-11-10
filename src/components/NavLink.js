import { Button } from "@chakra-ui/button";
import React from "react";
import { NavLink as Link, useLocation } from "react-router-dom";

export default function Navlink({ to, name, ...rest }) {
  const location = useLocation();

  const isActive = location.pathname === to;
  return (
    <Link to={to}>
      <Button
        varient={isActive ? "outline" : "ghost"}
        colorScheme={isActive ? "pink" : "green"}
        {...rest}
      >
        {name}
      </Button>
    </Link>
  );
}
