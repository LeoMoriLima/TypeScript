const userServices = require('../services/userServices');
import { Request, Response } from "express";

type User = {
    name: string,
    email: string,
    password: string
}

type updateUser = {
    name: string,
    email: string,
    password: string,
    id: number,
}

type Login = {
    email: string,
    password: string,
}

const register = async (req: Request, res: Response) => {
    const data: User = req.body;

    try {
        const newUser = await userServices.register(data);
        const { id, name, email } = newUser;
        return res.status(201).json({ message: `Usuário criado com sucesso: ID: ${id}, Nome: ${name}, Email: ${email}` });
    } catch (error: any){
        console.error('Erro ao registrar usuário: ', error);
        return res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message});
    }

}

const login = async (req: Request, res: Response) => {
    const loginData: Login = req.body;

    try {
        const login = await userServices.login(loginData);

        if (login.auth){
            res.cookie('session_id', login.token, { httpOnly: true, expires: new Date(Date.now() + 864000000)})

            const id = login.getUser.id;
            return res.status(200).json({ message: `Usuário logado com sucesso: ID: ${id}` })
        }
    } catch(error: any){
        res.clearCookie('session_id');
        console.error('Erro ao consultar usuário: ', error);
        return res.status(500).json({ error: 'Erro ao logar usuário: ' + error.message });
    }
}

const logout = async (req: Request, res: Response) => {
    const sessionToken = req.cookies.session_id;
    if (sessionToken){
        res.clearCookie('session_id');
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ message: "Usuário não logado!" });
    }

};


const updateUser = async (req: Request, res: Response) => {
    const userData: updateUser = req.body;

    const userInfo: updateUser = await userServices.getUserById(req.params);
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
        const update:updateUser = await userServices.updateUser(userData);
        const {id, name, email} = update;

        return res.status(200).json({ message: `Usuário atualizado com sucesso: ID:${id}, Nome: ${name}, Email: ${email}` })
    } catch(error:any){
        console.log('Erro ao atualizr usuário: ', error);
        return res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
    }
}

const deleteUser = async(req: Request, res: Response) => {
    const userInfo: updateUser = await userServices.getUserById(req.params);

    if(!userInfo){
        return res.status(404).json({ error: 'o Usuário não foi encontrado!'});
    }

    try{
        await userServices.deleteUser(userInfo.id);

        return res.status(200).json({ message: `Usuário deletado com sucesso: ID:${userInfo.id}, Nome: ${userInfo.name}, Email: ${userInfo.email}`});
    } catch(error: any){
        return res.status(500).json({ error : 'Erro ao deletar usuário: ' + error.message});
    }
}

const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await userServices.getAllUsers();
        return res.status(200).json(users)
    } catch(error:any){
        return res.status(500).json({ error: 'Erro ao requisitar usuários! ' })
    }
}

module.exports = {
    register,
    login,
    logout,
    updateUser,
    deleteUser,
    getAllUsers,

}