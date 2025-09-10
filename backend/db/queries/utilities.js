import db from "../client.js";

// CREATE adds a utility row to the utilities table
export async function createUtility({name, location, peakRate, offPeakRate}){
    const sql = `
    INSERT INTO utilities    
        (name, location, peak_rate, off_peak_rate)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `;
    try{
        const res = await db.query(sql, [name, location, peakRate, offPeakRate]);
        return res.rows[0];
    }catch(err){
        console.error('Error creating utility:', err);
        throw err;
    };
};

// GET retrieves all utilities
export async function getUtilities(){
    const sql = `
        SELECT *
        FROM utilities
    `;
    try{
        const { rows: utilities } = await db.query(sql);
        return utilities;
    }catch(err){
        console.error('Error fetching utilities:', err);
        throw err;
    };
};

// GET retrieves utilities by id
export async function getUtilityById(id){
    const sql = `
        SELECT *
        FROM utilities
        WHERE id = $1
    `;
    try{
        const { rows: [utility] } = await db.query(sql, [id]);
        return utility;
    }catch(err){
        console.error('Error fetching utility:', err);
        throw err;
    };
};

// PATCH updates utility fields using id
export async function updateUtility(id, fields){
    // allow only certain fields to be updated
    const allowedFields = ["name", "location", "peak_rate", "off_peak_rate"];
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([key]) => allowedFields.includes(key))
    );

    // uses object.keys() method to check if object is null
    const keys = Object.keys(filteredFields);
    if (keys.length === 0) return null;
        
    // maps the key over the updated field in utilities
    const utilityField = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...keys.map(k => filteredFields[k]), id];
        
    const sql = `
        UPDATE utilities
        SET ${utilityField}
        WHERE id = $${keys.length+1}
        RETURNING *
    `;
    try{
        const { rows: [utility] } = await db.query(sql, values);
        return utility;
    }catch(err){
        console.error('Error updating utility:', err);
        throw err;
    };
};

// DELETE removes utility from utility table
export async function deleteUtility(id){
    const sql = `
        DELETE FROM utilities
        WHERE id = $1
        RETURNING *
    `;
    try{
        const { rows: [utility] } = await db.query(sql, [id]);
        return utility;
    }catch(err){
        console.error('Error deleting utility:', err);
        throw err;
    };
};

// ADMIN-ONLY: Update only the rates for a utility
export async function updateUtilityRates(id, peakRate, offPeakRate){
    const sql = `
        UPDATE utilities
        SET peak_rate = $1,
            off_peak_rate = $2
        WHERE id = $3
        RETURNING *
    `;
    try{
        const { rows: [utility] } = await db.query(sql, [peakRate, offPeakRate, id]);
        return utility;
    }catch(err){
        console.error('Error updating utility rates:', err);
        throw err;
    };
};
