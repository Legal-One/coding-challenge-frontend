import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Chart as RChart } from 'react-google-charts';

const Chart = ({
  data, setView, title, homeLink
}) => {
  return (
    <div>
      {homeLink && <Link to="/"><button type="button">Home</button></Link>}
      <button type="button" className="red" onClick={setView}>Table</button>
      <RChart
        width={700}
        height={500}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  setView: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  homeLink: PropTypes.bool.isRequired
}

export default Chart
