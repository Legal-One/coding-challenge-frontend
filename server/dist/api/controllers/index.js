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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
// import agents from "../../../json-data/agents.json";
// import logs from "../../../json-data/logs.json";
// import resolution from "../../../json-data/resolution.json";
const getDashboardData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ answer: "working" });
});
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=index.js.map