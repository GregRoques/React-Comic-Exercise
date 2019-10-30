import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './HOC/NavBar';
import Latest from './Pages/Latest';
import Search from './Pages/Search';

const App = () => {

  const NoPage = () => { 
    return <Redirect push to={Latest} />
  };

  return (
    <div>
      <NavBar>
        <Switch>
          <Route exact path="/" component={Latest} />
          <Route exact path="/search" component={Search} />
          <Route component={NoPage} />
        </Switch>
      </NavBar>
    </div>
  );
};

export default App;
