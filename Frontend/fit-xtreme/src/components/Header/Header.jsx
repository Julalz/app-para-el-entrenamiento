import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu";
import NameXtreme from "./NameXtreme/NameXtreme";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import "./header.css";

function Header() {
  const navHidden = useRef(null);
  const navigate = useNavigate();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.token;

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
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER);
    navigate("/");
  };
  const handleProfileClick = () => {
    if (token) {
      setTimeout(() => {
        navigate("/profile");
      }, 0);
    } else {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    }
  };

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
  };

  return (
    <header>
      <h1>
        <NameXtreme />
      </h1>
      <div className="nav-iconUser-container">
        <nav ref={navHidden}>
          <NavigationMenu />
        </nav>

        <div
          className="User-icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link onClick={handleProfileClick}>
            <img
              src="../../../public/images/iconos/users.png"
              alt="User Icon"
            />
          </Link>
          {
            (isSubMenuOpen,
            token && (
              <div className="submenu">
                <Link to="/profile">Perfil</Link>
                <Link to="/configuracion">Configuración</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            ))
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
