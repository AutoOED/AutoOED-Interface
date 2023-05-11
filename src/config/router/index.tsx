import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import { Layout } from "@/layout";
import MainView from "@/views/mainView";

export const WrapperRouteComponent = (props: { element: any }) => {
  const location = useLocation();
  const { pathname } = location;
  return pathname === "/" ? (
    <Navigate to={{ pathname: "/experiment" }} replace />
  ) : (
    props.element
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WrapperRouteComponent element={<Layout />}></WrapperRouteComponent>
    ),
    children: [{ path: "experiment", element: <MainView /> }],
  },
]);

export default router;
