import db from "../client.js";

// CREATE adds a device row to the user devices table
export async function addUserDevice(userId, deviceId, customDevice, usageAlgorithm, usageHours){
    const sql = `
        INSERT INTO user_devices
            (user_id, device_id, custom_device, usage_algorithm, usage_hours)
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    try{
        const {rows: userDevices } = await db.query(sql, [userId, deviceId, customDevice, usageAlgorithm, usageHours]);
        return userDevices[0];
    }catch(err){
        console.error('Error adding device to user:', err);
        throw err;
    };
};

// GET retireves all user deviecs
export async function getAllUserDevices(){
    const sql = `
    SELECT *
    FROM user_devices
    `;
    try{
        const { rows: userDevices } = await db.query(sql);
        return userDevices;
    }catch(err){
        console.error('Error fetching all user devices:', err);
        throw err;
    };
}

// GET retrieves a device by user id
export async function getDevicesByUserId(id){
  const sql = `
        SELECT devices.*, user_devices.usage_algorithm, user_devices.usage_hours
        FROM devices
        JOIN user_devices ON user_devices.device_id = devices.id
        WHERE user_devices.user_id = $1
  `;
  try {
      const { rows: devices } = await db.query(sql, [id]);
      return devices;
  } catch(err) {
      console.error('Error fetching devices by user id:', err);
      throw err;
  }
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
    // allow only certain fields to be updated
    const allowedFields = [
        "custom_device",
        "usage_algorithm",
        "usage_hours",
        "device_approval",
        "user_update"
    ];

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([key]) => allowedFields.includes(key))
    );

    // uses object.keys() method to check if object is null
    const keys = Object.keys(filteredFields);
    if (keys.length === 0) return null;

    // maps the key over the updated field in user devices
    const userDeviceField = keys.map((key, i) => `${key} = $${i + 1}`).join(",");
    const values = [...keys.map(k => filteredFields[k]), id];

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

// Admin only function to approve a user device
export async function approveUserDevice(id){
    const sql = `
        UPDATE user_devices
        SET device_approval = true
        WHERE id = $1
        RETURNING *
    `;
    try{
        const { rows: [device] } = await db.query(sql, [id]);
        return device;
    }catch(err){
        console.error('Error approving user device:', err);
        throw err;
    };
};
