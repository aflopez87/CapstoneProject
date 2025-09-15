-- CREATE DATABASE meec_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS user_devices CASCADE;
DROP TABLE IF EXISTS utilities CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    -- Added role column to distinguish admin from user
    role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    wattage DECIMAL NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    admin_update BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_devices(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    custom_device TEXT, 
    user_update BOOLEAN DEFAULT TRUE,
    device_approval BOOLEAN DEFAULT FALSE,
    usage_algorithm TEXT,
    usage_hours INTEGER
);

CREATE TABLE utilities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    peak_rate DECIMAL NOT NULL,
    off_peak_rate DECIMAL NOT NULL
);

