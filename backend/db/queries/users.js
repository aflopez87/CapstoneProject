import db from "../client.js";
import bcrypt from 'bcrypt';

// CREATE adds a user row to the users table
export async function createUser({name, location, username, password, role}){
    const sql = `
        INSERT INTO users
            (name, location, username, hashed_password, role)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING id, name, location, username, role
    `;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await db.query(sql, [name, location, username, hashedPassword, role]);
        return res.rows[0];
    }catch(err){
        console.error('Error creating user:', err);
        throw err;
    };
};

// GET retrieves all users
export async function getAllUsers(){
    const sql = `
        SELECT id, name, location, username, role
        FROM users
    `;
    try{
        const { rows: users } = await db.query(sql);
        return users;
    }catch(err){
        console.error('Error fetching users:', err)
        throw err;
    };
};

// GET retrieves a user by id
export async function getUserById(id){
    const sql = `
        SELECT *
        FROM users
        WHERE id = $1
    `;
    try{
        const { rows: [user] } = await db.query(sql, [id]);
        return user; 
    }catch(err){
        console.error('Error fetching user:', err);
        throw err;
    };
};

// PATCH updates user fields using id
export async function updateUser(id, fields){
        // hashes new password and stores it in fields.hashed_password
        if (fields.password){
            fields.hashed_password = await bcrypt.hash(fields.password, 10);
            delete fields.password;
        }

        // fields that can be updated
        const allowedFields = ["name", "location", "username", "password", "role"];
        const filteredFields = Object.fromEntries(
            Object.entries(fields).filter(([key]) => allowedFields.includes(key))
        );

        // check fields to update
        const keys = Object.keys(filteredFields);
        if (keys.length === 0) return null;
        
        // maps the key over the updated field in users
        const userField = keys.map((key, i) => `${key} = $${i + 1}`).join(',');
        const values = [...keys.map(k => filteredFields[k]), id];

        const sql = `
            UPDATE users
            SET ${userField}
            WHERE id = $${keys.length+1}
            RETURNING id, name, location, username, role
        `;
        try{
            const { rows: [user] } = await db.query(sql, values);
            return user;
        }catch(err){
            console.error('Error updating user:', err);
            throw err;
        }
};

// DELETE removes user from user table
export async function deleteUser(id){
    const sql = `
        DELETE FROM users
        WHERE id = $1
        RETURNING id, name, location, username, role
    `;
    try{
        const { rows: [user] } = await db.query(sql, [id]);
        return user; 
    }catch(err){
        console.error('Error deleting user:', err);
        throw err;
    };
};

// Authenticates the user with username and password
export async function authenticateUser(username, password){
    const sql = `
        SELECT *
        FROM users
        WHERE username = $1
    `;
    try{
        const { rows: [user] } = await db.query(sql, [username]);
        if (!user) return null;
        
        // compares password against stored hashed password
        const isValid = await bcrypt.compare(password, user.hashed_password);
        return isValid ? user : null;
    }catch(err){
        console.error('Authentication failed:', err);
        throw err;
    }
};

