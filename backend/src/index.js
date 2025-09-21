// backend/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('../generated/prisma'); 
const admin = require('firebase-admin');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// --- MIDDLEWARE ---
app.use(cors()); // Allows your frontend to talk to your backend
app.use(express.json()); // Allows server to read JSON from requests

// --- FIREBASE ADMIN SDK INITIALIZATION ---
const serviceAccount = require('../firebase-service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// --- ZOD SCHEMA FOR VALIDATION ---
const signupSchema = z.object({
  ispName: z.string().min(3, "ISP name must be at least 3 characters"),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerEmail: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// --- API ROUTES ---
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// ** THE PUBLIC SIGN-UP ROUTE **
app.post('/api/auth/signup', async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { ispName, ownerName, ownerEmail, password } = validatedData;

    // 1. Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email: ownerEmail,
      password: password,
      displayName: ownerName,
    });

    // 2. Create user in our PostgreSQL database
    const newIspAdmin = await prisma.ispAdmin.create({
      data: {
        ispName: ispName,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        firebaseUid: userRecord.uid,
      },
    });

    res.status(201).json({ message: 'Admin created successfully!', admin: newIspAdmin });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ message: 'This email address is already in use.' });
    }
    console.error('Sign-up Error:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});