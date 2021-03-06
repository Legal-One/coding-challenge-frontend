import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './Table.module.css'

const Table = ({
  data, setView, endpoint, homeLink
}) => {
  const getHeader = headerData => headerData.map(item => <th key={item} scope="col">{item}</th>)
  const getRows = rowsData => rowsData.map((item) => {
    const identifier = item[3]
    const param = item[4]

    return (
      <tr key={identifier}>
        {item.map((td, index) => {
          return (
            index < 3
            && (index === 0
              ? (
                <td key={identifier + td}>
                  <Link to={{
                    pathname: `/${endpoint}/${param}`,
                    query: { item: item[0] }
                  }}
                  >
                    {td}
                  </Link>
                </td>
              )
              : <td key={identifier + td}>{td}</td>)
          )
        })}
      </tr>
    )
  })

  return (
    <div>
      {homeLink && <Link to="/"><button type="button">Home</button></Link>}
      <button type="button" className="blue" onClick={setView}>Chart</button>
      <table>
        <thead>
          <tr>
            {getHeader(data[0])}
          </tr>
        </thead>
        <tbody>
          {getRows(data.slice(1))}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  setView: PropTypes.func.isRequired,
  endpoint: PropTypes.string.isRequired,
  homeLink: PropTypes.bool.isRequired,
}

export default Table
