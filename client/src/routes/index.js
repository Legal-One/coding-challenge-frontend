import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound/NotFound';
import ViewAgent from '../views/ViewAgent';
import ViewNumber from '../views/ViewNumber';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Dashboard />
                </Route>
                <Route exact path='/agent/:ID'>
                    <ViewAgent />
                </Route>
                <Route exact path='/call/:number'>
                    <ViewNumber />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;