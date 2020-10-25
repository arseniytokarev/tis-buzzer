import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Join from './containers/Join';
import Room from './containers/Room';
import Create from './containers/Create';
import './scss/main.scss';

function App() {
  return (
    <div className='container'>
      <Switch>
        <Route path='/room' component={Room} />
        <Route path='/create' component={Create} />
        <Route path='/' component={Join} />
      </Switch>
    </div>
  );
}

export default App;
