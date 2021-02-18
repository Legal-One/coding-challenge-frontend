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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
describe('Test index and 404 routes', function () {
    it('should return success for the index route', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(index_1.default).get('/')];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body.status).toBe('success');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error for a route that does not exist', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(index_1.default).get('/bogus-route')];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(404);
                    expect(result.body.status).toBe('error');
                    expect(result.body.message).toBe('Route does not exist');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get Calls endpoint GET /calls', function () {
    it('should return a formatted payload for all calls', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var result, firstItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(index_1.default).get('/calls')];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body.status).toBe('success');
                    expect(result.body.data).toBeInstanceOf(Object);
                    firstItem = result.body.data.calls[0];
                    expect(firstItem).toHaveProperty('phoneNumber');
                    expect(firstItem).toHaveProperty('numberOfCalls');
                    expect(firstItem).toHaveProperty('lastCall');
                    expect(firstItem.lastCall).toHaveProperty('agent');
                    expect(firstItem.lastCall).toHaveProperty('duration');
                    expect(firstItem.lastCall).toHaveProperty('dateTime');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get Agent Calls GET /agent/{ID}', function () {
    it('should return a return a payload for agent calls ', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var agentId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agentId = '356b03dc-9ec5-11e7-97a6-d501104f897e';
                    return [4 /*yield*/, supertest_1.default(index_1.default).get("/agent/" + agentId)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body.status).toBe('success');
                    expect(result.body.data).toBeInstanceOf(Object);
                    expect(result.body.data).toHaveProperty('agent');
                    expect(result.body.data).toHaveProperty('calls');
                    expect(result.body.data.agent).toHaveProperty('firstName');
                    expect(result.body.data.agent).toHaveProperty('lastName');
                    expect(result.body.data.calls[0]).toHaveProperty('resolution');
                    expect(result.body.data.calls[0]).toHaveProperty('duration');
                    expect(result.body.data.calls[0]).toHaveProperty('dateTime');
                    expect(result.body.data.agent.identifier).toMatch(agentId);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 for a bogus agent id', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var agentId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agentId = '356b03dc-9ec5-11es7-97a6-dss501104f897e';
                    return [4 /*yield*/, supertest_1.default(index_1.default).get("/agent/" + agentId)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(404);
                    expect(result.body.status).toBe('error');
                    expect(result.body.message).toBe("Agent with ID " + agentId + " does not exist");
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get Call Details GET /call/{number}', function () {
    it('should return a formatted structure for call details ', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var phoneNumber, result, firstItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = '+49151484522';
                    return [4 /*yield*/, supertest_1.default(index_1.default).get("/call/" + phoneNumber)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body.status).toBe('success');
                    expect(result.body.data).toBeInstanceOf(Array);
                    firstItem = result.body.data[0];
                    expect(firstItem).toHaveProperty('agent');
                    expect(firstItem).toHaveProperty('duration');
                    expect(firstItem).toHaveProperty('dateTime');
                    expect(firstItem).toHaveProperty('resolution');
                    expect(firstItem.agent).toHaveProperty('firstName');
                    expect(firstItem.agent).toHaveProperty('lastName');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 for a bogus phone number', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var phoneNumber, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = '+4rr9151484522';
                    return [4 /*yield*/, supertest_1.default(index_1.default).get("/call/" + phoneNumber)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(404);
                    expect(result.body.status).toBe('error');
                    expect(result.body.message).toBe("No call log exists for " + phoneNumber);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
