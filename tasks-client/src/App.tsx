import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.scss";
import Loader from "./components/ui/Loader";
import AuthRoute from "./routes/AuthRoute";
import { useAuth } from "./store/auth";
import Edit from "./views/Edit";
import Overview from "./views/Overview";
import Welcome from "./views/Welcome";

const App: React.FC = () => {
  const getUser = useAuth((state) => state.getUser);
  const [beginUserLoad, setBeginUserLoad] = useState(false);
  const isLoading = useAuth((state) => state.isLoading);
  const currentUser = useAuth((state) => state.currentUser);

  useEffect(() => {
    getUser(true);
    setBeginUserLoad(true);
  }, [getUser]);

  const navigationMenu = currentUser ? (
    <div className="navbar-menu">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Overview
        </Link>
        <Link to="/edit" className="navbar-item">
          Edit
        </Link>
      </div>
    </div>
  ) : undefined;

  const routes =
    beginUserLoad && !isLoading ? (
      <Switch>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <AuthRoute
          user={currentUser}
          exact
          path="/edit"
          redirectPath="/welcome"
        >
          <Edit />
        </AuthRoute>
        <AuthRoute user={currentUser} exact path="/" redirectPath="/welcome">
          <Overview />
        </AuthRoute>
      </Switch>
    ) : undefined;

  return (
    <BrowserRouter>
      <nav className="navbar is-info" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item"></div>
        </div>
        {navigationMenu}
      </nav>
      <section className="section">
        <div className="container">
          {isLoading || (!beginUserLoad && <Loader radius={200} />)}
          {routes}
        </div>
      </section>
    </BrowserRouter>
  );
};

export default App;