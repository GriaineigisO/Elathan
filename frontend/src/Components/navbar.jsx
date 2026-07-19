import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useTranslate } from "../Functions/TranslateUI";

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
        <div className="title-logo">
          <h1 className="uncial-antiqua-regular">
            <Link className="dark-link" to="/">
              Elatha
            </Link>
          </h1>
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
