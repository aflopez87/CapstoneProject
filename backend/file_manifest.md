# Backend File Manifest – Capstone Project

This document outlines the structure and purpose of each file and folder in the backend of the Capstone Project.

---

## api/
Handles routing logic for different user roles.

- admin.js – Routes for admin-level operations.
- user.js – Routes for authenticated user interactions.

---

## db/
Contains database connection, schema, and query logic.

### queries/
Modular SQL query handlers.

- devices.js – Queries related to device data.
- user_devices.js – Queries linking users to their devices.
- users.js – User account and profile queries.
- utilities.js – Queries for utility rates and pricing.

### Other DB Files

- client.js – PostgreSQL client setup using environment variables.
- meec.sql – SQL schema definition for the MEEC database.
- seed.js – Script to populate the database with initial data.

---

## middleware/
Custom Express middleware for authentication and validation.

- require_admin.js – Verifies admin role from JWT.
- require_body.js – Validates request body structure.
- user_from_token.js – Extracts user info from JWT token.

---

## utils/
Reusable helper functions.

- jwt.js – JWT signing, verification, and decoding utilities.

---

## Core Files

- .env – Environment variables (e.g., DB credentials, JWT secret).
- .gitignore – Excludes sensitive and unnecessary files from Git.
- app.js – Express app configuration and middleware orchestration.
- server.js – Entry point for starting the backend server.
- package.json – Project metadata and dependencies.
- package-lock.json – Dependency lock file for reproducible installs.

---

## node_modules/
Auto-generated folder containing installed dependencies. Omitted for brevity.

---

## Notes
- Ensure .env is excluded from version control.
- Consider adding a README.md to document API endpoints and usage.

