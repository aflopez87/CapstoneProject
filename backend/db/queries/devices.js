import db from "../client.js";

// CREATE adds a device row to the devices table
export async function createDevice({name, wattage}){
  const sql = `
    INSERT INTO devices
      (name, wattage)
    VALUES
      ($1, $2)
    RETURNING *
  `;
  try {
    const res = await db.query(sql, [name, wattage]);
    return res.rows[0];
  }catch(err){
    console.error('Error creating device:', err);
  }
};


// GET retrieves all devices
export async function getDevices(){
  const sql = `
    SELECT *
    FROM devices
  `;
  try{
    const { rows: devices } = await db.query(sql);
    return devices;
  }catch(err){
    console.error('Error retrieving all devices:', err);
    throw err;
  };
};

// GET retrieves a device by id
export async function getDeviceById(id){
  const sql = `
    SELECT *
    FROM devices
    WHERE id = $1
  `;
  try{
    const { rows: [device],} = await db.query(sql, [id]);
    return device;
  }catch(err){
    console.error('Error retrieving device:', err);
    throw err;
  };
};

// PATCH updates Device fields using ids
export async function updateDevice(id, fields){
  // uses object.keys() method to check if object is null
  const keys = Object.keys(fields);
  if (keys.length === 0) return null;

  // maps the key over the updated field in devices
  const deviceField = keys.map((key, i) => `${key}= $${i+1}`).join(',');
  const values = [...keys.map(k=>fields[k]),id];

  const sql = `
      UPDATE devices
      SET ${deviceField}
      WHERE id = $${keys.length+1}
      RETURNING *  
  `;
  try{
    const {rows:[device]} = await db.query(sql, values);
    return device;
  }catch(err){
    console.error('Error updating device:', err);
    throw err;
  };
};

// DELETE removes device from table
export async function deleteDevice(id){
  const sql = `
    DELETE FROM devices
    WHERE id = $1
    RETURNING *
  `;
  try{
    const {rows: [device]} = await db.query(sql,[id]);
    return device;
  }catch(err){
    console.error('Error deleting device:', err);
    throw err;
  };
};
