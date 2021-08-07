import React from 'react';
import './App.scss';
import Navigation from './navigation';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorComponent';

function App() {

  return (
    <div className="App">

      <header className="App-header">
        RAHEED FAROOQ ASSIGNMENT
      </header>

      <div className="container p-0">
        <ErrorBoundary FallbackComponent={ErrorComponent} onReset={() => window.location.reload()}>
          <Navigation />
        </ErrorBoundary>
      </div>

    </div> 
  );
}

export default App;
