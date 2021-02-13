import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogs } from '../redux/actions/LogsActions'
import { Logs } from '../Types/LogsType'
import { AppState } from '../Types/'

export const useLogs = () => {
  const [logsData, setLogsData] = useState<Logs[]>([])
  const logs = useSelector((state: AppState) => state.logs.logs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLogs())
  }, [dispatch])

  useEffect(() => {
    setLogsData(logs)
  }, [logs])
  return [logsData]
}
