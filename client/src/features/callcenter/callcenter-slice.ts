import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import axios from 'axios'

interface CallCenterState {
  calls: Array<Record<string, string>>
  agents: Record<string, Record<string, any>>
  resolution: Record<string, string>
  isCallsLoading: boolean
}

interface RootState {
  callCenter: Record<string, any>
}

const initialState: CallCenterState = {
  calls: [],
  agents: {},
  resolution: {},
  isCallsLoading: false
}

export const getCalls = createAsyncThunk('callCenter/getCalls', async () => {
  const response = await axios.get(
    `${process.env.API_SERVER ? process.env.API_SERVER : ''}/api/v1/calls`
  )
  return response.data
})

const callCenterSlice = createSlice({
  name: 'callCenter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalls.pending, (state, action) => {
        state.isCallsLoading = true
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.isCallsLoading = false
        state.calls = action.payload.calls
        action.payload.agents.forEach((agent: Record<string, any>) => {
          state.agents[agent.identifier] = { ...agent }
        })
      })
      .addCase(getCalls.rejected, (state, action) => {
        state.isCallsLoading = false
        state.calls = []
      })
  }
})

const getCallList = (state: RootState) => state.callCenter.calls
const getAgentList = (state: RootState) => state.callCenter.agents

export const isCallsLoading = (state: RootState) => state.callCenter.isCallsLoading

export const selectCallStats = createSelector([getCallList, getAgentList], (calls, agents) => {
  const callStats = {}
  console.log(calls)
  console.log('Here')
  calls.forEach((call: Record<string, string>) => {
    if (!callStats[call.number]) {
      callStats[call.number] = {}
      callStats[call.number].numberOfCalls = 1

      callStats[call.number].agent = agents[call.agentIdentifier]
      callStats[call.number].lastCallDate = call.dateTime
    } else {
      callStats[call.number].numberOfCalls++
      const currentLastCallDate = Date.parse(callStats[call.number].lastCallDate)
      const newCurrentLastCallDate = Date.parse(call.dateTime)
      if (currentLastCallDate < newCurrentLastCallDate) {
        callStats[call.number].agent = agents[call.agentIdentifier]
        callStats[call.number].lastCallDate = call.dateTime
      }
    }
  })
  return callStats
})

const reducer = callCenterSlice.reducer
export default reducer
