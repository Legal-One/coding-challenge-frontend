import React, { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import callCenterReducer from '../features/callcenter/callcenter-slice'

function render(
  ui: JSX.Element,
  {
    initialState = {},
    store = configureStore({
      reducer: {
        callCenter: callCenterReducer
      },
      preloadedState: initialState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    const history = createMemoryHistory()
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
