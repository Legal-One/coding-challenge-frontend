"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilityResponse = ({ res, data = null, message, statusCode, }) => res.status(statusCode).json({
    data,
    message,
    status: statusCode === 400 || statusCode === 500 ? 'ERROR' : 'SUCCESS',
});
exports.default = utilityResponse;
