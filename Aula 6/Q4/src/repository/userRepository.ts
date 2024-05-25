import pool from "../database/connection";

interface User {
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

type Data = {
    id: number
}

const register = async (data: User) => {
    let client: any = null;
    const query: string = 'INSERT INTO "user" (email, name, password) VALUES ($1, $2, $3) RETURNING id, name, email';

    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const result = await client.query(query, [data.email, data.name, data.password]);
        await client.query('COMMIT');
        console.log("Dados inseridos com sucesso");

        if (result.rowCount > 0 && result.rows[0]){
            return result.rows[0];
        }

        return null;
    } catch (error: any) {
        console.log("Erro ao inserir dados:", error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

const getUser = async (loginData: Login)=> {
    let client: any = null;
    const query: string = 'SELECT * FROM "user" WHERE email = $1';

    try{
        client = await pool.connect();
        const result = await client.query(query, [loginData.email]);

        if (result.rowCount > 0 && result.rows[0]){
            return result.rows[0];
        } else {
            throw new Error ("Usuário não encontrado!");
        }
    } catch(error: any) {
        console.log("Error ao consultar dados: ", error);
        throw error;
    } finally {
        if (client){
            client.release();
        }
    }
}

const getUserById = async (data: Data) => {
    let client: any = null;
    const query: string = 'SELECT * FROM "user" WHERE id = $1';

    try{
        client = await pool.connect();
        const result = await client.query(query, [data.id]);

        if (result.rowCount > 0 && result.rows[0]){
            return result.rows[0];
        }
    } catch(error: any) {
        console.log("Error ao consultar dados: ", error);
        throw error;
    } finally {
        if (client){
            client.release();
        }
    }
}

const updateUser = async (data: updateUser) => {
    let client: any = null;
    const query: string = 'UPDATE "user" SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING id, name, email'
    try {
        client = await pool.connect();
        const result = await client.query(query, [data.email, data.name, data.password, data.id]);

        if (result.rowCount > 0 && result.rows[0]){
            return result.rows[0];
        }

        console.log("Dados atualizados com sucesso!");
    } catch (error: any) {
        console.log("Erro ao atualizar dados: ", error)
        throw error;
    } finally {
        if (client){
            client.release();
        }
    }
}

const deleteUser = async (data: updateUser) => {
    let client: any = null;
    const query: string = 'DELETE FROM "user" WHERE id = $1';

    try {
        client = await pool.connect();
        await client.query(query, [data]);
        console.log("Dados deletados com sucesso!");
    } catch(error :any){
        console.log("Erro ao deletar dados: ", error);
        throw error;
    } finally{
        if (client){
            client.release();
        }
    }
}

const getAllUsers = async () => {
    let client: any = null;
    const query: string = 'SELECT id, name, email FROM "user"';

    try{
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows;
    } catch(error: any){
        console.log('Erro ao requisitar dados: ', error);
        throw error;
    } finally {
        if(client){
            client.release();
        }
    }
}


export = {
    register,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}