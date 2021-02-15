import React from 'react'

import { ResolutionProps } from '../../Types/ResolutionType'

function ResolutionTable({ res }: any) {
  const { identifier, resolution } = res

  return (
    <div>
      <ul>
        <li>identifier: {identifier}</li>
        <li>resolution: {resolution}</li>
      </ul>
    </div>
  )
}

export default ResolutionTable
