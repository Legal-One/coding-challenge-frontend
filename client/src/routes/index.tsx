import { BrowserRouter as Router, Route } from 'react-router-dom';

// PAGES
import Dashboard from '../presentation/pages/Dashboard';
import Call from '../presentation/pages/Call';
import Agent from '../presentation/pages/Call';

import { ROUTES } from '../constants';

const RouterComponent = () => {
	return (
		<Router>
			<Route component={Agent} path={`${ROUTES.AGENT}/:id`} />
			<Route component={Call} path={`${ROUTES.CALL}/:id`} />
			<Route component={Dashboard} path={ROUTES.DASHBOARD} exact />
		</Router>
	);
};

export default RouterComponent;
