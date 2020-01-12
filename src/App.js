import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';
import Page404 from './pages/Page404/Page404';
import Favorites from './pages/Favorites/Favorites';
import './utils/utility-classes.scss';

function App() {
  return(
    <div className="app">
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
        <Route path={process.env.PUBLIC_URL + '/article/:articleId+'} component={Article}/>
        <Route path={process.env.PUBLIC_URL + '/favorites'} component={Favorites} />
        <Route path="*" component={Page404}/>
      </Switch>
    </div>
  )
}

export default App;
