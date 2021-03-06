const ComponentTypeEnum = Object.freeze({
  logs: 'logs', call: 'call', agent: 'agent'
})

const fetchData = async (url) => {
  const response = await fetch(url)
  const data = response.json()
  return data
}

const getTableData = (data, type) => {
  const headers = {
    logs: ['Phone number', 'Number of calls', 'Last call details'],
    call: ['Agent Name', 'Call date and time', 'Resolution'],
    agent: ['Phone number', 'Call date and time', 'Resolution']
  }

  return [headers[type], ...data]
}

class LogsChart {
  static header = ['Phone number', 'Number of calls']

  static chartData(data) {
    const dataSet = data.map((item) => {
      const phoneNumber = item[0]
      const numberOfCalls = parseInt(item[1].split(' ')[0], 10)
      return [phoneNumber, numberOfCalls]
    })
    return [this.header, ...dataSet]
  }
}

class AgentChart {
  static header = ['Agent', 'Resolutions Percentage']

  static chartData(data) {
    const resolutionsObj = {}

    data.map((item) => {
      const resolution = item[2]
      resolutionsObj[resolution] ? resolutionsObj[resolution]++ : resolutionsObj[resolution] = 1
      return true
    })

    const dataSet = Object.entries(resolutionsObj)

    return [this.header, ...dataSet]
  }
}

class CallChart {
  static header = ['Resolutions', 'Percentage']

  static chartData(data) {
    const resolutionsObj = {}

    data.map((item) => {
      const resolution = item[2]
      resolutionsObj[resolution] ? resolutionsObj[resolution]++ : resolutionsObj[resolution] = 1
      return true
    })

    const dataSet = Object.entries(resolutionsObj)

    return [this.header, ...dataSet]
  }
}

const ChartClassMap = {
  logs: LogsChart,
  call: CallChart,
  agent: AgentChart
}

const getChartData = (data, type) => ChartClassMap[type].chartData(data)

export {
  fetchData, getTableData, getChartData, ComponentTypeEnum, ChartClassMap
}
