import React, { PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { UsersList } from "./events/UsersList";
import { EventsList } from "./events/EventsList";
import {
  CCollapse,
  CContainer,
  CHeader,
  CNavbar,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import "./events/styles.scss";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { LoginPage } from "../login";
import { ShopPage } from "./shop";
import { CNavLinkProps } from "@coreui/react/dist/components/nav/CNavLink";
import { Outlet, useLocation } from "react-router";
export const MainPage = () => {
  const location = useLocation();
  return (
    <>
      <CNavbar expand={"sm"} colorScheme="dark" className="bg-primary">
        <CContainer fluid>
          <CNavbarNav>
            <NavLink label={"Главная"} to={"/"} />
            <NavLink label={"Магазин"} to={"/shop"} />
            <NavLink label={"Войти"} to={"/login"} />
          </CNavbarNav>
        </CContainer>
      </CNavbar>
      <Outlet />
    </>
  );
};
const NavLink = ({
  to,
  label,
  ...props
}: { to: string; label: string } & CNavLinkProps) => {
  const navigate = useNavigate();
  const match = useMatch(to);

  return (
    <CNavLink onClick={() => navigate(to)} active={!!match} {...props}>
      {label}
    </CNavLink>
  );
};
