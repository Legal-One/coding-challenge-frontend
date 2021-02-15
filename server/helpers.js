exports.logIntersectAgent = (log, agents) => {
  const agent = agents.find((agent) => agent.identifier == log.agentIdentifier);
  return { ...log, agent };
};

exports.countLogs = (accumulator, value) => {
  const foundIndex = accumulator.findIndex((x) => x.number === value.number);
  if (foundIndex !== -1) {
    accumulator[foundIndex].count++;
    return accumulator;
  } else {
    accumulator.push({ ...value, count: 1 });
    return accumulator;
  }
};

exports.logIntersectResolution = (log, resolutions) => {
  const resolution = resolutions.find(
    (resolution) => resolution.identifier === log.identifier
  );
  return { ...log, resolution };
};
