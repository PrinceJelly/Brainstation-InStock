import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Reusable/react-svg-library";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo-link">
          {" "}
          <Icon name="InStock-Logo.svg" addClass="header__logo" />
        </Link>
        <ul className="header__link-list">
          <li className="header__link-item">
            <NavLink
              exact
              to="/"
              className="header__link"
              activeClassName="header__active-link"
              isActive={() => {
                const url = pathname.slice(0, 10);
                return ["/", "/warehouse"].includes(url) ? true : false;
              }}
            >
              Warehouses
            </NavLink>
          </li>
          <li className="header__link-item">
            <NavLink
              to="/inventory"
              className="header__link"
              activeClassName="header__active-link"
              isActive={() => {
                const url = pathname.slice(0, 10);
                return ["/inventory"].includes(url) ? true : false;
              }}
            >
              Inventory
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
