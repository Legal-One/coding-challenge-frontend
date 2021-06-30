import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import EntryPoint from './screens'
import configureStore from './store'

const { store, persistor } = configureStore()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <EntryPoint />
        </HashRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
