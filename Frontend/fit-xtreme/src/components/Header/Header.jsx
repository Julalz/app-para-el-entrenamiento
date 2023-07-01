import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationMenu from "../NavigationMenu";
import NameXtreme from "./NameXtreme/NameXtreme";
import { LOCAL_STORAGE_USER } from "../../utils/constanst";
import "./header.css";

function Header() {
  const navHidden = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
  const token = user?.data.token;
  console.log(token);

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

  const handleProfileClick = () => {
    console.log(token);
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
          <Link onClick={handleProfileClick}>
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
