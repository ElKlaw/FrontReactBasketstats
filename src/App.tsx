import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Inscription } from './pages/Inscription';
import { AppBarCustom } from './component/AppBarCustom';
import { Grid } from '@material-ui/core';
import { CustomMenu } from './component/Menu';
import { ClubsSearch } from './pages/Club/ClubsSearch';
import { Footer } from './component/Footer';
import { ClubHome } from './pages/Club/ClubHome';
import { CreerClub } from './pages/Club/CreerClub';

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
              <Grid item xs={12}>
                <CustomMenu history={history}/>
              </Grid>
              <Grid item xs={12} style={{minHeight: "100vh"}}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/inscription" exact component={Inscription} />
                  <Route path="/clubs" exact component={ClubsSearch} />
                  <Route path="/club/:id/accueil" exact component={ClubHome} />
                  <Route path="/creer-club" exact component={CreerClub} />
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
