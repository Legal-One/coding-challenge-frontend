export const getAgentName = (agents, id) => {
    return agents.filter(function (agent) {
        return agent.identifier === id;
    })[0].firstName;
}

export const groupBy = (data, key) => {
    return data.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
}

export const get_aggregated_data = (agents, data) => {
    data = JSON.parse(JSON.stringify(data))
    var aggregated_numbers = groupBy(data, "number");
    for (let id in aggregated_numbers) {
      aggregated_numbers[id] = findLatestCall(agents, aggregated_numbers[id]);
    }
    return Object.values(aggregated_numbers)
}

export const findLatestCall = (agents, data) => {
    var filtered_data = data.reduce((a, b) => {
      return new Date(a.dateTime) > new Date(b.dateTime) ? a : b;
    });
    return {
      number_of_calls: Object.keys(data).length,
      date: filtered_data["dateTime"],
      agent_identifier: filtered_data["agentIdentifier"],
      agent_name: getAgentName(agents, filtered_data["agentIdentifier"]),
    };
}