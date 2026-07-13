import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useTranslate } from "../Functions/TranslateUI";

const Navbar = ({ onLogin, onLogout }) => {
  // ---------- State ----------
  const [currentUser, setCurrentUser] = useState("");
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { translate } = useTranslate();
  const [dictionaryOrEncyclopediaMode, setDictionaryOrEncyclopediaMode] = useState("/encyclopedias")
  const [dictionaryOrEncyclopedia, setDictionaryOrEncyclopedia] = useState("Encyclopedias")

  const isLoggedIn = !!localStorage.getItem("token");

  // ---------- Effects ----------
  // Ensure all hooks are always called in the same order
  useEffect(() => {
    setMounted(true);

    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);
      fetchUserInfo(userId);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) setCurrentUser(userId);
  }, [isLoggedIn]);

  // ---------- Fetch user info ----------
  const fetchUserInfo = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getUserInfo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      if (response.ok) setUserName(data.username || "");
      else setUserName("");
    } catch (err) {
      console.warn("User info fetch failed:", err);
      setUserName("User");
    }
  };

  // ---------- Event handlers ----------
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleSignOut = () => {
    setCurrentUser("");
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    sessionStorage.clear();
    onLogout && onLogout();
    window.location.href = "/";
  };

  // ---------- Render ----------
  const usernameToDisplay = userName || "User";
  const currentUserId = currentUser || "";

  const switchMode = () => {
    if (dictionaryOrEncyclopedia === "Encyclopedias") {
      setDictionaryOrEncyclopedia("Dictionaries");
       setDictionaryOrEncyclopediaMode("/home");
    } else {
       setDictionaryOrEncyclopedia("Encyclopedias");
       setDictionaryOrEncyclopediaMode("/encyclopedias");
    }
  }

  // Links
  const loggedInLinks = (
    <>


    <li className="navlink">
        <Link onClick={switchMode} className="dark-link" to={dictionaryOrEncyclopediaMode}>
          {dictionaryOrEncyclopedia}
        </Link>
      </li>


      <li className="navlink">
        <Link className="dark-link" to={"/home"}>
          {usernameToDisplay}
        </Link>
      </li>
      <li className="navlink">
        <Link className="dark-link" to="/search">
          {translate("Search")}
        </Link>
      </li>
      <li className="navlink">
        <Link
          className="dark-link"
          to={currentUserId.length > 0 ? `/${currentUserId}` : "/login"}
        >
          {translate("Account")}
        </Link>
      </li>
      <li className="navlink">
        <Link className="dark-link" onClick={handleSignOut}>
          {translate("Sign Out")}
        </Link>
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      <li className="navlink">
        <Link className="dark-link" to="/">
          Elatha
        </Link>
      </li>
      <li className="navlink">
        <Link className="dark-link" to="/search">
          {translate("Search")}
        </Link>
      </li>
      <li className="navlink">
        <Link className="dark-link" to="/login">
          {translate("Log In")}
        </Link>
      </li>
      <li className="navlink">
        <Link className="dark-link" to="/register">
          {translate("Register")}
        </Link>
      </li>
    </>
  );

  // ---------- Mounted check ----------
  // We keep all hooks in place; only conditionally render the UI
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
        <ul className="nav-ul">{isLoggedIn ? loggedInLinks : loggedOutLinks}</ul>
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
            {isLoggedIn ? loggedInLinks : loggedOutLinks}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
