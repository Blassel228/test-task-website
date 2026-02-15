import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/Home.tsx";
import Layout from "../Layout.tsx";
import routers from "../../Constants/routers.tsx";

export default function Routers() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routers.home} element={<HomePage />} />
      </Route>
    </Routes>
  );
}