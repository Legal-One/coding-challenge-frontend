import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchResolution } from '../redux/actions/ResolutionActions'
import { Resolution } from '../Types/ResolutionType'
import { AppState } from '../Types/'

export const useResolution = () => {
  const [resData, setResData] = useState<Resolution[]>([])
  const resolution = useSelector(
    (state: AppState) => state.resolution.resolution
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchResolution())
  }, [dispatch])

  useEffect(() => {
    setResData(resolution)
  }, [resolution])

  return [resData]
}
