import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationMenu from "../NavigationMenu";
import NameXtreme from "./NameXtreme/NameXtreme";
import "./header.css";

function Header() {
  const navHidden = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navHidden.current;
      if (window.scrollY > 0) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header>
      <h1>
        <NameXtreme />
      </h1>
      <div className="nav-iconUser-container">
        <nav ref={navHidden}>
          <NavigationMenu />
        </nav>

        <div className="User-icon">
          <Link to="/login">
            <img
              src="../../../public/images/iconos/users.png"
              alt="User Icon"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
