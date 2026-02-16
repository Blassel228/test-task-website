import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../Pages/Home.tsx";
import Layout from "../Layout.tsx";
import routers from "../../Constants/routers.tsx";
import CatalogPage from "../../Pages/Catalog.tsx";

export default function Routers() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={routers.home} element={<HomePage />} />
        <Route path={routers.catalog} element={<CatalogPage />} />
      </Route>
      <Route
        path={routers.notExisting}
        element={<Navigate to={routers.home} replace />}
      />
    </Routes>
  );
}