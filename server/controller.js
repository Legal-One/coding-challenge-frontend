"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallDetails = exports.getAgentCalls = exports.getAllCalls = void 0;
var logs_json_1 = __importDefault(require("../json-data/logs.json"));
var agents_json_1 = __importDefault(require("../json-data/agents.json"));
var resolution_json_1 = __importDefault(require("../json-data/resolution.json"));
var getAllCalls = function (_request, response) {
    var allCalls = {};
    logs_json_1.default.forEach(function (callLog) {
        if (allCalls[callLog.number]) {
            allCalls[callLog.number].push(callLog);
        }
        else {
            allCalls[callLog.number] = [callLog];
        }
    });
    var transformedData = Object.keys(allCalls).map(function (number) {
        var allCallsForNumber = allCalls[number];
        var numberOfCalls = allCallsForNumber.length;
        var sortedCalls = allCallsForNumber.sort(function (_a, _b) {
            var currentCallTime = _a.dateTime;
            var nextCallTime = _b.dateTime;
            if (currentCallTime > nextCallTime) {
                return -1;
            }
            if (currentCallTime < nextCallTime) {
                return 1;
            }
            return 0;
        });
        var lastCall = sortedCalls[0];
        var callAgent = agents_json_1.default.find(function (agent) { return agent.identifier === lastCall.agentIdentifier; });
        return {
            phoneNumber: number,
            numberOfCalls: numberOfCalls,
            lastCall: {
                agent: callAgent,
                duration: lastCall.duration,
                dateTime: lastCall.dateTime,
            },
        };
    });
    return response.status(200).json({
        status: 'success',
        data: {
            calls: transformedData,
            totalAgents: agents_json_1.default.length,
            totalCalls: logs_json_1.default.length,
        },
    });
};
exports.getAllCalls = getAllCalls;
var getAgentCalls = function (request, response) {
    var agentId = request.params.ID;
    var callAgent = agents_json_1.default.find(function (agent) { return agent.identifier === agentId; });
    if (!callAgent) {
        return response.status(404).json({
            status: 'error',
            message: "Agent with ID " + agentId + " does not exist",
        });
    }
    var agentCalls = logs_json_1.default
        .filter(function (callLog) { return callLog.agentIdentifier === agentId; })
        .map(function (callLog) {
        var resolution = resolution_json_1.default.find(function (resolution) { return resolution.identifier === callLog.identifier; });
        return __assign(__assign({}, callLog), { resolution: resolution === null || resolution === void 0 ? void 0 : resolution.resolution });
    });
    return response.status(200).json({
        status: 'success',
        data: {
            agent: callAgent,
            calls: agentCalls,
        },
    });
};
exports.getAgentCalls = getAgentCalls;
var getCallDetails = function (request, response) {
    var number = request.params.number;
    if (!number) {
        return response.status(400).json({
            status: 'error',
            message: 'The number field is required',
        });
    }
    var calls = logs_json_1.default
        .filter(function (callLog) { return callLog.number === number; })
        .map(function (callLog) {
        var resolution = resolution_json_1.default.find(function (resolution) { return resolution.identifier === callLog.identifier; });
        var callAgent = agents_json_1.default.find(function (agent) { return agent.identifier === callLog.agentIdentifier; });
        return {
            dateTime: callLog.dateTime,
            duration: callLog.duration,
            resolution: resolution === null || resolution === void 0 ? void 0 : resolution.resolution,
            agent: callAgent,
        };
    });
    if (!calls.length) {
        return response.status(404).json({
            status: 'error',
            message: "No call log exists for " + number,
        });
    }
    return response.status(200).json({
        status: 'success',
        data: calls,
    });
};
exports.getCallDetails = getCallDetails;
