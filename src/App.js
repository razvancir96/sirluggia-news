import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';
import Page404 from './pages/Page404/Page404';

class App extends React.Component {
  render() {
    return(
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/article/:articleId" component={Article}/>
          <Route path="*" component={Page404}/>
        </Switch>
      </div>
    )
  }
}

export default App;
