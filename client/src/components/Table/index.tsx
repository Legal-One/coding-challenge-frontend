import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCallStats,
  getCalls,
  isCallsLoading
} from '../../features/callcenter/callcenter-slice'
import { useAppDispatch } from '../../store'

function Table() {
  const stats = useSelector(selectCallStats)
  const dispatch = useAppDispatch()

  const getCallData = useCallback(async () => {
    await dispatch(getCalls())
  }, [dispatch])

  useEffect(() => {
    getCallData()
  }, [getCallData])

  return <div className="card table">This is table component</div>
}

export default Table
