"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberRecords = exports.getDashboardData = exports.getAgentRecords = exports.getAllAgents = void 0;
const utilityResponse_1 = __importDefault(require("../utils/utilityResponse"));
const agents_json_1 = __importDefault(require("../../../../json-data/agents.json"));
const logs_json_1 = __importDefault(require("../../../../json-data/logs.json"));
const resolution_json_1 = __importDefault(require("../../../../json-data/resolution.json"));
// Get dashboard data
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = getAllDashData();
        return utilityResponse_1.default({ data, message: 'Dashboard data', res, statusCode: 200 });
    }
    catch (err) {
        return utilityResponse_1.default({ message: err.msg, res, statusCode: 500 });
    }
});
exports.getDashboardData = getDashboardData;
// Get agent data
const getAgentRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier: id } = req.params;
        if (!id)
            return utilityResponse_1.default({ message: 'Invalid Id', res, statusCode: 400 });
        const agentData = agents_json_1.default.find(agent => agent.identifier === id);
        if (!agentData)
            return utilityResponse_1.default({ message: 'Agent not found', res, statusCode: 404 });
        const agentLogs = getAllDashData().filter(logData => logData.agentIdentifier === id);
        const data = {
            agent: agentData,
            log: agentLogs,
        };
        return utilityResponse_1.default({ data, message: 'Dashboard data', res, statusCode: 200 });
    }
    catch (err) {
        return utilityResponse_1.default({ message: err.msg, res, statusCode: 500 });
    }
});
exports.getAgentRecords = getAgentRecords;
const getNumberRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number } = req.params;
        if (!number)
            return utilityResponse_1.default({ message: 'Invalid number', res, statusCode: 400 });
        const data = getAllDashData().filter(log => log.number === number);
        return utilityResponse_1.default({ data, message: 'Dashboard data', res, statusCode: 200 });
    }
    catch (err) {
        return utilityResponse_1.default({ message: err.msg, res, statusCode: 500 });
    }
});
exports.getNumberRecords = getNumberRecords;
const getAllAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return utilityResponse_1.default({ data: agents_json_1.default, message: 'All agents', res, statusCode: 200 });
    }
    catch (err) {
        return utilityResponse_1.default({ message: err.msg, res, statusCode: 500 });
    }
});
exports.getAllAgents = getAllAgents;
const getAllDashData = () => {
    const dataWithResolutionLogData = logs_json_1.default.map(log => (Object.assign(Object.assign(Object.assign({}, resolution_json_1.default.find(resolution => resolution.identifier === log.identifier)), agents_json_1.default.find(agent => agent.identifier === log.agentIdentifier)), log)));
    return dataWithResolutionLogData;
};
