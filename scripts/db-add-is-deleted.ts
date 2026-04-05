
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DB_ID = process.env.D1_DATABASE_ID;

async function migrate() {
    try {
        const sql = "ALTER TABLE products ADD COLUMN is_deleted INTEGER DEFAULT 0";
        const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`;

        console.log('Adding is_deleted column...');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql }),
        });

        if (!response.ok) {
            console.error('HTTP Error:', response.status, await response.text());
            return;
        }

        const data = await response.json();
        console.log('Migration Result:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Migration Failed:', error);
    }
}

migrate();
