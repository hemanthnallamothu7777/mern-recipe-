import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import defaultLogo from '../images/recipe.png';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    {/* Logo */}
    <Link to="/">
      <img src={defaultLogo} width={130} height={50} alt="Logo" />
    </Link>

    {/* Navbar items */}
    <div className="collapse navbar-collapse px-5" id="navbarNav">
      <ul className="navbar-nav">
        {/* Home */}
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <a className="font-weight-bold ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                className="bi bi-house-fill m-2"
                viewBox="0 0 16 16"
              >
                {/* SVG paths */}
              </svg>
              HOME
            </a>
          </Link>
        </li>

        {/* Add Recipe */}
        <li className="nav-item">
          <Link className="nav-link" to="/addrecipe">
            <a className="font-weight-bold ">ADD RECIPE</a>
          </Link>
        </li>

        {/* Dropdown */}
        {!cookies.access_token ? (
          // When user is not logged in
          ""
        ) : (
          // When user is logged in
          <li className="nav-item dropdown ">
            <a
              className="nav-link dropdown-toggle "
              href="/"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <a className="font-weight-bold">PROFIL</a>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="nav-link" to="/saved-recipes">
                  <p>SAVED</p>
                </Link>
              </li>
            
              <li>
                <Link className="nav-link" to="/Myrecipes">
                  <p>MY RECIPE</p>
                </Link>
              </li>
              
            </ul>
          </li>
        )}
      </ul>

      {/* Logout button */}
      <div className="ms-auto">
        {!cookies.access_token ? (
          // When user is not logged in
          <Link to="/auth" className="btn btn-primary my-2 my-sm-0">
            Login/Sign up
          </Link>
        ) : (
          // When user is logged in
          <button className="btn btn-primary my-2 my-sm-0" onClick={logout}>
            Log Out!
          </button>
        )}
      </div>
    </div>
  </nav>
);
};
