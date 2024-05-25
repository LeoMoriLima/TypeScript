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
const userServices = require('../services/userServices');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newUser = yield userServices.register(data);
        const { id, name, email } = newUser;
        return res.status(201).json({ message: `Usuário criado com sucesso: ID: ${id}, Nome: ${name}, Email: ${email}` });
    }
    catch (error) {
        console.error('Erro ao registrar usuário: ', error);
        return res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    try {
        const login = yield userServices.login(loginData);
        if (login.auth) {
            res.cookie('session_id', login.token, { httpOnly: true, expires: new Date(Date.now() + 864000000) });
            const id = login.getUser.id;
            return res.status(200).json({ message: `Usuário logado com sucesso: ID: ${id}` });
        }
    }
    catch (error) {
        console.error('Erro ao consultar usuário: ', error);
        return res.status(500).json({ error: 'Erro ao logar usuário: ' + error.message });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('session_id');
    return res.status(200).json({ success: true });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userInfo = yield userServices.getUserById(req.params);
    userData.id = userInfo.id;
    if (!userData.name) {
        userData.name = userInfo.name;
    }
    if (!userData.password) {
        userData.password = userInfo.password;
    }
    if (!userData.email) {
        userData.email = userInfo.email;
    }
    try {
        const update = yield userServices.updateUser(userData);
        const { id, name, email } = update;
        return res.status(200).json({ message: `Usuário atualizado com sucesso: ID:${id}, Nome: ${name}, Email: ${email}` });
    }
    catch (error) {
        console.log('Erro ao atualizr usuário: ', error);
        return res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield userServices.getUserById(req.params);
    try {
        yield userServices.deleteUser(userInfo.id);
        return res.status(200).json({ message: `Usuário deletado com sucesso: ID:${userInfo.id}, Nome: ${userInfo.name}, Email: ${userInfo.email}` });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao deletar usuário: ' + error.message });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices.getAllUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao requisitar usuários! ' });
    }
});
module.exports = {
    register,
    login,
    logout,
    updateUser,
    deleteUser,
    getAllUsers,
};
