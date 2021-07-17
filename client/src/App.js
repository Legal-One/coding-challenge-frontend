import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './views/home/Home';
import Agent from './views/agent/Agent';
import Call from './views/call/Call';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/agent/:id" component={Agent} />
                <Route exact path="/call/:number" component={Call} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
