# Frontend File Manifest – Capstone Project

This document outlines the structure and purpose of each file and folder in the frontend of the Capstone Project.

---

## node_modules/
Auto-generated folder containing installed dependencies. Omitted for brevity.

---

## public/
Static assets and the root HTML file.

- index.html – Main HTML template loaded by Vite and React.

---

## src/
Main source code for the React application.

### Components/
Organized React components by role and function.

#### Admin/
Admin dashboard components and styles.

- Devices.jsx – Displays and manages device data for admins.
- Devices.css – Styles for the admin device view.
- Home.jsx – Admin landing page.
- Home.css – Styles for the admin homepage.
- Utility.jsx – Admin utility rate management.
- Utility.css – Styles for the utility interface.

#### Forms/
Authentication forms and related styles.

- Login.jsx – User login form.
- Register.jsx – User registration form.
- Forms.css – Shared styles for login and registration.

#### User/
User-facing dashboard components.

- Devices.jsx – Displays user-added devices.
- Devices.css – Styles for user device view.
- Home.jsx – User landing page.
- Home.css – Styles for the user homepage.
- Utility.jsx – Displays utility rate info for users.
- Utility.css – Styles for the utility section.

##### Subcomponents/
Reusable input and display components.

- DeviceInput.js – Dropdown for selecting devices.
- DeviceList.js – Renders the list of added devices.
- DeviceUsage.js – Input for specifying usage amount.
- UtilityInput.js – Input for selecting utility rate.

#### images/
Static image assets.

- HomepageImage.svg – Hero image for landing page.
- MEEC_Logo.svg – Project logo.

---

### Global Files

- App.jsx – Root component that defines routes and layout.
- main.jsx – Entry point for rendering the React app.
- UseContext.jsx – Provides global context (e.g., authentication).
- index.css – Global styles.

---

## Configuration and Metadata

- .gitignore – Excludes build artifacts and sensitive files from Git.
- eslint.config.js – ESLint configuration for code linting.
- package.json – Project metadata and dependencies.
- package-lock.json – Dependency lock file for reproducible installs.
- vite.config.js – Vite configuration for bundling and development.

---

## Documentation

- README.md – Contains capstone overview, MVP goals, stretch goals, and user instructions.

