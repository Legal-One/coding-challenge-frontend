import React from 'react'
import PropTypes from 'prop-types'
import './badge.css'

const STATUS = [
  {
    status: 'interested',
    text: 'INTERESTED 🚀'
  },
  {
    status: 'needs follow up',
    text: 'NEEDS FOLLOW UP ☕'
  },
  {
    status: 'need reschedule',
    text: 'NEED RESCHEDULE ⏱'
  },
  {
    status: 'no answer',
    text: 'NO ANSWER 🤯'
  }
]

function Badge({ status, ...props }) {
  return (
    <div
      className={['badge', `badge--${status.replaceAll(' ', '--')}`].join(' ')}
      {...props}
    >
      {STATUS.find((obj) => obj.status === status).text}
    </div>
  )
}

Badge.propTypes = {
  status: PropTypes.oneOf([
    'interested',
    'needs follow up',
    'need reschedule',
    'no answer'
  ]).isRequired
}

export default Badge
