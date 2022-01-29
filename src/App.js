//Packages
import React, { Suspense } from "react";
import { Link, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";

//Context
import { GifsContextProvider } from "context/GifsContext";
import { UserContextProvider } from "context/UserContext";

//Hooks
//Components
import Header from "components/Header";

//Pages
import SearchResults from "pages/SearchResults";
import Detail from "pages/Detail";
import e404 from "pages/e404";
import LoginPage from "pages/LoginPage";
import LogoutPage from "pages/LogoutPage";
import RegisterPage from "pages/RegisterPage";

//Other
import "./App.css";

//Lazy loading
const HomePage = React.lazy(() => import("pages/Home"));

export default function App() {
  return (
    <HelmetProvider>
      <UserContextProvider>
        <div className="App">
          <section className="App-content">
            <Header />
            <Link to="/">
              <figure className="App-logo">
                <img alt="Giffy logo" src="/logo.png" />
              </figure>
            </Link>
            <GifsContextProvider>
              <Suspense fallback={null}>
                <Route component={HomePage} path="/" />
              </Suspense>
              <Route
                component={SearchResults}
                path="/search/:keyword/:rating?"
              />
              <Route component={Detail} path="/gif/:id" />
              <Route component={LoginPage} path="/login" />
              <Route component={RegisterPage} path="/register" />
              <Route component={RegisterPage} path="/signup" />
              <Route component={LogoutPage} path="/logout" />
              <Route component={e404} path="/404" />
            </GifsContextProvider>
          </section>
        </div>
      </UserContextProvider>
    </HelmetProvider>
  );
}
