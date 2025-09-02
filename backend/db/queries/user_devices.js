import db from "#db/client";

// CREATE adds a device row to the user devices table
export async function addUserDevice(userId, deviceId, customDevice, usageAlgorithm){
    const sql = `
        INSERT INTO user_devices
            (user_id, device_id, custom_device, usage_algorithm)
        VALUES 
            ($1, $2, $3, $4)
        RETURNING *
    `;
    try{
        const { rows: [userDevice] } = await db.query(sql, [userId, deviceId, customDevice, usageAlgorithm]);
        return userDevice;
    }catch(err){
        console.error('Error adding device to user:', err);
        throw err;
    };
};

// GET retrieves a device by user id
export async function getDevicesByUserId(id){
  const sql = `
        SELECT devices.*
        FROM devices
        JOIN user_devices ON user_devices.device_id = devices.id
        WHERE user_devices.user_id = $1
  `;
  const { rows: devices } = await db.query(sql, [id]);
  return devices;
};

// GET retrieves a user device by device id
export async function getUserDeviceById(id){
    const sql = `
        SELECT *
        FROM user_devices
        WHERE id = $1
    `;
    try{
        const { rows: [userDevice] } = await db.query(sql, [id]);
        return userDevice;
    }catch(err){
        console.error('Error fetching user device by id:', err);
        throw err;
    };
};

// PATCH updates user device fields using id
export async function updateUserDevice(id, fields){
    // uses object.keys() method to check if object is null
    const keys = Object.keys(fields);
    if (keys.length === 0) return null;

    // maps the key over the updated field in user devices
    const userDeviceField = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...keys.map(k => fields[k]), id];

    const sql = `
        UPDATE user_devices
        SET ${userDeviceField}
        WHERE id = $${keys.length+1}
        RETURNING *
    `;
    try{
        const { rows: [device] } = await db.query(sql, values);
        return device;
    }catch(err){
        console.error('Error updating user device:', err);
        throw err;
    };
};

// DELETE removes user device from user device table
export async function deleteUserDevice(id){
    const sql = `
        DELETE FROM user_devices
        WHERE id = $1
        RETURNING *
    `;
    try{
        const { rows: [device]} = await db.query(sql, [id]);
        return device;
    }catch(err){
        console.error('Error deleting user device:', err);
        throw err;
    };
};