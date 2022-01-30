import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Details from '../components/Details';
import Base from '../components/Base'
import Form from '../components/Form';
import Result from '../components/Result';

const AppRouter = () => (
  <BrowserRouter>
    {/* <div className=""> */}
      <Switch>
        <Route component={Form} path="/form" />
        <Route component={Result} path="/result" exact={true} />
        <Route component={Base} path="/" />
        <Route component={Details} path="/details" />
      </Switch>
    {/* </div> */}
  </BrowserRouter>
);

export default AppRouter;
