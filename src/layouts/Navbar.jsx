import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function AppNavbar() {
  const { token, setToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Navbar className="flex items-center">
      <NavbarBrand as={Link} to="/">
        <span className="font-logo self-center whitespace-nowrap text-xl p-2 font-semibold dark:text-white">
          Kudo
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={userData?.photo || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
              rounded
            />
          }
        >
          {token ? (
            <>
              {userData && <DropdownHeader>
                <span className="block text-sm">{userData.name}</span>
                <span className="block truncate text-sm font-medium">
                  {userData.email}
                </span>
              </DropdownHeader>}
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as="button" onClick={handleLogout}>
                Sign out
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/login">
                Login
              </DropdownItem>
              <DropdownItem as={Link} to="/register">
                Register
              </DropdownItem>
            </>
          )}
        </Dropdown>
        {token && <NavbarToggle />}
      </div>
      <NavbarCollapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-400"
          }
        >
          Posts
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
}
