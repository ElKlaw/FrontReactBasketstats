import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from './pages/Login';
import { Inscription } from './pages/Inscription';
import { AppBarCustom } from './component/AppBarCustom';
import { Grid } from '@mui/material';
import { Footer } from './component/Footer';
import allRoutes, { IRoute } from "./routing/index"

function App() {
  return (
    <>
      <Router>
        <Route
          path="/"
          render={({history})=>(
            <Grid container>
              <Grid item xs={12}>
                <AppBarCustom isConnect={false} history={history} />
              </Grid>
              <Grid item xs={12} style={{minHeight: "100vh"}}>
                <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/inscription" exact component={Inscription} />
                  {allRoutes.map((route : IRoute) => (
                    <Route key={route.url} path={route.url} exact={route.exact} component={route.component} />
                  ))}
                </Switch>
              </Grid>
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </Grid>
          )}
        />
      </Router>
    </>
  );
}

export default App;
