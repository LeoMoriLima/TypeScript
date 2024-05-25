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
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
    if (data.name.length < 4) {
        throw new Error('O nome deve ser maior do que 4 letras!');
    }
    if (!nameRegex.test(data.name)) {
        throw new Error('O nome só pode conter letras e espaços!');
    }
    if (!emailRegex.test(data.email)) {
        throw new Error('Email inválido!');
    }
    if (data.password.length < 8) {
        throw new Error('A senha deve ser maior do que 8 caracteres!');
    }
    if (!passwordRegex.test(data.password)) {
        throw new Error('Senha inválida');
    }
    try {
        const newUser = yield userRepository_1.default.register(data);
        return newUser;
        ;
    }
    catch (error) {
        throw error;
    }
});
const getUserById = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield userRepository_1.default.getUserById(data);
        return getUser || null;
    }
    catch (error) {
        throw error;
    }
});
const login = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
    if (!emailRegex.test(loginData.email)) {
        throw new Error('Email inválido!');
    }
    if (loginData.password.length < 8) {
        throw new Error('A senha deve ser maior do que 8 caracteres!');
    }
    if (!passwordRegex.test(loginData.password)) {
        throw new Error('Senha inválida');
    }
    try {
        const getUser = yield userRepository_1.default.getUser(loginData);
        if (getUser) {
            const token = jsonwebtoken_1.default.sign({ id: getUser.id }, config_1.default.SECRET_KEY, { expiresIn: 864000 });
            return { auth: true, token, getUser };
        }
        return null;
    }
    catch (error) {
        throw error;
    }
});
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
    if (data.name.length < 4) {
        throw new Error('O nome deve ser maior do que 4 letras!');
    }
    if (!nameRegex.test(data.name)) {
        throw new Error('O nome só pode conter letras e espaços!');
    }
    if (!emailRegex.test(data.email)) {
        throw new Error('Email inválido!');
    }
    if (data.password.length < 8) {
        throw new Error('A senha deve ser maior do que 8 caracteres!');
    }
    if (!passwordRegex.test(data.password)) {
        throw new Error('Senha inválida');
    }
    try {
        const update = yield userRepository_1.default.updateUser(data);
        return update;
    }
    catch (error) {
        throw error;
    }
});
const deleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userRepository_1.default.deleteUser(data);
    }
    catch (error) {
        throw error;
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository_1.default.getAllUsers();
        return users;
    }
    catch (error) {
        throw error;
    }
});
module.exports = {
    register,
    login,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
};
