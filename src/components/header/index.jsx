import { Link, React, useDispatch, useSelector, useState } from "components";
import { selectorUtility, utilityAction } from "reduxStore";

const Header = () => {
  const dispatch = useDispatch();
  const menuSidebarCollapsed = useSelector(
    selectorUtility.menuSidebarCollapsed
  );
  const handleToggleMenuSidebar = () => {
    dispatch(utilityAction.toggleSidebarMenu(!menuSidebarCollapsed));
  };
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const logout = () => {
    dispatch(
      utilityAction.setLoading({
        content: true
      })
    );
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/";
      dispatch(utilityAction.stopLoading());
    }, 300);
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={handleToggleMenuSidebar}
            data-widget="pushmenu"
            aria-label="Menu Hide Bar"
            role="button"
          >
            <i className="fas fa-bars" />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
