const { getAgentById } = require('../utils/agent');
const { getPhoneLogsByAgent } = require('../utils/logs');

const AgentLogs = { 
    getAgentDetails: (req, res) => {
        const { params } = req;
        const { id } = params;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present"})
        }

        Promise.all([getAgentById(id), getPhoneLogsByAgent(id)]).then((values) => {
            res.status(200).json({ 
                status: 200,
                agent: values[0],
                logs: values[1],
            });
        }).catch(({ message }) => {
            res.status(404).json({ status: 404, message });
        });
    },
};

module.exports = AgentLogs