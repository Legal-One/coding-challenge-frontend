import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// PAGES
import Dashboard from '../presentation/pages/Dashboard';
import Call from '../presentation/pages/Call';
import Agent from '../presentation/pages/Agent';

import { ROUTES } from '../constants';

const RouterComponent = () => {
	return (
		<Router>
			<Switch>
				<Route component={Call} path={`${ROUTES.CALL}/:id`} />
				<Route component={Agent} path={`${ROUTES.AGENT}/:id`} />
				<Route component={Dashboard} path={ROUTES.DASHBOARD} exact />
			</Switch>
		</Router>
	);
};

export default RouterComponent;
