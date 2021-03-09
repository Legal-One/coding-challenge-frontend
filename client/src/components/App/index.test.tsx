import React from 'react'
import { render, fireEvent } from '../../utils/test-utils'
import App from './index'
import reducer from '../../features/callcenter/callcenter-slice'
import { LoadStatus } from '../../types'
import axios from 'axios'
import { screen } from '@testing-library/react'

describe('App Component Test ', () => {
  test('App component renders', () => {
    const { getByText } = render(<App />, {
      initialState: {
        callCenter: {
          calls: {},
          callIds: [],
          agents: {},
          resolutions: {},
          resolutionTypes: [],
          isCallsLoading: LoadStatus.NOTLOADED
        }
      }
    })
    getByText('Call Details at a Glance')
    getByText(/Loading/)
  })
})
