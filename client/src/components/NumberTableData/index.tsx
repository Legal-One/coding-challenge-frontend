import React from 'react'
import { Link } from 'react-router-dom'

import { LogProps } from '../../Types/ui'

function NumberTableData({ logs }: LogProps) {
  const { number, identifier } = logs
  return (
    <div>
      <Link
        to={`/numberlog/${identifier}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        {number}
      </Link>
    </div>
  )
}

export default NumberTableData
