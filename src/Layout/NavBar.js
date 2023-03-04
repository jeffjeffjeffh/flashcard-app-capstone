import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function NavBar() {
  const { url } = useRouteMatch();

  return (
    <div style={{ border: "5px black solid" }}>
      <Link to="/">
        <span style={{ color: "blue" }}>Home / </span>
      </Link>
      <p>{url}</p>
    </div>
  );
}
