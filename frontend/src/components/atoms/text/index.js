import React from 'react'
import PropTypes from 'prop-types'
import './text.css'

function Text({ primary, color, size, bold, children, ...props }) {
  const mode = primary ? 'primary' : 'secondary'
  return (
    <div
      className={[
        'text',
        `text--${size}`,
        `${bold && 'text--bold'}`,
        `text--${mode}`
      ].join(' ')}
      style={color && { color }}
      {...props}
    >
      {children}
    </div>
  )
}

Text.propTypes = {
  primary: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p1', 'p2']),
  bold: PropTypes.bool
}

Text.defaultProps = {
  bold: false,
  primary: false,
  size: 'p2'
}

export default Text
