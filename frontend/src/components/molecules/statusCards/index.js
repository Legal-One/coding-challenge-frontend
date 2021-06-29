import React from 'react'
import PropTypes from 'prop-types'
import './statusCard.css'

import Text from '../../atoms/text'

function StatusCard({ status, count, ...props }) {
  return (
    <div className="statusCard">
      <Text size="p1" primary>
        {status}
      </Text>
      <Text size="h3" primary bold>
        {count}
      </Text>
    </div>
  )
}

StatusCard.propTypes = {
  status: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default StatusCard
