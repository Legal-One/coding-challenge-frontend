import React from 'react';
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <h1>
      Not Found.
      <Link to="/">Click here and start again.</Link>
    </h1>
  )
}

export default NotFound404
