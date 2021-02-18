"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
// Create a new express app instance
var app = express_1.default();
app.use(cors_1.default());
app.get('/', function (_request, response) {
    return response.status(200).json({
        status: 'success',
        message: 'App is running',
    });
});
var port = process.env.PORT || 3000;
app.use('/', routes_1.default);
if (process.env.NODE_ENV !== 'test') {
    console.log('I entered here');
    app.listen(port, function () { return console.log("App running on http://localhost:" + port); });
}
exports.default = app;
