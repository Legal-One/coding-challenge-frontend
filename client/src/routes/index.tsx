import { BrowserRouter as Router, Route } from 'react-router-dom';

// PAGES
import Dashboard from '../presentation/pages/Dashboard';

import { ROUTES } from '../constants';

const RouterComponent = () => {
	return (
		<Router>
			<Route component={Dashboard} path={ROUTES.DASHBOARD} exact />
		</Router>
	);
};

export default RouterComponent;
