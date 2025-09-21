# ✨ User Creation Practice Project

## Key Features & How to Use

1. `Public Sign-Up (Web Form)` : This is the practice implementation of a public-facing registration form.

2. `Secure Admin Creation (CLI Script)` : This is the production-ready method for developers to manually onboard new user.

_**How to run CLI:**_ From a backend terminal, use the following command structure. Remember to use the **_-- separator_**.

```Bash
npm run create-admin -- \
 --email "new.admin@isp.com" \
 --password "AStrongP@ssw0rd!" \
 --ispName "Super Secure ISP" \
 --ownerName "Jane Doe"
```

_Functionality: This script bypasses the web server and directly interacts with the Firebase Admin SDK and Prisma to securely create the user records._

## 🚀 Tech Stack

| **_Category_** | **_Technology_**                    |
| -------------- | ----------------------------------- |
| Frontend       | React.js, Vite, TypeScript          |
| Styling & UI   | Tailwind CSS, Shadcn UI             |
| Backend        | Node.js, Express.js                 |
| Database + ORM | PostgreSQL, Prisma                  |
| Authentication | Firebase Authentication (Admin SDK) |
| Validation     | Zod (Backend)                       |
| Dev Tools      | Nodemon, dotenv                     |

## 📂 Project Structure

The project is organized as a `monorepo` with two main folders:

```txt
/
├── backend/    # Contains the Node.js, Express, and Prisma server
└── frontend/   # Contains the React.js client application
```

## 🔧 Getting Started: Setup and Installation

Follow these steps to get the project running on your local machine.

## Backend Setup : First, set up the server.

Navigate to the backend directory:

```Bash
cd backend
```

Install dependencies:

```Bash
npm install
```

Set up environment variables:

```Bash
Create a new file named .env in the backend folder.

DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."
```

Can get the Postgres connection string by below command:

```Bash
npx prisma init --db
```

## Set up Firebase Admin SDK:

Download your service account private key (a .json file) from your Firebase project settings.
Place this file in the backend directory and rename it to `firebase-service-account-key.json`.

**_Important_**: Ensure this file is listed in your `.gitignore` file to prevent committing it.

Run the database migration:
This command will sync your Prisma schema with your database, creating the IspAdmin table.

```Bash
npx prisma migrate dev --name init
```

then

```Bash
npx prisma generate
```

For Prisma Studio

```Bash
npx prisma studio
```

## Frontend Setup

Navigate to the frontend directory:

```Bash
cd frontend
```

Install dependencies:

```Bash
npm install
```

### 🏃 Running the Application

_You will need two separate terminals to run both the backend and frontend servers simultaneously._

Start both with the command

```bash
npm run dev
```

---

#### ⚠️ Important Notes & Troubleshooting

This section documents key solutions found during development.

```Bash
Prisma Import Path

Old Way (Prisma v5): 
const { PrismaClient } = require('@prisma/client')

New Way (Prisma v6): 
const { PrismaClient } = require('../generated/prisma')
```

```Bash
This change must be applied in all files that use the Prisma Client:

backend/src/index.js
backend/scripts/create-admin.js
```
