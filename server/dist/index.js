"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./api/routes"));
const app = express_1.default();
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
// Implement Cors
app.use(cors_1.default());
// Body parser, reading data from body into req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use("/", routes_1.default);
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map