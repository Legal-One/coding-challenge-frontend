const { 
    getAgentsMap,
    getAgentById
} = require('../agent');
const fs = require('fs');

describe('Agent', function() {
    test('getAgentsMap', function() {
        return getAgentsMap().then((agentsMap) => {
            expect(agentsMap.has('356b03dc-9ec5-11e7-97a6-d501104f897e')).toEqual(true);
        });
    });

    test('getAgentsMap error', function() {
        return getAgentsMap('json-data/agents2.json').then((agentsMap) => {
            expect(agentsMap.size).toEqual(0);
        });
    });


    test('getAgentsById', function() {
        return getAgentById('356b03dc-9ec5-11e7-97a6-d501104f897e').then((agent) => {
            expect(agent.identifier).toEqual('356b03dc-9ec5-11e7-97a6-d501104f897e');
        });
    });

    test('getAgentsById with wrong path', function() {
        return getAgentById('356b03dc-9ec5-11e7-97a6-d501104f897e', 'json-data/agents2.json').catch(({ message }) => {
            expect(message).toEqual(`ENOENT: no such file or directory, open 'json-data/agents2.json'`);
        });
    });

    test('getAgentsById with wrong id', function() {
        return getAgentById('356b03dc-9ec5-11e7-97a6-d501104f897e233').catch(({ message }) => {
            expect(message).toEqual(`Agent could not be found`);
        });
    });

});