import db from "#db/client";

export async function createDevice(name, wattage) {
  const sql = `
  INSERT INTO devices
    (name, wattage)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  try {
    const {
    rows: [device],
  } = await db.query(sql, [name, wattage]);
  return device;
  }catch(err){
    console.error('Error creating device:', err);
  }
};

export async function getDevices() {
  const sql = `
  SELECT *
  FROM devices
  `;
  const { rows: devices } = await db.query(sql);
  return devices;
};

export async function getDevicesByUserId(id) {
  const sql = `
  SELECT devices.*
  FROM
    devices
    JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return devices;
}

export async function getDeviceById(id) {
  const sql = `
  SELECT *
  FROM deviecs
  WHERE id = $1
  `;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return devices;
};
