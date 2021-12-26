const { 
    getAgentsMap
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
});