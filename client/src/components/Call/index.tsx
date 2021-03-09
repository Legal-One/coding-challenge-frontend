import React from 'react'
import { useParams } from 'react-router-dom'
import CallNumberStats from './call-number-stats'

function Call() {
  const { number } = useParams<Record<string, string>>()
  return (
    <div>
      <CallNumberStats number={number} />
    </div>
  )
}

export default Call
