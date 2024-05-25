"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const connection_1 = __importDefault(require("./database/connection"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
const PORT = Number(process.env.PORT) || 3000;
connection_1.default.connect()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    });
})
    .catch((e) => {
    if (e instanceof Error) {
        console.error("Erro connecting to database:", e.message);
    }
    else {
        console.error("Error connecting to database:", e);
    }
});
