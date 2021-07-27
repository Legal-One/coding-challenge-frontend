export const getAgentName = (agents, id) => {
    return agents.filter(function (agent) {
        return agent.identifier === id;
    })[0];
}

