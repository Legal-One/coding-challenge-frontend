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
      number: data[0]["number"],
      number_of_calls: Object.keys(data).length,
      date: filtered_data["dateTime"],
      agent_identifier: filtered_data["agentIdentifier"],
      agent_name: getAgentName(agents, filtered_data["agentIdentifier"]),
    };
}

export const hourAndMinute = originalDate => {
  const date = new Date(originalDate);

  return `${date.getHours()}:${date.getMinutes()}`;
};

export const dateAndTime = originalDate => {
  const date = new Date(originalDate);

  const dateOnly = date.toLocaleDateString();
  const timeOnly = date.toTimeString().split(' ')[0];

  return `${dateOnly} ${timeOnly}`;
};

export const filterObject = (obj, filter, filterValue) => 
   Object.keys(obj).reduce((acc, val) => 
   (obj[val][filter] === filterValue ? acc : {
       ...acc,
       [val]: obj[val]
   }                                        
), {});