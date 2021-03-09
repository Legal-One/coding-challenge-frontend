import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoadStatus, RootState } from '../../types'

interface CallCenterState {
  calls: Record<string, Record<string, any>>
  callIds: Array<string>
  agents: Record<string, Record<string, any>>
  resolutions: Record<string, Record<string, any>>
  resolutionTypes: Array<string>
  isCallsLoading: LoadStatus
}

const initialState: CallCenterState = {
  calls: {},
  callIds: [],
  agents: {},
  resolutions: {},
  resolutionTypes: [],
  isCallsLoading: LoadStatus.NOTLOADED
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
        state.isCallsLoading = LoadStatus.PENDING
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.isCallsLoading = LoadStatus.LOADED
        action.payload.calls.forEach((call: Record<string, string>) => {
          state.callIds.push(call.identifier)
          state.calls[call.identifier] = { ...call }
        })
        action.payload.agents.forEach((agent: Record<string, any>) => {
          state.agents[agent.identifier] = { ...agent }
        })
        action.payload.resolutions.forEach((resolution: Record<string, any>) => {
          state.resolutions[resolution.identifier] = { ...resolution }
          if (state.resolutionTypes.indexOf(resolution.resolution) < 0)
            state.resolutionTypes.push(resolution.resolution)
        })
      })
      .addCase(getCalls.rejected, (state) => {
        state.isCallsLoading = LoadStatus.NOTLOADED
      })
  }
})

const getCallList = (state: RootState) => state.callCenter.calls
const getAgentList = (state: RootState) => state.callCenter.agents
const getCallIds = (state: RootState) => state.callCenter.callIds

export const selectLoadStatus = (state: RootState) => state.callCenter.isCallsLoading
export const selectResolutionTypes = (state: RootState) => state.callCenter.resolutionTypes
export const selectAgents = (state: RootState) => state.callCenter.agents

export const selectCallDetails = createSelector(
  [getCallList, getAgentList, getCallIds],
  (calls, agents, callIds) => {
    const callStats = {
      total: {
        calls: 0,
        duration: 0
      }
    }
    callIds.forEach((callId: string) => {
      if (!callStats[calls[callId].number]) {
        callStats[calls[callId].number] = {}
        callStats[calls[callId].number].number = calls[callId].number
        callStats[calls[callId].number].numberOfCalls = 1
        callStats[calls[callId].number].agentName = `${
          agents[calls[callId].agentIdentifier].firstName
        } ${agents[calls[callId].agentIdentifier].lastName}`
        callStats[calls[callId].number].lastCallDate = calls[callId].dateTime
        callStats[calls[callId].number].agentIdentifier = calls[callId].agentIdentifier
      } else {
        callStats[calls[callId].number].numberOfCalls++
        const currentLastCallDate = Date.parse(callStats[calls[callId].number].lastCallDate)
        const newCurrentLastCallDate = Date.parse(calls[callId].dateTime)
        if (currentLastCallDate < newCurrentLastCallDate) {
          callStats[calls[callId].number].agent = `${
            agents[calls[callId].agentIdentifier].firstName
          } ${agents[calls[callId].agentIdentifier].lastName}`
          callStats[calls[callId].number].agentIdentifier = calls[callId].agentIdentifier
          callStats[calls[callId].number].lastCallDate = calls[callId].dateTime
        }
      }
      callStats.total.calls++
      callStats.total.duration += calls[callId].duration
    })
    return callStats
  }
)

export const selectCallStats = createSelector(
  (state: RootState) => state.callCenter.callIds,
  (state: RootState) => state.callCenter.resolutions,

  (callIds, resolutions) => {
    const callStats = {}
    callIds.forEach((callId: string) => {
      if (!callStats[resolutions[callId].resolution.replace(/\s/g, '')]) {
        callStats[resolutions[callId].resolution.replace(/\s/g, '')] = 1
      } else {
        callStats[resolutions[callId].resolution.replace(/\s/g, '')]++
      }
    })
    return callStats
  }
)

export const selectCallPerMonth = createSelector(
  (state: RootState) => state.callCenter.callIds,
  (state: RootState) => state.callCenter.calls,
  (callIds, calls) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const callPerMonth = {}
    months.forEach((month) => {
      callPerMonth[month] = 0
    })
    callIds.forEach((callId: string) => {
      const month = months[new Date(calls[callId].dateTime).getMonth() - 1]
      callPerMonth[month]++
    })
    return callPerMonth
  }
)

const reducer = callCenterSlice.reducer
export default reducer
