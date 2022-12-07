import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import v1 from './v1/index.js';

const app = express();

// Setup JSON body
app.use(express.json());
// Setup routes
app.use('/v1', v1);

// Connect to database
mongoose.set('strictQuery', true);
await mongoose.connect(process.env.MONGO_DB_URI);
console.log('Connected to DB');

// Start server
app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});