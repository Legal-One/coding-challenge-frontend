import React from 'react'

import ResolutionTable from '../../components/ResolutionTable'
import { useResolution } from '../../Hooks/useResolution'

const Resolution = () => {
  const [resData] = useResolution()
  return (
    <div>
      {resData &&
        resData.map((res) => <ResolutionTable key={res._id} res={res} />)}
    </div>
  )
}

export default Resolution
