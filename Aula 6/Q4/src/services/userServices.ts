import userRepository from '../repository/userRepository';
import config from "../config/config";
import jwt from "jsonwebtoken";

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

type Info = {
    name: string,
    email: string,
    id: number,
}

type JWT = {
    auth: boolean,
    token: string, 
    getUser: Info
}


const register = async (data: User): Promise<User> => {
    const nameRegex: RegExp = /^[a-zA-Z\s]+$/;
    const emailRegex :RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex :RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

    if(!data.name){
        throw new Error ('O nome é obrigatório!');
    }

    if (!data.email){
        throw new Error ('O email é obrigatório!');
    }

    if (!data.password){
        throw new Error ('A senha é obrigatória!');
    }

    if(data.name.length < 4) {
        throw new Error ('O nome deve ser maior do que 4 letras!')
    }

    if (!nameRegex.test(data.name)){
        throw new Error('O nome só pode conter letras e espaços!' )
    }

    if (!emailRegex.test(data.email)){
        throw new Error('Email inválido!');
    }

    if (data.password.length < 8) {
        throw new Error('A senha deve ser maior do que 8 caracteres!')
    }

    if (!passwordRegex.test(data.password)){
        throw new Error('Senha inválida')
    }

    try {
        const newUser = await userRepository.register(data);
        return newUser;;
    } catch (error){
        throw error;
    }
}

const getUserById = async (data: updateUser): Promise<User | null> => {
    try{
        const getUser = await userRepository.getUserById(data);

        return getUser || null;
    } catch (error: any){
        throw error;
    }
}

const login = async (loginData: Login): Promise< JWT | null >=> {
    try {
        const getUser = await userRepository.getUser(loginData);

        if (!loginData.email){
            throw new Error ("Email obrigatório!");
        }

        if (!loginData.password){
            throw new Error ("Senha obrigatória!");
        }

        if(getUser.password !== loginData.password){
            throw new Error ("Senha inválida!");
        }

        if (getUser){
            const token = jwt.sign({ id: getUser.id }, config.SECRET_KEY, { expiresIn: 864000 } )

            return { auth: true, token, getUser }
        }

        return null;
        
    } catch (error:any){
        throw error;
    }
}

const updateUser = async (data: updateUser): Promise<Info> => {
    const nameRegex: RegExp = /^[a-zA-Z\s]+$/;
    const emailRegex :RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex :RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

    if(data.name.length < 4) {
        throw new Error ('O nome deve ser maior do que 4 letras!')
    }

    if (!nameRegex.test(data.name)){
        throw new Error('O nome só pode conter letras e espaços!' )
    }

    if (!emailRegex.test(data.email)){
        throw new Error('Email inválido!');
    }

    if (data.password.length < 8) {
        throw new Error('A senha deve ser maior do que 8 caracteres!')
    }

    if (!passwordRegex.test(data.password)){
        throw new Error('Senha inválida')
    }

    try {
        const update = await userRepository.updateUser(data);
        return update;
    } catch (error: any){
        throw error;
    }

}

const deleteUser = async (data: updateUser): Promise<void> => {
    try{
        await userRepository.deleteUser(data);
    } catch (error: any){
        throw error;
    }
}

const getAllUsers = async (): Promise<Info[]> =>{
    try{
        const users = await userRepository.getAllUsers();
        return users;
    } catch(error:any){
        throw error;
    }
}

export = {
    register,
    login,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
}