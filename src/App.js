import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AdminToolBar from "./components/AdminToolBar";
import "./default.scss";
import WithAdminAuth from "./hoc/withAdminAuth";
import WithAuth from "./hoc/withAuth";
import AdminLayout from "./Layouts/AdminLayout";
import HomepageLayout from "./Layouts/HomepageLayout";
import MainLayout from "./Layouts/MainLayout";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import Search from "./pages/Search";
import { checkUserSession } from "./redux/User/user.actions";

const App = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const authListener = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await handleUserProfile(userAuth);
  //       userRef.onSnapshot((snapshot) => {
  //         dispatch(
  //           setCurrentUser({
  //             id: snapshot.id,
  //             ...snapshot.data(),
  //           })
  //         );
  //       });
  //     }
  //     dispatch(setCurrentUser(userAuth));
  //   });
  //   return () => {
  //     authListener();
  //   };
  // }, []);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
