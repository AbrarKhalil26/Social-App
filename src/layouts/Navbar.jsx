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
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar className="flex items-center">
      <NavbarBrand as={Link} to="/">
        <span className="font-logo self-center whitespace-nowrap text-3xl p-2 font-semibold dark:text-white">Kudo</span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/login">Login</DropdownItem>
          <DropdownItem as={Link} to="/register">Register</DropdownItem>
          <DropdownItem as={Link} to="/profile">Profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem as="button">Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink to="/" className={({isActive})=> isActive ? 'text-white font-bold': 'text-gray-400'}>Home</NavLink>
        <NavLink to="/posts" className={({isActive})=> isActive ? 'text-white font-bold': 'text-gray-400'}>Posts</NavLink>
      </NavbarCollapse>
    </Navbar>
  )
}
