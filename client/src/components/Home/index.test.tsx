import React from 'react'
import { render } from '../../utils/test-utils'
import Home from './index'
import { LoadStatus } from '../../types'

import * as asyncActions from '../../features/callcenter/callcenter-slice'
describe('Home Component Test ', () => {
  test('Home component renders', () => {
    const { getByText } = render(<Home />, {
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

  test('Dispatches async thunk action to fetch call data from API', () => {
    const spyGetCalls = jest.spyOn(asyncActions, 'getCalls')
    const { getByText } = render(<Home />, {
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
    expect(spyGetCalls).toBeCalledTimes(1)
  })
})
