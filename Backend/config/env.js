// Backend/config/env.js
import dotenv from 'dotenv';
import path from 'path';

// Load env vars immediately
dotenv.config({ path: path.join(process.cwd(), 'Backend', 'config', 'config.env') });