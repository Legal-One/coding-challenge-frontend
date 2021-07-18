import Routes from './routes';
import { Provider } from './infrastructure/context';

// Styling
import './styles/main.scss';

const App = (): JSX.Element => {
	return (
		<Provider>
			<Routes />
		</Provider>
	);
};

export default App;
