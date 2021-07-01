import React from 'react'
import PropTypes from 'prop-types'
import './avatar.css'

function Avatar({ avatar, large, name, ...props }) {
  ;<img
    className={large ? 'avatar' : 'avatar--large'}
    src={avatar}
    alt={name}
    {...props}
  />
}

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool
}

Avatar.defaultProps = {
  large: false
}

export default Avatar
