import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./main";
import { LoginPage } from "./login";
import { ShopPage } from "./main/shop";
import { CRow } from "@coreui/react";
import { UsersList } from "./main/events/UsersList";
import { EventsList } from "./main/events/EventsList";

export const AppNavigation = () => (
  <Routes>
    <Route path={"/"} element={<MainPage />}>
      <Route
        index
        element={
          <CRow>
            <UsersList />
            <EventsList />
          </CRow>
        }
      />
      <Route path={"shop"} element={<ShopPage />} />
    </Route>
    <Route path={"/login"} element={<LoginPage />} />
  </Routes>
);
