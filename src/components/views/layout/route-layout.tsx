import React from "react";
import cookie from 'react-cookies';
import { Redirect, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { PERMISSION, hasPermission } from "../../../guards/role-guard";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { showMessage } from "../../atoms/notification/notification";
import AnonymousLayout from "./anonymous/anonymous";
import MainLayout from './main/main';
import Dashboard from "../../layout/Dashboard";
import SignIn from "../../../pages/sign-in/sign-in";

export interface LayoutProps {
  pageTitle: React.ReactNode;
  setPageTitle: (node: React.ReactNode) => void;
  avatar: string;
}

const RouteLayout = ({ component: Component, ...rest }: any) => {
  const homePage = ROUTE_PATHS.Home;
  const [pageTitle, setPageTitle] = React.useState<React.ReactNode>("");
  const { isAuthenticated } = useAuthContext();


  const isLoginRequired = rest.loginRequired;
  const expectedPermissions = rest.permissions as PERMISSION[];

  React.useEffect(() => {
    if (isAuthenticated && isLoginRequired && expectedPermissions.length > 0 && !hasPermission(expectedPermissions)) {
      Object.keys(cookie.loadAll()).forEach((item) => {
        cookie.remove(item);
      });
      showMessage({ message: "You don't have permission to do this action", type: "error" });
    }
  }, [isAuthenticated, isLoginRequired, expectedPermissions]);

  const renderLayout = () => {
    if (isAuthenticated) {
      return (
          <Dashboard>
            <Component />
          </Dashboard>
        );
      // if (!isLoginRequired) {
        
      //   return <Redirect to={{ pathname: homePage }} />;
      // }
      // if (isLoginRequired) {
      //   return (
      //     <MainLayout>
      //       <Component
      //         pageTitle={pageTitle}
      //         setPageTitle={setPageTitle}
      //       />
      //     </MainLayout>
      //   );
      // }
    } else {
      if (isLoginRequired) {
        return <SignIn />;
      }
      return (
        
          <Component />
      );
    }
    
  };

  return <Route {...rest} render={renderLayout} />;
};

export default RouteLayout;
