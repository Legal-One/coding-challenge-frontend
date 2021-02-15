import React from 'react'

import ResolutionTable from '../../components/ResolutionTable'

const Resolution = ({ resolution }: any) => {
  return (
    <div>
      {resolution &&
        resolution.map((res: any) => <ResolutionTable key={res._id} res={res} />)}
    </div>
  )
}

export default Resolution
