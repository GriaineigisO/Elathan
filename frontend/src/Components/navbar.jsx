import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslate } from "../Functions/TranslateUI";
import leftArrow from "../assets/caret-left-fill.svg";
import rightArrow from "../assets/caret-right-fill.svg";

const Navbar = ({ onLogin, onLogout }) => {
  // ---------- State ----------
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { translate } = useTranslate();

  // ---------- Effects ----------
  useEffect(() => {
    setMounted(true);
  }, [])
 
  function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="nav-controls">
      {/* Passing -1 goes back one page in history */}
      <img className="nav-button" style={{width:"40px"}} onClick={() => navigate(-1)} src={leftArrow}>
       
      </img>
      
      {/* Passing 1 goes forward one page in history */}
      <img className="nav-button"  style={{width:"40px"}} onClick={() => navigate(1)} src={rightArrow}>
       
      </img>
    </div>
  );
}

  // ---------- Event handlers ----------
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);


  // Links
  const links = (
    <>


    <li className="navlink">
        <Link className="dark-link" to={"/encyclopedias"}>
          {translate("Encyclopedias")}
        </Link>
      </li>


      <li className="navlink">
        <Link className="dark-link" to={"/home"}>
          {translate("Dictionaries")}
        </Link>
      </li>

       <li className="navlink">
        <Link className="dark-link" to={"/account"}>
          {translate("Settings")}
        </Link>
      </li>
    </>
  );

  // ---------- Mounted check ----------
  if (!mounted) {
    return <div id="navbar-placeholder" />;
  }

  return (
    <>
      {/* Desktop Navbar */}
      <div id="navbar">
        <div style={{display: "flex", flexDirection: "row"}}>
        <div className="title-logo">
          <h1 className="uncial-antiqua-regular">
            <Link className="dark-link" to="/">
              Elatha
            </Link>
          </h1>
        </div>
          <NavigationButtons />
          </div>
        <ul className="nav-ul">{links}</ul>
      </div>

     
      {/* Mobile Navbar */}
      <div id="mobile-navbar">
        <div className="mobile-header">
          <h1 className="uncial-antiqua-regular"></h1>
          <button className="hamburger" onClick={toggleMobileMenu}>
            &#9776;
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="mobile-nav-menu">
            {links}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
