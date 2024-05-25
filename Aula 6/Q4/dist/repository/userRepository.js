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
const connection_1 = __importDefault(require("../database/connection"));
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'INSERT INTO "user" (email, name, password) VALUES ($1, $2, $3) RETURNING id, name, email';
    try {
        client = yield connection_1.default.connect();
        yield client.query('BEGIN');
        const result = yield client.query(query, [data.email, data.name, data.password]);
        yield client.query('COMMIT');
        console.log("Dados inseridos com sucesso");
        if (result.rowCount > 0 && result.rows[0]) {
            return result.rows[0];
        }
        return null;
    }
    catch (error) {
        console.log("Erro ao inserir dados:", error);
        yield client.query('ROLLBACK');
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
const getUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'SELECT id FROM "user" WHERE email = $1';
    try {
        client = yield connection_1.default.connect();
        const result = yield client.query(query, [loginData.email]);
        console.log("Usuário encontrado!");
        if (result.rowCount > 0 && result.rows[0]) {
            return result.rows[0];
        }
    }
    catch (error) {
        console.log("Error ao consultar dados: ", error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
const getUserById = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'SELECT * FROM "user" WHERE id = $1';
    try {
        client = yield connection_1.default.connect();
        const result = yield client.query(query, [data.id]);
        console.log("Usuário encontrado!");
        if (result.rowCount > 0 && result.rows[0]) {
            return result.rows[0];
        }
    }
    catch (error) {
        console.log("Error ao consultar dados: ", error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'UPDATE "user" SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING id, name, email';
    try {
        client = yield connection_1.default.connect();
        const result = yield client.query(query, [data.email, data.name, data.password, data.id]);
        if (result.rowCount > 0 && result.rows[0]) {
            return result.rows[0];
        }
        console.log("Dados atualizados com sucesso!");
    }
    catch (error) {
        console.log("Erro ao atualizar dados: ", error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
const deleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'DELETE FROM "user" WHERE id = $1';
    try {
        client = yield connection_1.default.connect();
        yield client.query(query, [data]);
        console.log("Dados deletados com sucesso!");
    }
    catch (error) {
        console.log("Erro ao deletar dados: ", error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let client = null;
    const query = 'SELECT id, name, email FROM "user"';
    try {
        client = yield connection_1.default.connect();
        const result = yield client.query(query);
        return result.rows;
    }
    catch (error) {
        console.log('Erro ao requisitar dados: ', error);
        throw error;
    }
    finally {
        if (client) {
            client.release();
        }
    }
});
module.exports = {
    register,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
};
